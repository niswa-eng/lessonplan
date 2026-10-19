import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  Header,
  Footer,
  Packer,
  HeadingLevel,
} from 'docx';
import { LessonPlanData } from '../types/lessonPlan';

export async function generateDocxBlob(data: LessonPlanData): Promise<Blob> {
  const font = 'Arial';
  const primaryTeal = '006064';
  const darkBlue = '2E5496';
  const vibrantBlue = '2563EB';
  const elaborateOrange = 'E65100';
  const evaluateGreen = '2E7D32';
  const exploreTeal = '00838F';
  const senRed = 'C62828';
  const purpleCol = '4A148C';
  const darkSlate = '334155';
  const lightCyan = 'E0F7FA';
  const lightGrey = 'F8FAFC';
  const borderGrey = 'CBD5E1';

  const defaultBorder = {
    top: { style: BorderStyle.SINGLE, size: 4, color: borderGrey },
    bottom: { style: BorderStyle.SINGLE, size: 4, color: borderGrey },
    left: { style: BorderStyle.SINGLE, size: 4, color: borderGrey },
    right: { style: BorderStyle.SINGLE, size: 4, color: borderGrey },
  };

  const noBorder = {
    top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
    right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  };

  // 1. Header (School Header with bottom line)
  const docHeader = new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 120 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: '006064' },
        },
        children: [
          new TextRun({
            text: 'SEMESTA SCHOOL | EV-B3.1 | Lesson Plans | WASC Initial Report 2026-2027',
            font,
            size: 17, // ~8.5pt
            bold: true,
            color: '475569',
          }),
        ],
      }),
    ],
  });

  // 2. Footer (Cambridge accreditation with top line)
  const docFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 6, color: '006064' },
        },
        children: [
          new TextRun({
            text: 'Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3',
            font,
            size: 16, // 8pt
            color: '64748B',
            italics: true,
          }),
        ],
      }),
    ],
  });

  // Main title
  const titleParagraph = new Paragraph({
    spacing: { before: 100, after: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 8, color: '006064' },
    },
    children: [
      new TextRun({
        text: `Lesson Plan: Cambridge Lower Secondary Mathematics — ${data.tittle_unit || 'Untitled Unit'}`,
        font,
        size: 26, // 13pt
        bold: true,
        color: '006064',
      }),
    ],
  });

  // Table 1: Lesson Information
  const lessonInfoTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Banner row
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 4,
            shading: { fill: primaryTeal },
            borders: noBorder,
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: 'Cambridge Lower Secondary Mathematics (0862)',
                    font,
                    size: 22, // 11pt
                    bold: true,
                    color: 'FFFFFF',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: `Unit ${data.unit || '1'}: ${data.tittle_unit || ''}  |  Lesson ${data.lesson || '1'} of ${data.total_lesson || '1'}`,
                    font,
                    size: 18, // 9pt
                    color: 'E0F7FA',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Info Row 1
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Year Group\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: `Year ${data.kelas || '7'} (SMP)`, font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Lesson\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: `${data.lesson || '1'} / ${data.total_lesson || '6'}`, font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Duration\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: data.duration || '80 min', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Date\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: `${data.date_L || '20'} / ${data.month_L || '10'} / ${data.year_L || '2026'}`, font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Info Row 2
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Teacher\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: data.teacher || 'Niswa Ajilla, S.Mat', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Department\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: data.department || 'Mathematics', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Syllabus\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: data.syllabus || 'Cambridge Lower Secondary Mathematics 0862', font, size: 15, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                spacing: { after: 20 },
                children: [
                  new TextRun({ text: 'Cambridge AOs\n', font, size: 15, bold: true, color: '006064' }),
                  new TextRun({ text: `AO1 ${data.AO1 || 'Knowledge & Understanding'};\n`, font, size: 14, color: '1E293B' }),
                  new TextRun({ text: `AO2 ${data.AO2 || 'Application & Problem Solving'};\n`, font, size: 14, color: '1E293B' }),
                  new TextRun({ text: `AO3 ${data.AO3 || 'Reasoning & Communication'};`, font, size: 14, color: '1E293B' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 2: WALT, WILF, SLO Integration
  const waltWilfSloTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'WALT\n', font, size: 18, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'We Are Learning To', font, size: 14, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'WILF\n', font, size: 18, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: "What I'm Looking For", font, size: 14, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'SLO Integration\n', font, size: 18, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'Schoolwide Learner Outcomes', font, size: 14, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: '• ', font, size: 16, bold: true, color: primaryTeal }),
                  new TextRun({ text: data.LO_1 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: '• ', font, size: 16, bold: true, color: primaryTeal }),
                  new TextRun({ text: data.LO_2 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: '• ', font, size: 16, bold: true, color: primaryTeal }),
                  new TextRun({ text: data.LO_3 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: '✔ ', font, size: 16, bold: true, color: evaluateGreen }),
                  new TextRun({ text: data.WILF_1 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({ text: '✔ ', font, size: 16, bold: true, color: evaluateGreen }),
                  new TextRun({ text: data.WILF_2 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: '✔ ', font, size: 16, bold: true, color: evaluateGreen }),
                  new TextRun({ text: data.WILF_3 || '', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({ text: '★ SLO-1 Confident — ', font, size: 15, bold: true, color: 'B45309' }),
                  new TextRun({ text: data.SLO_1 || '', font, size: 15, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({ text: '★ SLO-2 Responsible — ', font, size: 15, bold: true, color: 'B45309' }),
                  new TextRun({ text: data.SLO_2 || '', font, size: 15, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                spacing: { after: 50 },
                children: [
                  new TextRun({ text: '★ SLO-3 Reflective — ', font, size: 15, bold: true, color: 'B45309' }),
                  new TextRun({ text: data.SLO_3 || '', font, size: 15, color: '1E293B' }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: '★ SLO-4 Innovative — ', font, size: 15, bold: true, color: 'B45309' }),
                  new TextRun({ text: data.SLO_4 || '', font, size: 15, color: '1E293B' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 3: CLIL
  const clilTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: lightCyan },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
              left: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
              right: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
            },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Language Objectives (CLIL): ', font, size: 16, bold: true, color: primaryTeal }),
                  new TextRun({ text: `Key terms: ${data.keyword || ''}. `, font, size: 16, color: '0F172A' }),
                  new TextRun({ text: 'EAL students: bilingual vocabulary mat provided (English–Bahasa Indonesia).', font, size: 15, italics: true, color: '475569' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 4: Differentiation Provisions
  const diffTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: darkBlue },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Struggled Scaffolding\n', font, size: 16, bold: true, color: 'FFFFFF' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'EAL Support\n', font, size: 16, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'English as Additional Language', font, size: 12, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: senRed },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'SEN Scaffolding\n', font, size: 16, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'Additional Learning Needs', font, size: 12, color: 'FFEBEE' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: purpleCol },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Extension Tasks\n', font, size: 16, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'High-Achieving Students', font, size: 12, color: 'F3E5F5' }),
                ],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '● ', font, size: 14, color: darkBlue }), new TextRun({ text: data.struggledscaff_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '● ', font, size: 14, color: darkBlue }), new TextRun({ text: data.struggledscaff_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '● ', font, size: 14, color: darkBlue }), new TextRun({ text: data.struggledscaff_3 || '', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.ealsupport_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.ealsupport_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.ealsupport_3 || '', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: senRed }), new TextRun({ text: data.senscaff_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: senRed }), new TextRun({ text: data.senscaff_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• ', font, size: 14, color: senRed }), new TextRun({ text: data.senscaff_3 || '', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: purpleCol }), new TextRun({ text: data.extensiontask_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: purpleCol }), new TextRun({ text: data.extensiontask_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• ', font, size: 14, color: purpleCol }), new TextRun({ text: data.extensiontask_3 || '', font, size: 15, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 5: 5E Instructional Model
  const fiveETable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 14, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Phase', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 10, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Time', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 48, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Teacher and Student Activity', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 28, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Assessment / SLO', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      // Engage
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Engage', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.engage_t || '10'} min`, font, size: 15, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: data.engage || '', font, size: 15, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: primaryTeal }), new TextRun({ text: data.assessment_engage1 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: primaryTeal }), new TextRun({ text: data.assessment_engage2 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ ', font, size: 13, color: primaryTeal }), new TextRun({ text: data.assessment_engage3 || '', font, size: 14, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Explore
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: exploreTeal },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Explore', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.explore_t || '25'} min`, font, size: 15, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: data.explore || '', font, size: 15, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: exploreTeal }), new TextRun({ text: data.assessment_explore1 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: exploreTeal }), new TextRun({ text: data.assessment_explore2 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ ', font, size: 13, color: exploreTeal }), new TextRun({ text: data.assessment_explore3 || '', font, size: 14, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Explain
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: darkBlue },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Explain', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.explain_t || '15'} min`, font, size: 15, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: data.explain || '', font, size: 15, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: darkBlue }), new TextRun({ text: data.assessment_explain1 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: darkBlue }), new TextRun({ text: data.assessment_explain2 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ ', font, size: 13, color: darkBlue }), new TextRun({ text: data.assessment_explain3 || '', font, size: 14, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Elaborate
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: elaborateOrange },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Elaborate', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.elaborate_t || '20'} min`, font, size: 15, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: data.elaborate || '', font, size: 15, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: elaborateOrange }), new TextRun({ text: data.assessment_elaborate1 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: elaborateOrange }), new TextRun({ text: data.assessment_elaborate2 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ ', font, size: 13, color: elaborateOrange }), new TextRun({ text: data.assessment_elaborate3 || '', font, size: 14, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Evaluate
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: evaluateGreen },
            margins: { top: 80, bottom: 80, left: 80, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Evaluate', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 60, right: 60 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${data.evaluate_t || '10'} min`, font, size: 15, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: data.evaluate || '', font, size: 15, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: evaluateGreen }), new TextRun({ text: data.assessment_evaluate1 || '', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '▶ ', font, size: 13, color: evaluateGreen }), new TextRun({ text: `Exit ticket (AO1/AO2/AO3). ${data.assessment_evaluate2 || ''}`, font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ ', font, size: 13, color: evaluateGreen }), new TextRun({ text: data.assessment_evaluate3 || '', font, size: 14, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 6: Formative Assessment, Homework, and Teacher Reflection
  const assessmentTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Formative Assessment (in class)', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: darkBlue },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Homework / Next Lesson (outside class)', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: darkSlate },
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Teacher Post-Lesson Reflection', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.formative_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.formative_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: data.formative_3 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• ', font, size: 14, color: primaryTeal }), new TextRun({ text: 'Exit ticket: AO1/AO2/AO3 (Evaluate — informs next lesson)', font, size: 15, bold: true, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: darkBlue }), new TextRun({ text: data.nextlesson_1 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '• ', font, size: 14, color: darkBlue }), new TextRun({ text: data.nextlesson_2 || '', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• ', font, size: 14, color: darkBlue }), new TextRun({ text: data.nextlesson_3 || '', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: data.postlesson_1 || '', font, size: 14, italics: true, color: '475569' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: data.postlesson_2 || '', font, size: 14, italics: true, color: '475569' })] }),
              new Paragraph({ children: [new TextRun({ text: data.postlesson_3 || '', font, size: 14, italics: true, color: '475569' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 7: Resource List
  const resourceTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 20, type: WidthType.PERCENTAGE },
            shading: { fill: vibrantBlue },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Type', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: { fill: vibrantBlue },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Resource Name', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: { fill: vibrantBlue },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Location / Access', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'Digital', font, size: 15, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'IFP Presentation', font, size: 15, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: data.slide || '', font, size: 15, color: '1E293B' })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'Textbook', font, size: 15, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: `Cambridge Lower Secondary Mathematics ${data.LB || ''}`, font, size: 15, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'Student copies — class set in bookshelf', font, size: 15, color: '1E293B' })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'ASP/SEN', font, size: 15, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'Individual Support Plans', font, size: 15, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: [new Paragraph({ children: [new TextRun({ text: 'Teacher locked drawer — do not distribute', font, size: 15, color: '1E293B' })] })] }),
        ],
      }),
    ],
  });

  // Table 8: STQS Alignment
  const stqsTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: primaryTeal },
              bottom: { style: BorderStyle.SINGLE, size: 6, color: primaryTeal },
              left: { style: BorderStyle.SINGLE, size: 6, color: primaryTeal },
              right: { style: BorderStyle.SINGLE, size: 6, color: primaryTeal },
            },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'STQS Alignment: ',
                    font,
                    size: 15,
                    bold: true,
                    color: primaryTeal,
                  }),
                  new TextRun({
                    text: 'Domain 1 (Cambridge AOs) | Domain 2 (WALT/WILF, three-tier differentiation) | Domain 4 (5E model, higher-order questioning) | Domain 5 (Five embedded formative assessment points)',
                    font,
                    size: 15,
                    color: '334155',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 9: Signatures & HoD Review
  const signatureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Teacher', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { fill: darkBlue },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Head of Department — Science', font, size: 16, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: `Signature: ${data.teacher || 'Niswa Ajilla, S.Mat'}`, font, size: 15, italics: true, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: `Submitted to Edunav: ${data.date_s || '20'} / ${data.month_s || '10'} / ${data.year_s || '2026'}`, font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({ text: 'HoD review: ', font, size: 15, bold: true, color: '1E293B' }),
                  new TextRun({ text: data.hodReviewApproved ? '☑ Approved  ' : '□ Approved  ', font, size: 15, color: '1E293B' }),
                  new TextRun({ text: data.hodReviewFeedback ? '☑ Feedback provided' : '□ Feedback provided', font, size: 15, color: '1E293B' }),
                ],
              }),
              new Paragraph({ children: [new TextRun({ text: 'HoD Signature: ______________________    Date: __ / __ / ______', font, size: 15, color: '475569' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  const sectionHeading = (title: string, color: string = primaryTeal) =>
    new Paragraph({
      spacing: { before: 140, after: 80 },
      children: [
        new TextRun({
          text: title,
          font,
          size: 20, // 10pt
          bold: true,
          color,
        }),
      ],
    });

  const spacingParagraph = (heightTwips: number = 100) =>
    new Paragraph({
      spacing: { before: heightTwips, after: 0 },
      children: [],
    });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            // US Letter: 8.5 x 11 in (12240 x 15840 twips)
            size: {
              width: 12240,
              height: 15840,
            },
            // 0.75 in margins = 1080 twips
            margin: {
              top: 1080,
              bottom: 1080,
              left: 1080,
              right: 1080,
            },
          },
        },
        headers: { default: docHeader },
        footers: { default: docFooter },
        children: [
          titleParagraph,
          lessonInfoTable,
          spacingParagraph(120),
          waltWilfSloTable,
          spacingParagraph(100),
          clilTable,
          spacingParagraph(120),
          sectionHeading('Differentiation Provisions', primaryTeal),
          diffTable,
          spacingParagraph(120),
          sectionHeading('Lesson Sequence — 5E Instructional Model', primaryTeal),
          fiveETable,
          spacingParagraph(120),
          sectionHeading('Formative Assessment, Homework, and Teacher Reflection', primaryTeal),
          assessmentTable,
          spacingParagraph(120),
          sectionHeading('Resource List', vibrantBlue),
          resourceTable,
          spacingParagraph(120),
          stqsTable,
          spacingParagraph(120),
          signatureTable,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
