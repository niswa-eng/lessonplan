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
} from 'docx';
import fs from 'fs';
import path from 'path';

export async function createAuthoritativeTemplate(outputPath: string) {
  const font = 'Arial';
  const primaryTeal = '006064';
  const exploreTeal = '00838F';
  const darkBlue = '2E5496';
  const vibrantBlue = '2563EB';
  const elaborateOrange = 'E65100';
  const evaluateGreen = '2E7D32';
  const senRed = 'C62828';
  const purpleCol = '4A148C';
  const darkSlate = '334155';
  const lightCyan = 'E0F7FA';
  const lightGrey = 'F8FAFC';
  const borderGrey = 'B0BEC5';

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

  // Header: SEMESTA SCHOOL | EV-B3.1 | Lesson Plans | WASC Initial Report 2026-2027
  const docHeader = new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: 100 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
        },
        children: [
          new TextRun({
            text: 'SEMESTA SCHOOL | EV-B3.1 | Lesson Plans | WASC Initial Report 2026-2027',
            font,
            size: 16,
            bold: true,
            color: '475569',
          }),
        ],
      }),
    ],
  });

  // Footer: Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3
  const docFooter = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100 },
        border: {
          top: { style: BorderStyle.SINGLE, size: 8, color: primaryTeal },
        },
        children: [
          new TextRun({
            text: 'Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3',
            font,
            size: 15,
            color: '64748B',
            italics: true,
          }),
        ],
      }),
    ],
  });

  // Title: Lesson Plan: Cambridge Lower Secondary Mathematics — {{tittle_unit}}
  const titleParagraph = new Paragraph({
    spacing: { before: 80, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 10, color: primaryTeal },
    },
    children: [
      new TextRun({
        text: 'Lesson Plan: Cambridge Lower Secondary Mathematics — ',
        font,
        size: 24,
        bold: true,
        color: primaryTeal,
      }),
      new TextRun({
        text: '{{tittle_unit}}',
        font,
        size: 24,
        bold: true,
        color: primaryTeal,
      }),
    ],
  });

  // Table 1: Banner & Info
  const infoTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      // Banner
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 4,
            shading: { fill: primaryTeal },
            borders: noBorder,
            margins: { top: 100, bottom: 100, left: 140, right: 140 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { after: 30 },
                children: [
                  new TextRun({
                    text: 'Cambridge Lower Secondary Mathematics (0862)',
                    font,
                    size: 20,
                    bold: true,
                    color: 'FFFFFF',
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Unit {{unit}}: {{tittle_unit}} | Lesson {{lesson}} of {{total_lesson}}',
                    font,
                    size: 17,
                    color: 'E0F7FA',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Row 1
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Year Group\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'Year {{kelas}} (SMP)', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Lesson\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: '{{lesson}} / {{total_lesson}}', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Duration\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: '{{duration}}', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: lightGrey },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Date\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: '{{date_L}} / {{month_L}} / {{year_L}}', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
        ],
      }),
      // Row 2
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Teacher\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'Niswa Ajilla, S.Mat', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Department\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'Mathematics', font, size: 16, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Syllabus\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'Cambridge Lower Secondary Mathematics 0862', font, size: 15, color: '1E293B' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                spacing: { after: 20 },
                children: [
                  new TextRun({ text: 'Cambridge AOs\n', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'AO1 {{AO1}};\n', font, size: 14, color: '1E293B' }),
                  new TextRun({ text: 'AO2 {{AO2}};\n', font, size: 14, color: '1E293B' }),
                  new TextRun({ text: 'AO3 {{AO3}};', font, size: 14, color: '1E293B' }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 2: WALT, WILF, SLO Integration
  const waltTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'WALT\n', font, size: 17, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'We Are Learning To', font, size: 13, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'WILF\n', font, size: 17, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: "What I'm Looking For", font, size: 13, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'SLO Integration\n', font, size: 17, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'Schoolwide Learner Outcomes', font, size: 13, color: 'E0F7FA' }),
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
            margins: { top: 90, bottom: 90, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: '• {{LO_1}}', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: '• {{LO_2}}', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• {{LO_3}}', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 90, bottom: 90, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: '✔ {{WILF_1}}', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 50 }, children: [new TextRun({ text: '✔ {{WILF_2}}', font, size: 15, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '✔ {{WILF_3}}', font, size: 15, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            borders: defaultBorder,
            margins: { top: 90, bottom: 90, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '★ SLO-1 Confident — {{SLO_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '★ SLO-2 Responsible — {{SLO_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: '★ SLO-3 Reflective — {{SLO_3}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '★ SLO-4 Innovative — {{SLO_4}}', font, size: 14, color: '1E293B' })] }),
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
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Language Objectives (CLIL): ', font, size: 15, bold: true, color: primaryTeal }),
                  new TextRun({ text: 'Key terms: {{keyword}}. ', font, size: 15, color: '0F172A' }),
                  new TextRun({ text: 'EAL students: bilingual vocabulary mat provided (English–Bahasa Indonesia).', font, size: 14, italics: true, color: '475569' }),
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
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Struggled Scaffolding', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'EAL Support\n', font, size: 15, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'English as Additional Language', font, size: 11, color: 'E0F7FA' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: senRed },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'SEN Scaffolding\n', font, size: 15, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'Additional Learning Needs', font, size: 11, color: 'FFEBEE' }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            shading: { fill: purpleCol },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Extension Tasks\n', font, size: 15, bold: true, color: 'FFFFFF' }),
                  new TextRun({ text: 'High-Achieving Students', font, size: 11, color: 'F3E5F5' }),
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
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '● {{struggledscaff_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '● {{struggledscaff_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '● {{struggledscaff_3}}', font, size: 14, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{ealsupport_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{ealsupport_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• {{ealsupport_3}}', font, size: 14, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{senscaff_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{senscaff_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• {{senscaff_3}}', font, size: 14, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{extensiontask_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{extensiontask_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• {{extensiontask_3}}', font, size: 14, color: '1E293B' })] }),
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
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Phase', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 10, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Time', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 48, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Teacher and Student Activity', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 28, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Assessment / SLO', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      // Engage
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Engage', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '{{engage_t}} min', font, size: 14, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: '{{engage}}', font, size: 14, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_engage1}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_engage2}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ {{assessment_engage3}}', font, size: 13, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Explore
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: exploreTeal },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Explore', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '{{explore_t}} min', font, size: 14, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: '{{explore}}', font, size: 14, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_explore1}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_explore2}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ {{assessment_explore3}}', font, size: 13, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Explain
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: darkBlue },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Explain', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '{{explain_t}} min', font, size: 14, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: '{{explain}}', font, size: 14, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_explain1}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_explain2}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ {{assessment_explain3}}', font, size: 13, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Elaborate
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: elaborateOrange },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Elaborate', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '{{elaborate_t}} min', font, size: 14, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: '{{elaborate}}', font, size: 14, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_elaborate1}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_elaborate2}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ {{assessment_elaborate3}}', font, size: 13, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
      // Evaluate
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: evaluateGreen },
            margins: { top: 70, bottom: 70, left: 70, right: 70 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Evaluate', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 50, right: 50 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '{{evaluate_t}} min', font, size: 14, bold: true, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: '{{evaluate}}', font, size: 14, color: '1E293B' })] })],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ {{assessment_evaluate1}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 25 }, children: [new TextRun({ text: '▶ Exit ticket (AO1/AO2/AO3). {{assessment_evaluate2}}', font, size: 13, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '▶ {{assessment_evaluate3}}', font, size: 13, color: '1E293B' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  // Table 6: Formative Assessment, Homework, Reflection
  const assessTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Formative Assessment (in class)', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 33, type: WidthType.PERCENTAGE },
            shading: { fill: darkBlue },
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Homework / Next Lesson (outside class)', font, size: 14, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 34, type: WidthType.PERCENTAGE },
            shading: { fill: darkSlate },
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Teacher Post-Lesson Reflection', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{formative_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{formative_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{formative_3}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• Exit ticket: AO1/AO2/AO3 (Evaluate — informs next lesson)', font, size: 14, bold: true, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{nextlesson_1}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '• {{nextlesson_2}}', font, size: 14, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: '• {{nextlesson_3}}', font, size: 14, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 90, right: 90 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '{{postlesson_1}}', font, size: 14, italics: true, color: '475569' })] }),
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: '{{postlesson_2}}', font, size: 14, italics: true, color: '475569' })] }),
              new Paragraph({ children: [new TextRun({ text: '{{postlesson_3}}', font, size: 14, italics: true, color: '475569' })] }),
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
            margins: { top: 50, bottom: 50, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Type', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: { fill: vibrantBlue },
            margins: { top: 50, bottom: 50, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Resource Name', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 40, type: WidthType.PERCENTAGE },
            shading: { fill: vibrantBlue },
            margins: { top: 50, bottom: 50, left: 90, right: 90 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Location / Access', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Digital', font, size: 14, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'IFP Presentation', font, size: 14, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: '{{slide}}', font, size: 14, color: '1E293B' })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Textbook', font, size: 14, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Cambridge Lower Secondary Mathematics {{LB}}', font, size: 14, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Student copies — class set in bookshelf', font, size: 14, color: '1E293B' })] })] }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'ASP/SEN', font, size: 14, bold: true, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Individual Support Plans', font, size: 14, color: '1E293B' })] })] }),
          new TableCell({ borders: defaultBorder, margins: { top: 50, bottom: 50, left: 90, right: 90 }, children: [new Paragraph({ children: [new TextRun({ text: 'Teacher locked drawer — do not distribute', font, size: 14, color: '1E293B' })] })] }),
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
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'STQS Alignment: ',
                    font,
                    size: 14,
                    bold: true,
                    color: primaryTeal,
                  }),
                  new TextRun({
                    text: 'Domain 1 (Cambridge AOs) | Domain 2 (WALT/WILF, three-tier differentiation) | Domain 4 (5E model, higher-order questioning) | Domain 5 (Five embedded formative assessment points)',
                    font,
                    size: 14,
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

  // Table 9: Signatures
  const signatureTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { fill: primaryTeal },
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Teacher', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            shading: { fill: darkBlue },
            margins: { top: 50, bottom: 50, left: 100, right: 100 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Head of Department — Science', font, size: 15, bold: true, color: 'FFFFFF' })] })],
          }),
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: 'Signature: Niswa Ajilla, S.Mat', font, size: 14, italics: true, color: '1E293B' })] }),
              new Paragraph({ children: [new TextRun({ text: 'Submitted to Edunav: {{date_s}} / {{month_s}} / {{year_s}}', font, size: 14, color: '1E293B' })] }),
            ],
          }),
          new TableCell({
            borders: defaultBorder,
            margins: { top: 70, bottom: 70, left: 100, right: 100 },
            children: [
              new Paragraph({
                spacing: { after: 30 },
                children: [
                  new TextRun({ text: 'HoD review: □ Approved  □ Feedback provided', font, size: 14, color: '1E293B' }),
                ],
              }),
              new Paragraph({ children: [new TextRun({ text: 'HoD Signature: ______________________    Date: __ / __ / ______', font, size: 14, color: '475569' })] }),
            ],
          }),
        ],
      }),
    ],
  });

  const sectionHeading = (title: string, color: string = primaryTeal) =>
    new Paragraph({
      spacing: { before: 120, after: 60 },
      children: [
        new TextRun({
          text: title,
          font,
          size: 19,
          bold: true,
          color,
        }),
      ],
    });

  const spacingParagraph = (heightTwips: number = 90) =>
    new Paragraph({
      spacing: { before: heightTwips, after: 0 },
      children: [],
    });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: 12240, // 8.5 in
              height: 15840, // 11 in
            },
            margin: {
              top: 1080, // 0.75 in
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
          infoTable,
          spacingParagraph(100),
          waltTable,
          spacingParagraph(90),
          clilTable,
          spacingParagraph(100),
          sectionHeading('Differentiation Provisions', primaryTeal),
          diffTable,
          spacingParagraph(100),
          sectionHeading('Lesson Sequence — 5E Instructional Model', primaryTeal),
          fiveETable,
          spacingParagraph(100),
          sectionHeading('Formative Assessment, Homework, and Teacher Reflection', primaryTeal),
          assessTable,
          spacingParagraph(100),
          sectionHeading('Resource List', vibrantBlue),
          resourceTable,
          spacingParagraph(100),
          stqsTable,
          spacingParagraph(100),
          signatureTable,
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, buffer);
  console.log(`Authoritative template created at: ${outputPath}`);
}
