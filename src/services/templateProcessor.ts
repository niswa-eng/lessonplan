import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { LessonPlanData } from '../types/lessonPlan';

let cachedTemplateBuffer: ArrayBuffer | null = null;
let customTemplateBuffer: ArrayBuffer | null = null;

export function setCustomTemplate(buffer: ArrayBuffer | null) {
  customTemplateBuffer = buffer;
}

export function hasCustomTemplate(): boolean {
  return customTemplateBuffer !== null;
}

export function clearCustomTemplate() {
  customTemplateBuffer = null;
}

export async function getActiveTemplateBuffer(): Promise<ArrayBuffer> {
  if (customTemplateBuffer) {
    return customTemplateBuffer;
  }
  if (cachedTemplateBuffer) {
    return cachedTemplateBuffer;
  }
  const res = await fetch('/templates/Format_Lesson_Plan.docx');
  if (!res.ok) {
    throw new Error(`Failed to load authoritative template: ${res.statusText}`);
  }
  cachedTemplateBuffer = await res.arrayBuffer();
  return cachedTemplateBuffer;
}

export function processDocxTemplate(
  templateBuffer: ArrayBuffer | Uint8Array | Buffer,
  data: LessonPlanData
): Blob {
  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '{{', end: '}}' },
  });

  const tags: Record<string, string> = {
    tittle_unit: data.tittle_unit || '',
    unit: data.unit || '1',
    lesson: data.lesson || '1',
    total_lesson: data.total_lesson || '1',
    kelas: data.kelas || '7',
    duration: data.duration || '80 min',
    date_L: data.date_L || '20',
    month_L: data.month_L || '10',
    year_L: data.year_L || '2026',
    teacher: data.teacher || 'Niswa Ajilla, S.Mat',
    department: data.department || 'Mathematics',
    syllabus: data.syllabus || 'Cambridge Lower Secondary Mathematics 0862',
    AO1: data.AO1 || '',
    AO2: data.AO2 || '',
    AO3: data.AO3 || '',
    LO_1: data.LO_1 || '',
    LO_2: data.LO_2 || '',
    LO_3: data.LO_3 || '',
    WILF_1: data.WILF_1 || '',
    WILF_2: data.WILF_2 || '',
    WILF_3: data.WILF_3 || '',
    SLO_1: data.SLO_1 || '',
    SLO_2: data.SLO_2 || '',
    SLO_3: data.SLO_3 || '',
    SLO_4: data.SLO_4 || '',
    keyword: data.keyword || '',
    struggledscaff_1: data.struggledscaff_1 || '',
    struggledscaff_2: data.struggledscaff_2 || '',
    struggledscaff_3: data.struggledscaff_3 || '',
    ealsupport_1: data.ealsupport_1 || '',
    ealsupport_2: data.ealsupport_2 || '',
    ealsupport_3: data.ealsupport_3 || '',
    senscaff_1: data.senscaff_1 || '',
    senscaff_2: data.senscaff_2 || '',
    senscaff_3: data.senscaff_3 || '',
    extensiontask_1: data.extensiontask_1 || '',
    extensiontask_2: data.extensiontask_2 || '',
    extensiontask_3: data.extensiontask_3 || '',
    engage_t: data.engage_t || '10',
    engage: data.engage || '',
    assessment_engage1: data.assessment_engage1 || '',
    assessment_engage2: data.assessment_engage2 || '',
    assessment_engage3: data.assessment_engage3 || '',
    explore_t: data.explore_t || '25',
    explore: data.explore || '',
    assessment_explore1: data.assessment_explore1 || '',
    assessment_explore2: data.assessment_explore2 || '',
    assessment_explore3: data.assessment_explore3 || '',
    explain_t: data.explain_t || '15',
    explain: data.explain || '',
    assessment_explain1: data.assessment_explain1 || '',
    assessment_explain2: data.assessment_explain2 || '',
    assessment_explain3: data.assessment_explain3 || '',
    elaborate_t: data.elaborate_t || '20',
    elaborate: data.elaborate || '',
    assessment_elaborate1: data.assessment_elaborate1 || '',
    assessment_elaborate2: data.assessment_elaborate2 || '',
    assessment_elaborate3: data.assessment_elaborate3 || '',
    evaluate_t: data.evaluate_t || '10',
    evaluate: data.evaluate || '',
    assessment_evaluate1: data.assessment_evaluate1 || '',
    assessment_evaluate2: data.assessment_evaluate2 || '',
    assessment_evaluate3: data.assessment_evaluate3 || '',
    formative_1: data.formative_1 || '',
    formative_2: data.formative_2 || '',
    formative_3: data.formative_3 || '',
    nextlesson_1: data.nextlesson_1 || '',
    nextlesson_2: data.nextlesson_2 || '',
    nextlesson_3: data.nextlesson_3 || '',
    postlesson_1: data.postlesson_1 || '',
    postlesson_2: data.postlesson_2 || '',
    postlesson_3: data.postlesson_3 || '',
    slide: data.slide || '',
    LB: data.LB || '',
    date_s: data.date_s || data.date_L || '20',
    month_s: data.month_s || data.month_L || '10',
    year_s: data.year_s || data.year_L || '2026',
  };

  doc.render(tags);

  const out = doc.getZip().generate({
    type: 'uint8array',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    compression: 'DEFLATE',
  });

  const blobBuffer = out.buffer as ArrayBuffer;
  return new Blob([blobBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

export async function exportLessonPlanDocx(data: LessonPlanData): Promise<Blob> {
  const buffer = await getActiveTemplateBuffer();
  return processDocxTemplate(buffer, data);
}
