export interface LessonPlanData {
  // Unit & Header
  tittle_unit: string;
  unit: string;
  lesson: string;
  total_lesson: string;
  kelas: string; // e.g. "7", "8", "9"
  duration: string; // e.g. "80 min"
  date_L: string;
  month_L: string;
  year_L: string;

  // Teacher & Syllabus
  teacher: string;
  department: string;
  syllabus: string;
  AO1: string;
  AO2: string;
  AO3: string;

  // WALT / WILF / SLO
  LO_1: string;
  LO_2: string;
  LO_3: string;
  WILF_1: string;
  WILF_2: string;
  WILF_3: string;
  SLO_1: string; // Confident
  SLO_2: string; // Responsible
  SLO_3: string; // Reflective
  SLO_4: string; // Innovative

  // CLIL
  keyword: string;

  // Differentiation
  struggledscaff_1: string;
  struggledscaff_2: string;
  struggledscaff_3: string;
  ealsupport_1: string;
  ealsupport_2: string;
  ealsupport_3: string;
  senscaff_1: string;
  senscaff_2: string;
  senscaff_3: string;
  extensiontask_1: string;
  extensiontask_2: string;
  extensiontask_3: string;

  // 5E Phases
  engage_t: string;
  engage: string;
  assessment_engage1: string;
  assessment_engage2: string;
  assessment_engage3: string;

  explore_t: string;
  explore: string;
  assessment_explore1: string;
  assessment_explore2: string;
  assessment_explore3: string;

  explain_t: string;
  explain: string;
  assessment_explain1: string;
  assessment_explain2: string;
  assessment_explain3: string;

  elaborate_t: string;
  elaborate: string;
  assessment_elaborate1: string;
  assessment_elaborate2: string;
  assessment_elaborate3: string;

  evaluate_t: string;
  evaluate: string;
  assessment_evaluate1: string;
  assessment_evaluate2: string;
  assessment_evaluate3: string;

  // Formative Assessment, Homework, Reflection
  formative_1: string;
  formative_2: string;
  formative_3: string;

  nextlesson_1: string;
  nextlesson_2: string;
  nextlesson_3: string;

  postlesson_1: string;
  postlesson_2: string;
  postlesson_3: string;

  // Resources
  slide: string;
  LB: string;

  // Submission & Signatures
  date_s: string;
  month_s: string;
  year_s: string;
  hodReviewApproved?: boolean;
  hodReviewFeedback?: boolean;
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  field: string;
  message: string;
}
