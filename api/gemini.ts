import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { formatPhaseTimeRange, formatDurationDisplay, parseTotalMinutes } from '../src/utils/timingUtils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure JSON response headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Please use POST.',
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'GEMINI_API_KEY environment variable is missing on the server.',
    });
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build-vercel',
      },
    },
  });

  try {
    const body = req.body || {};
    const { action, prompt: rawPrompt } = body;

    // Mode 1: Section Regeneration
    if (action === 'regenerate-section' || (body.section && body.currentPlan)) {
      const { section, currentPlan, promptAddition } = body;
      const isUnitTest = (currentPlan?.tittle_unit || '').toLowerCase().includes('unit test');
      const unitTopicContext = (currentPlan?.tittle_unit || '').toLowerCase().includes('transformation')
        ? 'transformations and vectors'
        : (currentPlan?.tittle_unit || '').replace(/—?\s*unit test/i, '').trim().toLowerCase() || 'the unit';

      const unitTestSectionGuidance = isUnitTest && section === 'fiveE'
        ? `
CRITICAL FORMAT FOR UNIT TEST 5E:
- Engage:
  1. Greeting, praying, attendance, and checking classroom situation. (5 minutes)
  2. Teacher activates prior knowledge through brief questioning. (15 minutes)
  assessment_engage1: "Brief oral questioning on ${unitTopicContext} (AO1)"
- Explore: "Preparation and distribution of Chapter End Test papers."
- Explain: "Teacher clarifies exam rules, duration (55 minutes), and instructions."
- Elaborate: "Students complete the Chapter End Test individually. (55 minutes)"
  assessment_elaborate1: "Teacher monitors the process in class (AO2/AO3)"
- Evaluate: "Students submit their paper exam. (5 minutes)"
  assessment_evaluate2: "Teacher checks answers to evaluate understanding"
`
        : '';

      const prompt = `
You are updating a specific section of a Cambridge Lower Secondary Mathematics (0862) lesson plan for Semesta School.
Unit: "${currentPlan.tittle_unit}" (Year ${currentPlan.kelas}, Lesson ${currentPlan.lesson} of ${currentPlan.total_lesson}).
Duration: ${currentPlan.duration}.
Section to update: "${section}".
Additional instructions: "${promptAddition || 'Make it more interactive, rigorous, and student-centred'}".
${unitTestSectionGuidance}
Current WALT objectives:
1. ${currentPlan.LO_1}
2. ${currentPlan.LO_2}
3. ${currentPlan.LO_3}

CRITICAL: Pure Cambridge English only. Do NOT include any Indonesian words or translations.
Please regenerate the requested section matching the required JSON schema.
`;

      let responseSchema: any = { type: Type.OBJECT, properties: {} };

      if (section === 'fiveE') {
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            engage: { type: Type.STRING },
            assessment_engage1: { type: Type.STRING },
            assessment_engage2: { type: Type.STRING },
            assessment_engage3: { type: Type.STRING },
            explore: { type: Type.STRING },
            assessment_explore1: { type: Type.STRING },
            assessment_explore2: { type: Type.STRING },
            assessment_explore3: { type: Type.STRING },
            explain: { type: Type.STRING },
            assessment_explain1: { type: Type.STRING },
            assessment_explain2: { type: Type.STRING },
            assessment_explain3: { type: Type.STRING },
            elaborate: { type: Type.STRING },
            assessment_elaborate1: { type: Type.STRING },
            assessment_elaborate2: { type: Type.STRING },
            assessment_elaborate3: { type: Type.STRING },
            evaluate: { type: Type.STRING },
            assessment_evaluate1: { type: Type.STRING },
            assessment_evaluate2: { type: Type.STRING },
            assessment_evaluate3: { type: Type.STRING },
          },
        };
      } else if (section === 'differentiation') {
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            struggledscaff_1: { type: Type.STRING },
            struggledscaff_2: { type: Type.STRING },
            struggledscaff_3: { type: Type.STRING },
            ealsupport_1: { type: Type.STRING },
            ealsupport_2: { type: Type.STRING },
            ealsupport_3: { type: Type.STRING },
            senscaff_1: { type: Type.STRING },
            senscaff_2: { type: Type.STRING },
            senscaff_3: { type: Type.STRING },
            extensiontask_1: { type: Type.STRING },
            extensiontask_2: { type: Type.STRING },
            extensiontask_3: { type: Type.STRING },
          },
        };
      } else if (section === 'waltWilf') {
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            LO_1: { type: Type.STRING },
            LO_2: { type: Type.STRING },
            LO_3: { type: Type.STRING },
            WILF_1: { type: Type.STRING },
            WILF_2: { type: Type.STRING },
            WILF_3: { type: Type.STRING },
            SLO_1: { type: Type.STRING },
            SLO_2: { type: Type.STRING },
            SLO_3: { type: Type.STRING },
            SLO_4: { type: Type.STRING },
          },
        };
      } else if (section === 'assessment') {
        responseSchema = {
          type: Type.OBJECT,
          properties: {
            formative_1: { type: Type.STRING },
            formative_2: { type: Type.STRING },
            formative_3: { type: Type.STRING },
            nextlesson_1: { type: Type.STRING },
            nextlesson_2: { type: Type.STRING },
            nextlesson_3: { type: Type.STRING },
            postlesson_1: { type: Type.STRING },
            postlesson_2: { type: Type.STRING },
            postlesson_3: { type: Type.STRING },
          },
        };
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert Cambridge International Mathematics lesson designer.',
          responseMimeType: 'application/json',
          responseSchema,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (isUnitTest && section === 'fiveE') {
        parsed.assessment_elaborate1 = parsed.assessment_elaborate1 || 'Teacher monitors the process in class (AO2/AO3)';
        parsed.assessment_evaluate2 = parsed.assessment_evaluate2 || 'Teacher checks answers to evaluate understanding';
      }

      return res.status(200).json({
        success: true,
        updatedFields: parsed,
        text: response.text,
      });
    }

    // Mode 2: Raw prompt if supplied directly without structured lesson plan parameters
    if (rawPrompt && !body.tittle_unit && !body.userObjectives) {
      const response = await ai.models.generateContent({
        model: body.model || 'gemini-3.8-flash',
        contents: rawPrompt,
        config: {
          systemInstruction: body.systemInstruction || 'You are an expert Cambridge Mathematics curriculum designer.',
        },
      });
      return res.status(200).json({
        success: true,
        text: response.text,
      });
    }

    // Mode 3: Full Lesson Plan Generation
    const {
      tittle_unit,
      unit = '1',
      lesson = '1',
      total_lesson = '6',
      kelas = '7',
      duration = '80 minutes',
      date_L,
      month_L,
      year_L,
      syllabus = 'Cambridge Lower Secondary Mathematics 0862',
      teacher = 'Niswa Ajilla, S.Mat',
      department = 'Mathematics',
      userObjectives,
      priorKnowledge,
      teachingPreferences,
      timingSplit,
    } = body;

    const isUnitTest =
      (tittle_unit || '').toLowerCase().includes('unit test') ||
      (userObjectives || '').toLowerCase().includes('unit test') ||
      (teachingPreferences || '').toLowerCase().includes('unit test');

    const totalMinutes = parseTotalMinutes(duration, 80);
    const engageT = isUnitTest
      ? '0-20 minutes'
      : (timingSplit?.engage || '0-10 minutes');
    const exploreT = isUnitTest
      ? '20-20 minutes'
      : (timingSplit?.explore || '10-35 minutes');
    const explainT = isUnitTest
      ? '20-20 minutes'
      : (timingSplit?.explain || '35-50 minutes');
    const elaborateT = isUnitTest
      ? '20-75 minutes'
      : (timingSplit?.elaborate || '50-70 minutes');
    const evaluateT = isUnitTest
      ? '75-80 minutes'
      : (timingSplit?.evaluate || '70-80 minutes');

    const unitTopicContext = (tittle_unit || '').toLowerCase().includes('transformation')
      ? 'transformations and vectors'
      : (tittle_unit || '').replace(/—?\s*unit test/i, '').trim().toLowerCase() || 'the unit';

    const unitTestGuidance = isUnitTest
      ? `
CRITICAL REQUIREMENTS FOR UNIT TEST ASSESSMENT SESSION:
This lesson is an official UNIT TEST / CHAPTER END TEST (assessment session).
You MUST generate the 5E sequence and assessments strictly according to this template:
- Engage (0-20 minutes):
  Teacher & Student Activity MUST follow this exact structure:
  1. Greeting, praying, attendance, and checking classroom situation. (5 minutes)
  2. Teacher activates prior knowledge through brief questioning. (15 minutes)
  Assessments:
  - assessment_engage1 MUST be: "Brief oral questioning on ${unitTopicContext} (AO1)"
  - assessment_engage2: "Checking student attendance, seating readiness, and test environment"
  - assessment_engage3: "SLO-1 Confident: Active participation during pre-test review"
- Explore (20-20 minutes):
  Activity: "Preparation and distribution of Chapter End Test papers."
  Assessments:
  - assessment_explore1: "Checking permitted materials and calculators"
  - assessment_explore2: "Readying students for independent test conditions"
  - assessment_explore3: "SLO-2 Responsible: Academic honesty readiness"
- Explain (20-20 minutes):
  Activity: "Teacher clarifies exam rules, duration (55 minutes), and instructions."
  Assessments:
  - assessment_explain1: "Verification that all students have test papers and necessary stationery"
  - assessment_explain2: "Clarification of examination rules and integrity"
  - assessment_explain3: "SLO-2 Responsible: Following examination guidelines"
- Elaborate (20-75 minutes):
  Teacher & Student Activity MUST be: "Students complete the Chapter End Test individually. (55 minutes)"
  Assessments:
  - assessment_elaborate1 MUST be: "Teacher monitors the process in class (AO2/AO3)"
  - assessment_elaborate2: "Active invigilation and observation of time management"
  - assessment_elaborate3: "SLO-2 Responsible: Independent problem solving and academic honesty"
- Evaluate (75-80 minutes):
  Teacher & Student Activity MUST be: "Students submit their paper exam. (5 minutes)"
  Assessments:
  - assessment_evaluate1: "Collection and verification of all completed exam papers"
  - assessment_evaluate2 MUST be: "Teacher checks answers to evaluate understanding"
  - assessment_evaluate3: "SLO-3 Reflective: Initial self-assessment of test difficulty and preparation"
`
      : '';

    const prompt = `
You are a master Cambridge International Mathematics educator at Semesta School creating an official, high-quality, syllabus-aligned lesson plan for Cambridge Lower Secondary Mathematics (0862).

Parameters:
- Year Group: Year ${kelas}
- Unit ${unit}: "${tittle_unit}"
- Lesson ${lesson} of ${total_lesson}
- Total Lesson Duration: ${duration} (Phase timing: Engage ${engageT}, Explore ${exploreT}, Explain ${explainT}, Elaborate ${elaborateT}, Evaluate ${evaluateT})
- Syllabus: ${syllabus}
- Teacher: ${teacher}
- Department: ${department}
- Specific Teacher Objectives or Topics: ${userObjectives || 'Create standard high-priority Cambridge objectives for this unit'}
- Prior Knowledge: ${priorKnowledge || 'Standard prerequisite concepts for Year ' + kelas}
- Pedagogical Preferences / Notes: ${teachingPreferences || 'Focus on inquiry-based learning, student collaboration, and conceptual mastery'}
${unitTestGuidance}
CRITICAL GUIDELINES:
1. PURE CAMBRIDGE ENGLISH: The entire lesson plan MUST be written in English. Do NOT include any Indonesian words, translations, or references anywhere in the text or brackets.
2. TIMING FORMAT: Phase times (engage_t, explore_t, explain_t, elaborate_t, evaluate_t) MUST be written in range format ending with "minutes" (never "min"), e.g. "0-10 minutes", "10-35 minutes", "35-50 minutes", "50-70 minutes", "70-80 minutes".
3. WALT (We Are Learning To): 3 measurable, observable mathematical learning objectives using "Students will be able to..." style.
4. WILF (What I'm Looking For): 3 concrete success criteria that students can demonstrate.
5. SLO Integration: 4 Schoolwide Learner Outcomes descriptions for:
   - SLO-1 Confident (e.g. sharing methods, participating in math discussion)
   - SLO-2 Responsible (e.g. careful working, managing resources, persistence)
   - SLO-3 Reflective (e.g. self-checking errors, evaluating strategies)
   - SLO-4 Innovative (e.g. alternate problem solving, creative representations)
6. CLIL Language Objectives: List key mathematical terms in English with concise definitions in English only, e.g. "Integer: a whole number that can be positive, negative, or zero; Directed number: a number with magnitude and direction".
7. Differentiation Provisions (3 concise, practical bullet points each):
   - Struggled Scaffolding: Visual aids, worked steps, manipulatives, guided sentence frames.
   - EAL Support: English visual glossary mats, sentence starters, vocabulary checks.
   - SEN Scaffolding: Chunked instructions, visual timers, enlarged fonts, accessible tasks.
   - Extension Tasks: Challenging problem solving, generalization, algebraic proof, multiple representations.
8. 5E Instructional Sequence:
   - Engage (${engageT}): Real-world hook, question, or diagnostic task. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Explore (${exploreT}): Student-centred inquiry, hands-on or paired investigation where students discover rules before being told. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Explain (${explainT}): Students articulate discoveries, teacher formalises mathematical notation, theorems, and clarifies misconceptions. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Elaborate (${elaborateT}): Applying understanding to new/varied problems, differentiated challenge. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Evaluate (${evaluateT}): Exit ticket covering AO1/AO2/AO3, independent check. Explicit teacher & student activities + 3 assessment/SLO bullets.
9. Cambridge AOs:
   - AO1: Knowledge & Understanding description for this lesson.
   - AO2: Application & Problem Solving description for this lesson.
   - AO3: Mathematical Reasoning & Communication description for this lesson.
10. Formative Assessment (3 items), Homework (3 items), Post-Lesson Reflection (3 reflective questions for the teacher).
11. Slide location & Learner's Book reference.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert Cambridge Mathematics curriculum designer and pedagogical specialist.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tittle_unit: { type: Type.STRING },
            unit: { type: Type.STRING },
            lesson: { type: Type.STRING },
            total_lesson: { type: Type.STRING },
            kelas: { type: Type.STRING },
            duration: { type: Type.STRING },
            date_L: { type: Type.STRING },
            month_L: { type: Type.STRING },
            year_L: { type: Type.STRING },
            teacher: { type: Type.STRING },
            department: { type: Type.STRING },
            syllabus: { type: Type.STRING },
            AO1: { type: Type.STRING },
            AO2: { type: Type.STRING },
            AO3: { type: Type.STRING },
            LO_1: { type: Type.STRING },
            LO_2: { type: Type.STRING },
            LO_3: { type: Type.STRING },
            WILF_1: { type: Type.STRING },
            WILF_2: { type: Type.STRING },
            WILF_3: { type: Type.STRING },
            SLO_1: { type: Type.STRING },
            SLO_2: { type: Type.STRING },
            SLO_3: { type: Type.STRING },
            SLO_4: { type: Type.STRING },
            keyword: { type: Type.STRING },
            struggledscaff_1: { type: Type.STRING },
            struggledscaff_2: { type: Type.STRING },
            struggledscaff_3: { type: Type.STRING },
            ealsupport_1: { type: Type.STRING },
            ealsupport_2: { type: Type.STRING },
            ealsupport_3: { type: Type.STRING },
            senscaff_1: { type: Type.STRING },
            senscaff_2: { type: Type.STRING },
            senscaff_3: { type: Type.STRING },
            extensiontask_1: { type: Type.STRING },
            extensiontask_2: { type: Type.STRING },
            extensiontask_3: { type: Type.STRING },
            engage_t: { type: Type.STRING },
            engage: { type: Type.STRING },
            assessment_engage1: { type: Type.STRING },
            assessment_engage2: { type: Type.STRING },
            assessment_engage3: { type: Type.STRING },
            explore_t: { type: Type.STRING },
            explore: { type: Type.STRING },
            assessment_explore1: { type: Type.STRING },
            assessment_explore2: { type: Type.STRING },
            assessment_explore3: { type: Type.STRING },
            explain_t: { type: Type.STRING },
            explain: { type: Type.STRING },
            assessment_explain1: { type: Type.STRING },
            assessment_explain2: { type: Type.STRING },
            assessment_explain3: { type: Type.STRING },
            elaborate_t: { type: Type.STRING },
            elaborate: { type: Type.STRING },
            assessment_elaborate1: { type: Type.STRING },
            assessment_elaborate2: { type: Type.STRING },
            assessment_elaborate3: { type: Type.STRING },
            evaluate_t: { type: Type.STRING },
            evaluate: { type: Type.STRING },
            assessment_evaluate1: { type: Type.STRING },
            assessment_evaluate2: { type: Type.STRING },
            assessment_evaluate3: { type: Type.STRING },
            formative_1: { type: Type.STRING },
            formative_2: { type: Type.STRING },
            formative_3: { type: Type.STRING },
            nextlesson_1: { type: Type.STRING },
            nextlesson_2: { type: Type.STRING },
            nextlesson_3: { type: Type.STRING },
            postlesson_1: { type: Type.STRING },
            postlesson_2: { type: Type.STRING },
            postlesson_3: { type: Type.STRING },
            slide: { type: Type.STRING },
            LB: { type: Type.STRING },
            date_s: { type: Type.STRING },
            month_s: { type: Type.STRING },
            year_s: { type: Type.STRING },
          },
          required: [
            'tittle_unit',
            'unit',
            'lesson',
            'total_lesson',
            'kelas',
            'duration',
            'AO1',
            'AO2',
            'AO3',
            'LO_1',
            'LO_2',
            'LO_3',
            'WILF_1',
            'WILF_2',
            'WILF_3',
            'SLO_1',
            'SLO_2',
            'SLO_3',
            'SLO_4',
            'keyword',
            'engage_t',
            'engage',
            'explore_t',
            'explore',
            'explain_t',
            'explain',
            'elaborate_t',
            'elaborate',
            'evaluate_t',
            'evaluate',
            'formative_1',
            'formative_2',
            'formative_3',
            'nextlesson_1',
            'nextlesson_2',
            'nextlesson_3',
            'postlesson_1',
            'postlesson_2',
            'postlesson_3',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    // Clean any accidental redundant prefixes
    const cleanUnit = (parsed.unit || unit || '1').toString().replace(/^unit\s*/i, '').trim();
    const cleanKelas = (parsed.kelas || kelas || '7').toString().replace(/^year\s*/i, '').replace(/\s*\(smp\)/i, '').trim();
    const cleanDuration = formatDurationDisplay(parsed.duration || duration || '80 minutes');

    // Merge defaults to ensure all fields exist
    const rawPlan = {
      ...parsed,
      unit: cleanUnit,
      kelas: cleanKelas,
      duration: cleanDuration,
      teacher: teacher || 'Niswa Ajilla, S.Mat',
      department: department || 'Mathematics',
      syllabus: syllabus || 'Cambridge Lower Secondary Mathematics 0862',
      date_L: date_L || parsed.date_L || '20',
      month_L: month_L || parsed.month_L || '10',
      year_L: year_L || parsed.year_L || '2026',
      date_s: parsed.date_s || date_L || '20',
      month_s: parsed.month_s || month_L || '10',
      year_s: parsed.year_s || year_L || '2026',
      slide: parsed.slide || (isUnitTest ? `IFP Presentation — Unit ${cleanUnit} Unit Test` : `IFP Presentation — Unit ${cleanUnit} Lesson ${parsed.lesson || lesson}`),
      LB: parsed.LB || `Learner's Book ${cleanKelas}, Unit ${cleanUnit}`,
      hodReviewApproved: false,
      hodReviewFeedback: false,
    };

    const plan = {
      ...rawPlan,
      engage_t: isUnitTest ? '0-20 minutes' : formatPhaseTimeRange('engage', rawPlan),
      explore_t: isUnitTest ? '20-20 minutes' : formatPhaseTimeRange('explore', rawPlan),
      explain_t: isUnitTest ? '20-20 minutes' : formatPhaseTimeRange('explain', rawPlan),
      elaborate_t: isUnitTest ? '20-75 minutes' : formatPhaseTimeRange('elaborate', rawPlan),
      evaluate_t: isUnitTest ? '75-80 minutes' : formatPhaseTimeRange('evaluate', rawPlan),
    };

    if (isUnitTest) {
      if (!plan.engage || plan.engage.length < 15) {
        plan.engage = `1. Greeting, praying, attendance, and checking classroom situation. (5 minutes)\n2. Teacher activates prior knowledge through brief questioning. (15 minutes)`;
      }
      if (!plan.elaborate || plan.elaborate.length < 15) {
        plan.elaborate = 'Students complete the Chapter End Test individually. (55 minutes)';
      }
      if (!plan.evaluate || plan.evaluate.length < 10) {
        plan.evaluate = 'Students submit their paper exam. (5 minutes)';
      }
      plan.assessment_elaborate1 = 'Teacher monitors the process in class (AO2/AO3)';
      plan.assessment_evaluate2 = 'Teacher checks answers to evaluate understanding';
    }

    return res.status(200).json({
      success: true,
      plan,
      text: response.text,
    });
  } catch (err: any) {
    console.error('Error in /api/gemini:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to process request with Gemini AI',
    });
  }
}
