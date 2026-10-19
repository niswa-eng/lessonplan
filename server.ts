import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Initialize Gemini client on server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Generate Full Lesson Plan
app.post('/api/generate-lesson-plan', async (req, res) => {
  try {
    const {
      tittle_unit,
      unit = '1',
      lesson = '1',
      total_lesson = '6',
      kelas = '7',
      duration = '80 min',
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
    } = req.body;

    const totalMinutes = parseInt(duration) || 80;
    const engageT = timingSplit?.engage || Math.round(totalMinutes * 0.125).toString();
    const exploreT = timingSplit?.explore || Math.round(totalMinutes * 0.3).toString();
    const explainT = timingSplit?.explain || Math.round(totalMinutes * 0.2).toString();
    const elaborateT = timingSplit?.elaborate || Math.round(totalMinutes * 0.25).toString();
    const evaluateT = timingSplit?.evaluate || (totalMinutes - (parseInt(engageT) + parseInt(exploreT) + parseInt(explainT) + parseInt(elaborateT))).toString();

    const prompt = `
You are a master Cambridge International Mathematics educator at Semesta School creating an official, high-quality, syllabus-aligned lesson plan for Cambridge Lower Secondary Mathematics (0862).

Parameters:
- Year Group: Year ${kelas} (SMP)
- Unit ${unit}: "${tittle_unit}"
- Lesson ${lesson} of ${total_lesson}
- Total Lesson Duration: ${duration} (Phase allocation: Engage ${engageT}m, Explore ${exploreT}m, Explain ${explainT}m, Elaborate ${elaborateT}m, Evaluate ${evaluateT}m)
- Syllabus: ${syllabus}
- Teacher: ${teacher}
- Department: ${department}
- Specific Teacher Objectives or Topics: ${userObjectives || 'Create standard high-priority Cambridge objectives for this unit'}
- Prior Knowledge: ${priorKnowledge || 'Standard prerequisite concepts for Year ' + kelas}
- Pedagogical Preferences / Notes: ${teachingPreferences || 'Focus on inquiry-based learning, student collaboration, and conceptual mastery'}

CRITICAL GUIDELINES:
1. WALT (We Are Learning To): 3 measurable, observable mathematical learning objectives using "Students will be able to..." style.
2. WILF (What I'm Looking For): 3 concrete success criteria that students can demonstrate.
3. SLO Integration: 4 Schoolwide Learner Outcomes descriptions for:
   - SLO-1 Confident (e.g. sharing methods, participating in math discussion)
   - SLO-2 Responsible (e.g. careful working, managing resources, persistence)
   - SLO-3 Reflective (e.g. self-checking errors, evaluating strategies)
   - SLO-4 Innovative (e.g. alternate problem solving, creative representations)
4. CLIL Language Objectives: List key mathematical terms in English followed by simple explanations and Indonesian translation, e.g. "Integer (bilangan bulat), Directed number (bilangan berarah)".
5. Differentiation Provisions (3 concise, practical bullet points each):
   - Struggled Scaffolding: Visual aids, worked steps, manipulatives, guided sentence frames.
   - EAL Support: Bilingual mats, sentence starters, vocabulary checks.
   - SEN Scaffolding: Chunked instructions, visual timers, enlarged fonts, accessible tasks.
   - Extension Tasks: Challenging problem solving, generalization, algebraic proof, multiple representations.
6. 5E Instructional Sequence:
   - Engage (${engageT} min): Real-world hook, question, or diagnostic task. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Explore (${exploreT} min): Student-centred inquiry, hands-on or paired investigation where students discover rules before being told. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Explain (${explainT} min): Students articulate discoveries, teacher formalises mathematical notation, theorems, and clarifies misconceptions. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Elaborate (${elaborateT} min): Applying understanding to new/varied problems, differentiated challenge. Explicit teacher & student activities + 3 assessment/SLO bullets.
   - Evaluate (${evaluateT} min): Exit ticket covering AO1/AO2/AO3, independent check. Explicit teacher & student activities + 3 assessment/SLO bullets.
7. Cambridge AOs:
   - AO1: Knowledge & Understanding description for this lesson.
   - AO2: Application & Problem Solving description for this lesson.
   - AO3: Mathematical Reasoning & Communication description for this lesson.
8. Formative Assessment (3 items), Homework (3 items), Post-Lesson Reflection (3 reflective questions for the teacher).
9. Slide location & Learner's Book reference.
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
            'struggledscaff_1',
            'struggledscaff_2',
            'struggledscaff_3',
            'ealsupport_1',
            'ealsupport_2',
            'ealsupport_3',
            'senscaff_1',
            'senscaff_2',
            'senscaff_3',
            'extensiontask_1',
            'extensiontask_2',
            'extensiontask_3',
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

    // Clean any accidental redundant prefixes like "Unit 4" -> "4", "Year 7" -> "7"
    const cleanUnit = (parsed.unit || unit || '1').toString().replace(/^unit\s*/i, '').trim();
    const cleanKelas = (parsed.kelas || kelas || '7').toString().replace(/^year\s*/i, '').replace(/\s*\(smp\)/i, '').trim();
    const cleanDuration = (parsed.duration || duration || '80 min').toString().replace(/\s*minutes?/i, ' min');

    // Merge defaults to ensure all fields exist
    const plan = {
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
      slide: parsed.slide || `IFP Presentation — Unit ${cleanUnit} Lesson ${parsed.lesson || lesson}`,
      LB: parsed.LB || `Learner's Book ${cleanKelas}, Unit ${cleanUnit}`,
      hodReviewApproved: false,
      hodReviewFeedback: false,
    };

    res.json({ success: true, plan });
  } catch (err: any) {
    console.error('Error in /api/generate-lesson-plan:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to generate lesson plan',
    });
  }
});

// Endpoint: Regenerate a specific section
app.post('/api/regenerate-section', async (req, res) => {
  try {
    const { section, currentPlan, promptAddition } = req.body;

    const prompt = `
You are updating a specific section of a Cambridge Lower Secondary Mathematics (0862) lesson plan for Semesta School.
Unit: "${currentPlan.tittle_unit}" (Year ${currentPlan.kelas}, Lesson ${currentPlan.lesson} of ${currentPlan.total_lesson}).
Duration: ${currentPlan.duration}.
Section to update: "${section}".
Additional instructions: "${promptAddition || 'Make it more interactive, rigorous, and student-centred'}".

Current WALT objectives:
1. ${currentPlan.LO_1}
2. ${currentPlan.LO_2}
3. ${currentPlan.LO_3}

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
    res.json({ success: true, updatedFields: parsed });
  } catch (err: any) {
    console.error('Error in /api/regenerate-section:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to regenerate section',
    });
  }
});

// Vite dev middleware or static serving
async function setupServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Cambridge Lesson Plan Server running on port ${PORT}`);
  });
}

setupServer();
