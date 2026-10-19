export interface CurriculumTopic {
  id: string;
  yearGroup: '7' | '8' | '9';
  unitNumber: string;
  unitTitle: string;
  totalLessons: string;
  strand: 'Number' | 'Algebra' | 'Geometry & Measure' | 'Statistics & Probability';
  cambridgeCode: string;
  learningObjectives: string[];
  suggestedKeywords: string;
  textbookRef: string;
  defaultAOs: {
    AO1: string;
    AO2: string;
    AO3: string;
  };
}

export const CAMBRIDGE_CURRICULUM_PRESETS: CurriculumTopic[] = [
  {
    id: 'y7-integers',
    yearGroup: '7',
    unitNumber: '1',
    unitTitle: 'Integers and Powers',
    totalLessons: '6',
    strand: 'Number',
    cambridgeCode: '7Ni.01, 7Ni.02, 7Ni.03',
    learningObjectives: [
      'Understand and use negative integers in real-world contexts, including temperatures and bank balances.',
      'Multiply and divide directed numbers using sign rules and number line representations.',
      'Understand and calculate positive integer powers and square roots of square numbers up to 144.',
    ],
    suggestedKeywords: 'Integer (bilangan bulat), Directed number (bilangan berarah), Power (pangkat), Square root (akar kuadrat), Absolute value (nilai mutlak)',
    textbookRef: "Learner's Book 7, Unit 1, pp. 6–18",
    defaultAOs: {
      AO1: 'Recall rules for calculating with positive and negative integers.',
      AO2: 'Apply operations with directed numbers to solve real-world temperature and financial problems.',
      AO3: 'Explain and justify why multiplying two negative integers results in a positive product using pattern patterns.',
    },
  },
  {
    id: 'y7-algebra',
    yearGroup: '7',
    unitNumber: '2',
    unitTitle: 'Expressions, Formulae and Equations',
    totalLessons: '8',
    strand: 'Algebra',
    cambridgeCode: '7Ae.01, 7Ae.02, 7Ae.03',
    learningObjectives: [
      'Understand that letters can be used to represent unknown values and variables in mathematical contexts.',
      'Simplify algebraic expressions by collecting like terms and expanding single brackets.',
      'Construct and solve simple linear equations with integer solutions using inverse operations.',
    ],
    suggestedKeywords: 'Expression (bentuk aljabar), Variable (variabel), Coefficient (koefisien), Like terms (suku sejenis), Equation (persamaan)',
    textbookRef: "Learner's Book 7, Unit 2, pp. 24–42",
    defaultAOs: {
      AO1: 'Identify terms, coefficients, constants, and unknown variables in algebraic expressions.',
      AO2: 'Formulate algebraic equations from word problems and calculate unknown values.',
      AO3: 'Verify algebraic equivalence using substitution and justify balance method steps.',
    },
  },
  {
    id: 'y7-fractions',
    yearGroup: '7',
    unitNumber: '4',
    unitTitle: 'Fractions, Decimals and Percentages',
    totalLessons: '7',
    strand: 'Number',
    cambridgeCode: '7Nf.01, 7Nf.02, 7Nf.03',
    learningObjectives: [
      'Convert flexibly between fractions, decimals, and percentages for benchmark values and general numbers.',
      'Add, subtract, multiply, and divide proper fractions and mixed numbers using common denominators.',
      'Calculate percentage increase and decrease in financial contexts such as discounts and taxes.',
    ],
    suggestedKeywords: 'Equivalent fraction (pecahan senilai), Reciprocal (kebalikan), Percentage (persentase), Benchmark value (nilai patokan)',
    textbookRef: "Learner's Book 7, Unit 4, pp. 62–80",
    defaultAOs: {
      AO1: 'Recognise equivalent fractional representations and common decimal benchmarks.',
      AO2: 'Solve multi-step discount, profit, and sharing problems involving fractions and percentages.',
      AO3: 'Critique peer calculation methods and prove equivalence through visual bar models.',
    },
  },
  {
    id: 'y7-angles',
    yearGroup: '7',
    unitNumber: '5',
    unitTitle: 'Angles and Geometric Constructions',
    totalLessons: '5',
    strand: 'Geometry & Measure',
    cambridgeCode: '7Gg.01, 7Gg.02, 7Gg.03',
    learningObjectives: [
      'Calculate unknown angles on a straight line, at a point, and vertically opposite angles.',
      'Derive and use the sum of interior angles in triangles and quadrilaterals.',
      'Use a protractor and compass to accurately construct triangles given ASA, SAS, and SSS conditions.',
    ],
    suggestedKeywords: 'Supplementary angles (sudut berpelurus), Vertically opposite (bertolak belakang), Interior angle (sudut dalam), Construction (konstruksi)',
    textbookRef: "Learner's Book 7, Unit 5, pp. 88–104",
    defaultAOs: {
      AO1: 'State angle facts for lines, points, triangles, and quadrilaterals.',
      AO2: 'Apply geometric theorems to find missing angles in multi-step composite diagrams.',
      AO3: 'Construct geometric proofs citing exact angle theorems and deductive logic.',
    },
  },
  {
    id: 'y8-proportions',
    yearGroup: '8',
    unitNumber: '3',
    unitTitle: 'Ratio and Proportion',
    totalLessons: '6',
    strand: 'Number',
    cambridgeCode: '8Np.01, 8Np.02, 8Np.03',
    learningObjectives: [
      'Simplify ratios and divide quantities in a given ratio (two or three parts).',
      'Solve direct proportion problems using unitary method and proportional multipliers.',
      'Interpret map scales and solve real-world scale model dimensions.',
    ],
    suggestedKeywords: 'Ratio (perbandingan), Direct proportion (perbandingan senilai), Unitary method (metode kesatuan), Scale factor (faktor skala)',
    textbookRef: "Learner's Book 8, Unit 3, pp. 48–66",
    defaultAOs: {
      AO1: 'Recall the definition of ratio and recognize direct proportionality in tables and graphs.',
      AO2: 'Calculate recipe scaling, currency exchange, and speed-distance-time proportions.',
      AO3: 'Compare multiple strategies (unitary vs multiplier method) and justify proportional reasoning.',
    },
  },
  {
    id: 'y8-linear-graphs',
    yearGroup: '8',
    unitNumber: '2',
    unitTitle: 'Linear Graphs and Functions',
    totalLessons: '7',
    strand: 'Algebra',
    cambridgeCode: '8Ae.01, 8Ae.02, 8Ae.03',
    learningObjectives: [
      'Plot graphs of linear equations in the form y = mx + c using a table of values.',
      'Interpret the gradient (m) and y-intercept (c) from linear graphs and equations.',
      'Model real-life situations with straight-line distance-time and conversion graphs.',
    ],
    suggestedKeywords: 'Gradient (kemiringan / gradien), Y-intercept (titik potong sumbu y), Linear graph (grafik linier), Rate of change (laju perubahan)',
    textbookRef: "Learner's Book 8, Unit 2, pp. 30–46",
    defaultAOs: {
      AO1: 'Identify gradient and y-intercept from standard form y = mx + c.',
      AO2: 'Construct and interpret graphs representing practical rates of change and travel graphs.',
      AO3: 'Explain the geometric effect of varying m and c on parallel and intersecting lines.',
    },
  },
  {
    id: 'y9-pythagoras',
    yearGroup: '9',
    unitNumber: '3',
    unitTitle: "Pythagoras' Theorem",
    totalLessons: '6',
    strand: 'Geometry & Measure',
    cambridgeCode: '9Gg.01, 9Gg.02, 9Gg.03',
    learningObjectives: [
      "Understand and state Pythagoras' theorem for right-angled triangles (a² + b² = c²).",
      'Calculate the length of the hypotenuse and shorter sides in two-dimensional right-angled triangles.',
      "Apply Pythagoras' theorem to solve practical problems involving ladders, navigation, and diagonal distances.",
    ],
    suggestedKeywords: 'Hypotenuse (sisi miring / hipotenusa), Right-angled triangle (segitiga siku-siku), Theorem (teorema), Pythagorean triple (tripel Pythagoras)',
    textbookRef: "Learner's Book 9, Unit 3, pp. 52–68",
    defaultAOs: {
      AO1: "State Pythagoras' theorem and identify the hypotenuse in right-angled triangles.",
      AO2: "Calculate missing lengths in composite 2D shapes and coordinate grids using Pythagoras' theorem.",
      AO3: "Formulate geometric proofs of Pythagoras' theorem using square dissections and evaluate whether a triangle is right-angled.",
    },
  },
  {
    id: 'y9-quadratics',
    yearGroup: '9',
    unitNumber: '2',
    unitTitle: 'Quadratic Expressions and Equations',
    totalLessons: '8',
    strand: 'Algebra',
    cambridgeCode: '9Ae.01, 9Ae.02, 9Ae.03',
    learningObjectives: [
      'Expand products of two linear binomial brackets using the distributive property.',
      'Factorise quadratic expressions of the form x² + bx + c and difference of two squares.',
      'Solve quadratic equations by factorisation and interpret solutions in practical contexts.',
    ],
    suggestedKeywords: 'Quadratic (kuadrat), Binomial (suku dua), Factorisation (pemfaktoran), Difference of two squares (selisih dua kuadrat)',
    textbookRef: "Learner's Book 9, Unit 2, pp. 34–50",
    defaultAOs: {
      AO1: 'Recognise quadratic forms and rules for expanding and factorising expressions.',
      AO2: 'Solve quadratic equations arising from geometric area problems.',
      AO3: 'Explain why quadratic equations can have two, one, or zero real roots and verify solutions.',
    },
  },
];

export const DEFAULT_LESSON_PLAN: import('../types/lessonPlan').LessonPlanData = {
  tittle_unit: 'Integers and Powers',
  unit: '1',
  lesson: '1',
  total_lesson: '6',
  kelas: '7',
  duration: '80 min',
  date_L: '20',
  month_L: '10',
  year_L: '2026',

  teacher: 'Niswa Ajilla, S.Mat',
  department: 'Mathematics',
  syllabus: 'Cambridge Lower Secondary Mathematics 0862',
  AO1: 'Recall rules for calculating with positive and negative integers.',
  AO2: 'Apply operations with directed numbers to solve real-world temperature and financial problems.',
  AO3: 'Explain and justify why multiplying two negative integers results in a positive product using pattern analysis.',

  LO_1: 'Students will be able to represent, order, and compare directed numbers on a horizontal and vertical number line.',
  LO_2: 'Students will be able to perform addition and subtraction with negative integers using zero pairs and number line models.',
  LO_3: 'Students will be able to calculate temperature differences and elevation changes in real-world contexts.',

  WILF_1: 'Accurate placement and comparison of at least 5 positive and negative integers on a number line.',
  WILF_2: 'Correct calculation of directed number addition/subtraction showing working or zero-pair models.',
  WILF_3: 'Clear mathematical explanation of real-life context questions with correct units (°C, metres).',

  SLO_1: 'Express mathematical thinking openly during group discussions without fear of errors.',
  SLO_2: 'Manage manipulatives and group task roles diligently, completing assigned practice on time.',
  SLO_3: 'Identify misconceptions in integer subtraction and self-correct using zero-pair counters.',
  SLO_4: 'Devise creative visual analogies or game rules to explain negative numbers to peers.',

  keyword: 'Integer (bilangan bulat), Directed number (bilangan berarah), Zero pair (pasangan nol), Absolute value (nilai mutlak), Difference (selisih)',

  struggledscaff_1: 'Provide laminated vertical number lines with colour-coded positive (blue) and negative (red) arrows.',
  struggledscaff_2: 'Use two-colour counters (yellow = +1, red = -1) to physically model zero pairs before abstract calculation.',
  struggledscaff_3: 'Supply sentence frames: "Starting at __, moving __ units because __ gives a result of __".',

  ealsupport_1: 'Provide bilingual visual vocabulary mat with English-Bahasa Indonesia terms and diagram representations.',
  ealsupport_2: 'Encourage paired talk in home language for 60 seconds before sharing in English.',
  ealsupport_3: 'Annotate all word problems with visual icons (thermometer, submarine, bank deposit/withdrawal).',

  senscaff_1: 'Provide clear, enlarged font worksheets with ample spacing between calculation steps.',
  senscaff_2: 'Break multi-step tasks into numbered micro-checklists with visual countdown timers.',
  senscaff_3: 'Permit tactile counters and desk-taped number lines for continuous kinesthetic anchoring.',

  extensiontask_1: 'Investigate the pattern: (-1)ⁿ for even and odd powers of n, formulating a general algebraic conjecture.',
  extensiontask_2: 'Create a four-quadrant submarine coordinate puzzle with directed distance vectors.',
  extensiontask_3: 'Critique and disprove a fictional student\'s claim that "subtracting always makes a number smaller".',

  engage_t: '10',
  engage: 'Teacher displays real-time weather data comparing Mount Everest summit (-28°C), Jakarta (+32°C), and Yakutsk (-45°C). Students calculate the temperature gap between Jakarta and Yakutsk on mini-whiteboards. Teacher prompts: "Can temperature go below zero? What does 0°C mean in physical science?" Students turn and talk for 2 minutes to define negative numbers in daily life.',
  assessment_engage1: 'Observation of mini-whiteboard temperature gap answers',
  assessment_engage2: 'Targeted oral questioning on physical meaning of negative numbers',
  assessment_engage3: 'SLO-1 check: readiness to volunteer initial intuitive ideas',

  explore_t: '25',
  explore: 'Students work in pairs with sets of two-colour integer counters (Yellow = +1, Red = -1). Teacher poses Challenge 1: Represent (+3) + (-5) using zero pairs. Challenge 2: Represent (+2) - (-3) using zero pairs (students discover they must introduce neutral zero pairs to subtract negatives). Students document their moves in a structured investigation logbook, noting rules they observe.',
  assessment_explore1: 'Circulating rubrics on physical zero-pair modeling accuracy',
  assessment_explore2: 'Listening to peer dialogue on the necessity of adding zero pairs',
  assessment_explore3: 'SLO-2 & SLO-4 check: collaborative exploration and inventive models',

  explain_t: '15',
  explain: 'Selected student pairs present their zero-pair discoveries on the Interactive Flat Panel (IFP). Teacher formalises mathematical definitions: additive inverse, zero pair principle, and directional vector movements on number lines. Teacher explicitly models how subtracting a negative is equivalent to adding its opposite: a - (-b) = a + b, demonstrating both graphically and algebraically.',
  assessment_explain1: 'Student IFP presentation clarity and mathematical vocabulary use',
  assessment_explain2: 'Cold-call questions verifying understanding of the additive inverse',
  assessment_explain3: 'SLO-3 check: reflecting on initial confusion vs formalised concept',

  elaborate_t: '20',
  elaborate: 'Students transition to differentiated application problems: (1) Core tier solves elevation changes from Dead Sea (-430 m) to Mount Hermon (+2814 m); (2) Extension tier solves bank transaction ledger mysteries with debit/credit balance shifts and missing values; (3) Teacher convenes a targeted guided table for students requiring concrete counters.',
  assessment_elaborate1: 'Review of tiered problem-solving worksheets in real-time',
  assessment_elaborate2: 'Spot-checks on correct unit inclusion (m, USD, °C)',
  assessment_elaborate3: 'SLO-2 check: independent diligence and academic responsibility',

  evaluate_t: '10',
  evaluate: 'Students complete an individual 3-question Exit Ticket covering: Q1 (AO1: Calculate -14 - (-8)), Q2 (AO2: Real-world elevation change problem), Q3 (AO3: Justify whether subtracting a negative number always increases the value). Students submit slips into "Got It / Need Help" reflection boxes before dismissal.',
  assessment_evaluate1: 'Individual exit ticket submission marking for AO1/AO2/AO3',
  assessment_evaluate2: 'Exit ticket (AO1/AO2/AO3). Self-assessment rating (1 to 4 stars)',
  assessment_evaluate3: 'SLO-3 check: accurate self-reflection on lesson understanding',

  formative_1: 'Mini-whiteboard check during Engage phase (temperature differences)',
  formative_2: 'Zero-pair manipulative checkpoint observations during Explore phase',
  formative_3: 'Exit ticket: AO1/AO2/AO3 (Evaluate — informs next lesson)',

  nextlesson_1: 'Complete Cambridge Learner\'s Book 7, Exercise 1.2 Q1–6 (Practice on directed number operations)',
  nextlesson_2: 'Find one real-world headline or news article featuring negative numbers (e.g. finance, science)',
  nextlesson_3: 'Preview next topic: Multiplying and dividing directed numbers',

  postlesson_1: 'Were learning objectives (WALT 1-3) attained by ≥ 85% of students based on exit ticket metrics?',
  postlesson_2: 'Did students transition smoothly from physical zero pairs to abstract subtraction rules?',
  postlesson_3: 'Which students require follow-up scaffolding during the next warm-up session?',

  slide: 'IFP Presentation — Unit 1 Lesson 1 (Google Slides / Edunav)',
  LB: "Learner's Book 7, Unit 1, pp. 6–18",

  date_s: '20',
  month_s: '10',
  year_s: '2026',
  hodReviewApproved: false,
  hodReviewFeedback: false,
};
