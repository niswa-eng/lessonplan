export interface CambridgeObjective {
  code: string;
  description: string;
  grade: 'Grade 7' | 'Grade 8' | 'Grade 9';
  book: string;
  unitNumber: string;
  unitTitle: string;
  subtopicNumber: string;
  subtopicTitle: string;
}

export interface SubtopicItem {
  number: string;
  title: string;
  fullTitle: string; // e.g. "1.1 Adding and subtracting integers"
  suggestedKeywords?: string;
  objectives: CambridgeObjective[];
}

export interface UnitItem {
  number: string;
  title: string;
  fullTitle: string; // e.g. "Unit 1: Integers"
  totalLessons: string;
  subtopics: SubtopicItem[];
}

export interface BookItem {
  id: string;
  title: string;
  grade: 'Grade 7' | 'Grade 8' | 'Grade 9';
  units: UnitItem[];
}

export interface GradeItem {
  id: 'Grade 7' | 'Grade 8' | 'Grade 9';
  title: string;
  yearGroupNumber: string; // "7", "8", "9"
  books: BookItem[];
}

// Helper to construct objective objects cleanly
function makeObj(
  code: string,
  desc: string,
  grade: 'Grade 7' | 'Grade 8' | 'Grade 9',
  book: string,
  unitNum: string,
  unitName: string,
  subNum: string,
  subName: string
): CambridgeObjective {
  return {
    code,
    description: desc,
    grade,
    book,
    unitNumber: unitNum,
    unitTitle: unitName,
    subtopicNumber: subNum,
    subtopicTitle: subName,
  };
}

// ----------------------------------------------------
// GRADE 7 CATALOGUE
// ----------------------------------------------------
const G7_BOOK = "Cambridge Mathematics Year 7 Learner's Book";

const G7_UNITS: UnitItem[] = [
  {
    number: '1',
    title: 'Integers',
    fullTitle: 'Unit 1: Integers',
    totalLessons: '6',
    subtopics: [
      {
        number: '1.1',
        title: 'Adding and subtracting integers',
        fullTitle: '1.1 Adding and subtracting integers',
        suggestedKeywords: 'Integer (bilangan bulat), Directed number (bilangan berarah), Zero pair (pasangan nol), Absolute value (nilai mutlak)',
        objectives: [
          makeObj('7Ni.01', 'Estimate, add and subtract integers, recognising and using inverse operations.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.1', 'Adding and subtracting integers'),
          makeObj('7Ni.02', 'Understand that brackets can be used to alter the order of operations.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.1', 'Adding and subtracting integers'),
        ],
      },
      {
        number: '1.2',
        title: 'Multiplying and dividing integers',
        fullTitle: '1.2 Multiplying and dividing integers',
        suggestedKeywords: 'Product (hasil kali), Quotient (hasil bagi), Sign rule (aturan tanda), Negative factor (faktor negatif)',
        objectives: [
          makeObj('7Ni.03', 'Estimate, multiply and divide integers including where one integer is negative.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.2', 'Multiplying and dividing integers'),
        ],
      },
      {
        number: '1.3',
        title: 'Lowest common multiples',
        fullTitle: '1.3 Lowest common multiples',
        suggestedKeywords: 'Multiple (kelipatan), Common multiple (kelipatan persekutuan), LCM / KPK',
        objectives: [
          makeObj('7Ni.04', 'Understand lowest common multiple and highest common factor and find them for two numbers.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.3', 'Lowest common multiples'),
        ],
      },
      {
        number: '1.4',
        title: 'Highest common factors',
        fullTitle: '1.4 Highest common factors',
        suggestedKeywords: 'Factor (faktor), Common factor (faktor persekutuan), HCF / FPB, Prime factor (faktor prima)',
        objectives: [
          makeObj('7Ni.04', 'Understand lowest common multiple and highest common factor and find them for two numbers.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.4', 'Highest common factors'),
        ],
      },
      {
        number: '1.5',
        title: 'Tests for divisibility',
        fullTitle: '1.5 Tests for divisibility',
        suggestedKeywords: 'Divisibility (keterbagian), Divisible (habis dibagi), Digit sum (jumlah angka)',
        objectives: [
          makeObj('7Ni.05', 'Use the tests of divisibility for 2, 3, 4, 5, 6, 8, 9, 10 and 100.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.5', 'Tests for divisibility'),
        ],
      },
      {
        number: '1.6',
        title: 'Square roots and cube roots',
        fullTitle: '1.6 Square roots and cube roots',
        suggestedKeywords: 'Square number (bilangan kuadrat), Cube number (bilangan kubik), Square root (akar kuadrat), Cube root (akar kubik)',
        objectives: [
          makeObj('7Ni.06', 'Understand the relationship between squares and corresponding square roots, and cubes and cube roots.', 'Grade 7', G7_BOOK, '1', 'Integers', '1.6', 'Square roots and cube roots'),
        ],
      },
    ],
  },
  {
    number: '2',
    title: 'Expressions, formulae and equations',
    fullTitle: 'Unit 2: Expressions, formulae and equations',
    totalLessons: '6',
    subtopics: [
      {
        number: '2.1',
        title: 'Constructing expressions',
        fullTitle: '2.1 Constructing expressions',
        suggestedKeywords: 'Variable (variabel), Term (suku), Expression (bentuk aljabar)',
        objectives: [
          makeObj('7Ae.01', 'Understand that letters have different roles in algebra, including representing unknown numbers or variables.', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.1', 'Constructing expressions'),
        ],
      },
      {
        number: '2.2',
        title: 'Using expressions and formulae',
        fullTitle: '2.2 Using expressions and formulae',
        suggestedKeywords: 'Formula (rumus), Substitution (substitusi), Evaluate (menghitung nilai)',
        objectives: [
          makeObj('7Ae.02', 'Substitute positive integers into simple linear expressions and formulae.', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.2', 'Using expressions and formulae'),
        ],
      },
      {
        number: '2.3',
        title: 'Collecting like terms',
        fullTitle: '2.3 Collecting like terms',
        suggestedKeywords: 'Like terms (suku sejenis), Coefficient (koefisien), Simplify (menyederhanakan)',
        objectives: [
          makeObj('7Ae.03', 'Understand that algebraic expressions can be equivalent and simplify expressions by collecting like terms.', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.3', 'Collecting like terms'),
        ],
      },
      {
        number: '2.4',
        title: 'Expanding brackets',
        fullTitle: '2.4 Expanding brackets',
        suggestedKeywords: 'Expand (menjabarkan), Distributive law (hukum distributif), Bracket (tanda kurung)',
        objectives: [
          makeObj('7Ae.04', 'Expand single brackets with positive integer constants.', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.4', 'Expanding brackets'),
        ],
      },
      {
        number: '2.5',
        title: 'Constructing and solving equations',
        fullTitle: '2.5 Constructing and solving equations',
        suggestedKeywords: 'Equation (persamaan), Inverse operation (operasi invers), Solution (penyelesaian)',
        objectives: [
          makeObj('7Ae.05', 'Construct and solve linear equations with integer coefficients (unknown on one side).', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.5', 'Constructing and solving equations'),
        ],
      },
      {
        number: '2.6',
        title: 'Inequalities',
        fullTitle: '2.6 Inequalities',
        suggestedKeywords: 'Inequality (pertidaksamaan), Greater than (>), Less than (<)',
        objectives: [
          makeObj('7Ae.06', 'Understand and use the symbols <, <=, >, >= and represent simple inequalities on a number line.', 'Grade 7', G7_BOOK, '2', 'Expressions, formulae and equations', '2.6', 'Inequalities'),
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Place value and rounding',
    fullTitle: 'Unit 3: Place value and rounding',
    totalLessons: '4',
    subtopics: [
      {
        number: '3.1',
        title: 'Multiplying and dividing by powers of 10',
        fullTitle: '3.1 Multiplying and dividing by powers of 10',
        suggestedKeywords: 'Power of 10 (pangkat 10), Place value shift (pergeseran nilai tempat)',
        objectives: [
          makeObj('7Np.01', 'Multiply and divide whole numbers and decimals by positive powers of 10.', 'Grade 7', G7_BOOK, '3', 'Place value and rounding', '3.1', 'Multiplying and dividing by powers of 10'),
        ],
      },
      {
        number: '3.2',
        title: 'Rounding',
        fullTitle: '3.2 Rounding',
        suggestedKeywords: 'Rounding (pembulatan), Decimal places (tempat desimal), Significant figures (angka penting)',
        objectives: [
          makeObj('7Np.02', 'Round numbers to a given number of decimal places or significant figures.', 'Grade 7', G7_BOOK, '3', 'Place value and rounding', '3.2', 'Rounding'),
        ],
      },
    ],
  },
  {
    number: '4',
    title: 'Decimals',
    fullTitle: 'Unit 4: Decimals',
    totalLessons: '5',
    subtopics: [
      {
        number: '4.1',
        title: 'Ordering decimals',
        fullTitle: '4.1 Ordering decimals',
        suggestedKeywords: 'Ordering (mengurutkan), Tenths (persepuluhan), Hundredths (perseratusan)',
        objectives: [
          makeObj('7Nf.01', 'Order and compare decimals with up to three decimal places.', 'Grade 7', G7_BOOK, '4', 'Decimals', '4.1', 'Ordering decimals'),
        ],
      },
      {
        number: '4.2',
        title: 'Adding and subtracting decimals',
        fullTitle: '4.2 Adding and subtracting decimals',
        suggestedKeywords: 'Decimal point alignment (penjajaran koma desimal), Borrowing (meminjam)',
        objectives: [
          makeObj('7Nf.02', 'Add and subtract decimals with varying numbers of decimal places.', 'Grade 7', G7_BOOK, '4', 'Decimals', '4.2', 'Adding and subtracting decimals'),
        ],
      },
      {
        number: '4.3',
        title: 'Multiplying decimals',
        fullTitle: '4.3 Multiplying decimals',
        suggestedKeywords: 'Decimal multiplication (perkalian desimal), Product (hasil kali)',
        objectives: [
          makeObj('7Nf.03', 'Multiply decimals by whole numbers and decimals.', 'Grade 7', G7_BOOK, '4', 'Decimals', '4.3', 'Multiplying decimals'),
        ],
      },
      {
        number: '4.4',
        title: 'Dividing decimals',
        fullTitle: '4.4 Dividing decimals',
        suggestedKeywords: 'Decimal division (pembagian desimal), Quotient (hasil bagi)',
        objectives: [
          makeObj('7Nf.04', 'Divide decimals by whole numbers.', 'Grade 7', G7_BOOK, '4', 'Decimals', '4.4', 'Dividing decimals'),
        ],
      },
      {
        number: '4.5',
        title: 'Making decimal calculations easier',
        fullTitle: '4.5 Making decimal calculations easier',
        suggestedKeywords: 'Mental strategy (strategi mental), Compensation (kompensasi)',
        objectives: [
          makeObj('7Nf.05', 'Use mental strategies and known facts to simplify decimal arithmetic.', 'Grade 7', G7_BOOK, '4', 'Decimals', '4.5', 'Making decimal calculations easier'),
        ],
      },
    ],
  },
  {
    number: '5',
    title: 'Angles and constructions',
    fullTitle: 'Unit 5: Angles and constructions',
    totalLessons: '5',
    subtopics: [
      {
        number: '5.1',
        title: 'A sum of 360°',
        fullTitle: '5.1 A sum of 360°',
        suggestedKeywords: 'Angles at a point (sudut pada satu titik), Full turn (putaran penuh 360°)',
        objectives: [
          makeObj('7Gg.01', 'Calculate angles at a point, angles on a straight line, and vertically opposite angles.', 'Grade 7', G7_BOOK, '5', 'Angles and constructions', '5.1', 'A sum of 360°'),
        ],
      },
      {
        number: '5.2',
        title: 'Intersecting lines',
        fullTitle: '5.2 Intersecting lines',
        suggestedKeywords: 'Vertically opposite (bertolak belakang), Straight line 180° (garis lurus 180°)',
        objectives: [
          makeObj('7Gg.02', 'Identify and calculate vertically opposite angles formed by intersecting lines.', 'Grade 7', G7_BOOK, '5', 'Angles and constructions', '5.2', 'Intersecting lines'),
        ],
      },
      {
        number: '5.3',
        title: 'Drawing lines and quadrilaterals',
        fullTitle: '5.3 Drawing lines and quadrilaterals',
        suggestedKeywords: 'Protractor (busur derajat), Ruler (penggaris), Angle sum of quadrilateral (jumlah sudut segiempat 360°)',
        objectives: [
          makeObj('7Gg.03', 'Use a protractor and ruler to draw and measure lines, angles, and quadrilaterals.', 'Grade 7', G7_BOOK, '5', 'Angles and constructions', '5.3', 'Drawing lines and quadrilaterals'),
        ],
      },
    ],
  },
  {
    number: '6',
    title: 'Collecting data',
    fullTitle: 'Unit 6: Collecting data',
    totalLessons: '4',
    subtopics: [
      {
        number: '6.1',
        title: 'Conducting an investigation',
        fullTitle: '6.1 Conducting an investigation',
        suggestedKeywords: 'Primary data (data primer), Secondary data (data sekunder), Questionnaire (kuesioner)',
        objectives: [
          makeObj('7Ss.01', 'Plan a statistical enquiry: specify hypotheses, design data collection sheets and questionnaires.', 'Grade 7', G7_BOOK, '6', 'Collecting data', '6.1', 'Conducting an investigation'),
        ],
      },
      {
        number: '6.2',
        title: 'Taking a sample',
        fullTitle: '6.2 Taking a sample',
        suggestedKeywords: 'Population (populasi), Sample (sampel), Representative (representatif)',
        objectives: [
          makeObj('7Ss.02', 'Understand that a sample can be used to estimate information about a population.', 'Grade 7', G7_BOOK, '6', 'Collecting data', '6.2', 'Taking a sample'),
        ],
      },
    ],
  },
  {
    number: '7',
    title: 'Fractions',
    fullTitle: 'Unit 7: Fractions',
    totalLessons: '5',
    subtopics: [
      {
        number: '7.1',
        title: 'Ordering fractions',
        fullTitle: '7.1 Ordering fractions',
        suggestedKeywords: 'Equivalent fractions (pecahan senilai), Common denominator (penyebut bersama)',
        objectives: [
          makeObj('7Nf.06', 'Compare and order proper and improper fractions by finding common denominators.', 'Grade 7', G7_BOOK, '7', 'Fractions', '7.1', 'Ordering fractions'),
        ],
      },
      {
        number: '7.2',
        title: 'Adding mixed numbers',
        fullTitle: '7.2 Adding mixed numbers',
        suggestedKeywords: 'Mixed number (pecahan campuran), Improper fraction (pecahan tidak murni)',
        objectives: [
          makeObj('7Nf.07', 'Add and subtract proper fractions and mixed numbers.', 'Grade 7', G7_BOOK, '7', 'Fractions', '7.2', 'Adding mixed numbers'),
        ],
      },
      {
        number: '7.3',
        title: 'Multiplying fractions',
        fullTitle: '7.3 Multiplying fractions',
        suggestedKeywords: 'Fraction multiplication (perkalian pecahan), Cross-simplifying (penyederhanaan silang)',
        objectives: [
          makeObj('7Nf.08', 'Multiply proper fractions and mixed numbers by integers and other fractions.', 'Grade 7', G7_BOOK, '7', 'Fractions', '7.3', 'Multiplying fractions'),
        ],
      },
      {
        number: '7.4',
        title: 'Dividing fractions',
        fullTitle: '7.4 Dividing fractions',
        suggestedKeywords: 'Reciprocal (kebalikan / resiprokal), Invert and multiply (balik dan kali)',
        objectives: [
          makeObj('7Nf.09', 'Divide proper fractions by integers and proper fractions using reciprocals.', 'Grade 7', G7_BOOK, '7', 'Fractions', '7.4', 'Dividing fractions'),
        ],
      },
      {
        number: '7.5',
        title: 'Making fraction calculations easier',
        fullTitle: '7.5 Making fraction calculations easier',
        suggestedKeywords: 'Cancelling (mencoret faktor), Benchmark fractions (pecahan patokan)',
        objectives: [
          makeObj('7Nf.10', 'Use efficient mental and written strategies for multi-step fraction operations.', 'Grade 7', G7_BOOK, '7', 'Fractions', '7.5', 'Making fraction calculations easier'),
        ],
      },
    ],
  },
  {
    number: '8',
    title: 'Shapes and symmetry',
    fullTitle: 'Unit 8: Shapes and symmetry',
    totalLessons: '5',
    subtopics: [
      {
        number: '8.1',
        title: 'Identifying the symmetry of 2D shapes',
        fullTitle: '8.1 Identifying the symmetry of 2D shapes',
        suggestedKeywords: 'Line symmetry (simetri lipat), Rotational symmetry (simetri putar), Order of rotational symmetry (tingkat simetri putar)',
        objectives: [
          makeObj('7Gg.04', 'Identify line symmetry and rotational symmetry in two-dimensional shapes.', 'Grade 7', G7_BOOK, '8', 'Shapes and symmetry', '8.1', 'Identifying the symmetry of 2D shapes'),
        ],
      },
      {
        number: '8.2',
        title: 'Circles and polygons',
        fullTitle: '8.2 Circles and polygons',
        suggestedKeywords: 'Radius (jari-jari), Diameter (diameter), Circumference (keliling lingkaran), Regular polygon (poligon beraturan)',
        objectives: [
          makeObj('7Gg.05', 'Identify parts of a circle (radius, diameter, circumference, chord) and classify polygons.', 'Grade 7', G7_BOOK, '8', 'Shapes and symmetry', '8.2', 'Circles and polygons'),
        ],
      },
      {
        number: '8.3',
        title: 'Recognising congruent shapes',
        fullTitle: '8.3 Recognising congruent shapes',
        suggestedKeywords: 'Congruent (kongruen / sama dan sebangun), Corresponding sides (sisi bersesuaian)',
        objectives: [
          makeObj('7Gg.06', 'Recognise and use congruent 2D shapes.', 'Grade 7', G7_BOOK, '8', 'Shapes and symmetry', '8.3', 'Recognising congruent shapes'),
        ],
      },
      {
        number: '8.4',
        title: '3D shapes',
        fullTitle: '8.4 3D shapes',
        suggestedKeywords: 'Faces (sisi/bidang), Edges (rusuk), Vertices (titik sudut), Net (jaring-jaring)',
        objectives: [
          makeObj('7Gg.07', 'Identify and describe 3D shapes (prisms, pyramids, cylinders) and their nets.', 'Grade 7', G7_BOOK, '8', 'Shapes and symmetry', '8.4', '3D shapes'),
        ],
      },
    ],
  },
  {
    number: '9',
    title: 'Sequences and functions',
    fullTitle: 'Unit 9: Sequences and functions',
    totalLessons: '5',
    subtopics: [
      {
        number: '9.1',
        title: 'Generating sequences (1)',
        fullTitle: '9.1 Generating sequences (1)',
        suggestedKeywords: 'Sequence (barisan), Term-to-term rule (aturan suku-ke-suku)',
        objectives: [
          makeObj('7Ae.07', 'Generate linear sequences from practical patterns and term-to-term rules.', 'Grade 7', G7_BOOK, '9', 'Sequences and functions', '9.1', 'Generating sequences (1)'),
        ],
      },
      {
        number: '9.2',
        title: 'Generating sequences (2)',
        fullTitle: '9.2 Generating sequences (2)',
        suggestedKeywords: 'Arithmetic sequence (barisan aritmetika), Common difference (beda)',
        objectives: [
          makeObj('7Ae.08', 'Find missing terms and extend non-linear and geometric sequences.', 'Grade 7', G7_BOOK, '9', 'Sequences and functions', '9.2', 'Generating sequences (2)'),
        ],
      },
      {
        number: '9.3',
        title: 'Using the nth term',
        fullTitle: '9.3 Using the nth term',
        suggestedKeywords: 'nth term (suku ke-n), Position-to-term rule (aturan posisi-ke-suku)',
        objectives: [
          makeObj('7Ae.09', 'Find and use the position-to-term rule (nth term) for linear sequences.', 'Grade 7', G7_BOOK, '9', 'Sequences and functions', '9.3', 'Using the nth term'),
        ],
      },
      {
        number: '9.4',
        title: 'Representing simple functions',
        fullTitle: '9.4 Representing simple functions',
        suggestedKeywords: 'Function machine (mesin fungsi), Input / Output, Mapping (pemetaan)',
        objectives: [
          makeObj('7Ae.10', 'Represent simple linear functions with words, function machines, and tables of values.', 'Grade 7', G7_BOOK, '9', 'Sequences and functions', '9.4', 'Representing simple functions'),
        ],
      },
    ],
  },
  {
    number: '10',
    title: 'Percentages',
    fullTitle: 'Unit 10: Percentages',
    totalLessons: '4',
    subtopics: [
      {
        number: '10.1',
        title: 'Fractions, decimals and percentages',
        fullTitle: '10.1 Fractions, decimals and percentages',
        suggestedKeywords: 'Percentage (persentase), Equivalence (kesetaraan), Benchmark conversions',
        objectives: [
          makeObj('7Nf.11', 'Understand percentage as parts per 100 and convert between fractions, decimals, and percentages.', 'Grade 7', G7_BOOK, '10', 'Percentages', '10.1', 'Fractions, decimals and percentages'),
        ],
      },
      {
        number: '10.2',
        title: 'Percentages large and small',
        fullTitle: '10.2 Percentages large and small',
        suggestedKeywords: 'Percentage of quantity (persen dari kuantitas), Discount (diskon), Increase (kenaikan)',
        objectives: [
          makeObj('7Nf.12', 'Calculate percentages of quantities (including over 100%) and apply to real-world financial contexts.', 'Grade 7', G7_BOOK, '10', 'Percentages', '10.2', 'Percentages large and small'),
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Graphs',
    fullTitle: 'Unit 11: Graphs',
    totalLessons: '5',
    subtopics: [
      {
        number: '11.1',
        title: 'Functions',
        fullTitle: '11.1 Functions',
        suggestedKeywords: 'Coordinate pair (pasangan koordinat), x-axis, y-axis, Quadrant (kuadran)',
        objectives: [
          makeObj('7Ae.11', 'Generate coordinate pairs from linear equations and plot them across all four quadrants.', 'Grade 7', G7_BOOK, '11', 'Graphs', '11.1', 'Functions'),
        ],
      },
      {
        number: '11.2',
        title: 'Graphs of functions',
        fullTitle: '11.2 Graphs of functions',
        suggestedKeywords: 'Linear graph (grafik linier), Straight line (garis lurus)',
        objectives: [
          makeObj('7Ae.12', 'Plot the graphs of linear functions in the form y = mx + c.', 'Grade 7', G7_BOOK, '11', 'Graphs', '11.2', 'Graphs of functions'),
        ],
      },
      {
        number: '11.3',
        title: 'Lines parallel to the axes',
        fullTitle: '11.3 Lines parallel to the axes',
        suggestedKeywords: 'Horizontal line y = c, Vertical line x = k, Parallel (sejajar)',
        objectives: [
          makeObj('7Ae.13', 'Recognise and draw graphs of lines parallel to the x-axis and y-axis (x = a, y = b).', 'Grade 7', G7_BOOK, '11', 'Graphs', '11.3', 'Lines parallel to the axes'),
        ],
      },
      {
        number: '11.4',
        title: 'Interpreting graphs',
        fullTitle: '11.4 Interpreting graphs',
        suggestedKeywords: 'Conversion graph (grafik konversi), Travel graph (grafik perjalanan), Rate of change',
        objectives: [
          makeObj('7Ae.14', 'Interpret real-life conversion and travel graphs representing distance-time relationships.', 'Grade 7', G7_BOOK, '11', 'Graphs', '11.4', 'Interpreting graphs'),
        ],
      },
    ],
  },
  {
    number: '12',
    title: 'Ratio and proportion',
    fullTitle: 'Unit 12: Ratio and proportion',
    totalLessons: '5',
    subtopics: [
      {
        number: '12.1',
        title: 'Simplifying ratios',
        fullTitle: '12.1 Simplifying ratios',
        suggestedKeywords: 'Ratio (rasio / perbandingan), Simplest form (bentuk paling sederhana), Parts (bagian)',
        objectives: [
          makeObj('7Np.03', 'Understand and use ratio notation, simplifying ratios by dividing by common factors.', 'Grade 7', G7_BOOK, '12', 'Ratio and proportion', '12.1', 'Simplifying ratios'),
        ],
      },
      {
        number: '12.2',
        title: 'Sharing in a ratio',
        fullTitle: '12.2 Sharing in a ratio',
        suggestedKeywords: 'Sharing (membagi sesuai perbandingan), Total parts (jumlah bagian)',
        objectives: [
          makeObj('7Np.04', 'Divide a quantity into two or more parts in a given ratio.', 'Grade 7', G7_BOOK, '12', 'Ratio and proportion', '12.2', 'Sharing in a ratio'),
        ],
      },
      {
        number: '12.3',
        title: 'Using direct proportion',
        fullTitle: '12.3 Using direct proportion',
        suggestedKeywords: 'Direct proportion (perbandingan senilai), Unitary method (metode satuan)',
        objectives: [
          makeObj('7Np.05', 'Recognise direct proportion and solve problems using the unitary method.', 'Grade 7', G7_BOOK, '12', 'Ratio and proportion', '12.3', 'Using direct proportion'),
        ],
      },
    ],
  },
  {
    number: '13',
    title: 'Probability',
    fullTitle: 'Unit 13: Probability',
    totalLessons: '4',
    subtopics: [
      {
        number: '13.1',
        title: 'The probability scale',
        fullTitle: '13.1 The probability scale',
        suggestedKeywords: 'Impossible (mustahil = 0), Certain (pasti = 1), Probability scale (skala peluang)',
        objectives: [
          makeObj('7Sp.01', 'Use the language of probability and position probabilities on a 0 to 1 scale.', 'Grade 7', G7_BOOK, '13', 'Probability', '13.1', 'The probability scale'),
        ],
      },
      {
        number: '13.2',
        title: 'Mutually exclusive outcomes',
        fullTitle: '13.2 Mutually exclusive outcomes',
        suggestedKeywords: 'Mutually exclusive (saling lepas), Sum of probabilities = 1',
        objectives: [
          makeObj('7Sp.02', 'Know that the sum of probabilities of all mutually exclusive outcomes is 1.', 'Grade 7', G7_BOOK, '13', 'Probability', '13.2', 'Mutually exclusive outcomes'),
        ],
      },
      {
        number: '13.3',
        title: 'Experimental probabilities',
        fullTitle: '13.3 Experimental probabilities',
        suggestedKeywords: 'Frequency (frekuensi), Relative frequency (frekuensi relatif), Trials (percobaan)',
        objectives: [
          makeObj('7Sp.03', 'Calculate relative frequency as an estimate of probability from trials.', 'Grade 7', G7_BOOK, '13', 'Probability', '13.3', 'Experimental probabilities'),
        ],
      },
    ],
  },
  {
    number: '14',
    title: 'Position and transformation',
    fullTitle: 'Unit 14: Position and transformation',
    totalLessons: '6',
    subtopics: [
      {
        number: '14.1',
        title: 'Maps and plans',
        fullTitle: '14.1 Maps and plans',
        suggestedKeywords: 'Scale (skala), Grid references (koordinat peta)',
        objectives: [
          makeObj('7Gg.08', 'Read and interpret scales on maps and architectural floor plans.', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.1', 'Maps and plans'),
        ],
      },
      {
        number: '14.2',
        title: 'The distance between two points',
        fullTitle: '14.2 The distance between two points',
        suggestedKeywords: 'Coordinate grid (bidang koordinat), Distance (jarak)',
        objectives: [
          makeObj('7Gg.09', 'Calculate horizontal and vertical distances between coordinate points.', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.2', 'The distance between two points'),
        ],
      },
      {
        number: '14.3',
        title: 'Translating 2D shapes',
        fullTitle: '14.3 Translating 2D shapes',
        suggestedKeywords: 'Translation (translasi / pergeseran), Vector shift',
        objectives: [
          makeObj('7Gg.10', 'Translate 2D shapes on a coordinate grid by given units horizontally and vertically.', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.3', 'Translating 2D shapes'),
        ],
      },
      {
        number: '14.4',
        title: 'Reflecting shapes',
        fullTitle: '14.4 Reflecting shapes',
        suggestedKeywords: 'Reflection (refleksi / pencerminan), Mirror line (garis cermin)',
        objectives: [
          makeObj('7Gg.11', 'Reflect 2D shapes in horizontal and vertical mirror lines (x = a, y = b).', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.4', 'Reflecting shapes'),
        ],
      },
      {
        number: '14.5',
        title: 'Rotating shapes',
        fullTitle: '14.5 Rotating shapes',
        suggestedKeywords: 'Rotation (rotasi / perputaran), Centre of rotation (pusat rotasi), Clockwise / Anticlockwise',
        objectives: [
          makeObj('7Gg.12', 'Rotate 2D shapes through 90° or 180° around a given centre of rotation.', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.5', 'Rotating shapes'),
        ],
      },
      {
        number: '14.6',
        title: 'Enlarging shapes',
        fullTitle: '14.6 Enlarging shapes',
        suggestedKeywords: 'Enlargement (dilatasi / perbesaran), Scale factor (faktor skala)',
        objectives: [
          makeObj('7Gg.13', 'Enlarge simple 2D shapes by positive integer scale factors.', 'Grade 7', G7_BOOK, '14', 'Position and transformation', '14.6', 'Enlarging shapes'),
        ],
      },
    ],
  },
  {
    number: '15',
    title: 'Shapes, area and volume',
    fullTitle: 'Unit 15: Shapes, area and volume',
    totalLessons: '6',
    subtopics: [
      {
        number: '15.1',
        title: 'Converting between units for area',
        fullTitle: '15.1 Converting between units for area',
        suggestedKeywords: 'mm², cm², m², Area conversion factor',
        objectives: [
          makeObj('7Gg.14', 'Convert between metric units of area (mm², cm², m²).', 'Grade 7', G7_BOOK, '15', 'Shapes, area and volume', '15.1', 'Converting between units for area'),
        ],
      },
      {
        number: '15.2',
        title: 'Using hectares',
        fullTitle: '15.2 Using hectares',
        suggestedKeywords: 'Hectare (hektar = 10,000 m²), Land area measurement',
        objectives: [
          makeObj('7Gg.15', 'Understand and use hectares (ha) to solve real-world land area problems.', 'Grade 7', G7_BOOK, '15', 'Shapes, area and volume', '15.2', 'Using hectares'),
        ],
      },
      {
        number: '15.3',
        title: 'The area of a triangle',
        fullTitle: '15.3 The area of a triangle',
        suggestedKeywords: 'Base (alas), Perpendicular height (tinggi tegak lurus), Area = 1/2 × b × h',
        objectives: [
          makeObj('7Gg.16', 'Derive and use the formula for the area of a triangle (A = 1/2 × base × height).', 'Grade 7', G7_BOOK, '15', 'Shapes, area and volume', '15.3', 'The area of a triangle'),
        ],
      },
      {
        number: '15.4',
        title: 'Calculating the volume of cubes and cuboids',
        fullTitle: '15.4 Calculating the volume of cubes and cuboids',
        suggestedKeywords: 'Volume (volume / isi), Cuboid (balok), Cube (kubus), V = l × w × h',
        objectives: [
          makeObj('7Gg.17', 'Calculate the volume of cubes and cuboids using formula V = length × width × height.', 'Grade 7', G7_BOOK, '15', 'Shapes, area and volume', '15.4', 'Calculating the volume of cubes and cuboids'),
        ],
      },
      {
        number: '15.5',
        title: 'Calculating the surface area of cubes and cuboids',
        fullTitle: '15.5 Calculating the surface area of cubes and cuboids',
        suggestedKeywords: 'Surface area (luas permukaan), Net representation',
        objectives: [
          makeObj('7Gg.18', 'Calculate the total surface area of cubes and cuboids.', 'Grade 7', G7_BOOK, '15', 'Shapes, area and volume', '15.5', 'Calculating the surface area of cubes and cuboids'),
        ],
      },
    ],
  },
  {
    number: '16',
    title: 'Interpreting results',
    fullTitle: 'Unit 16: Interpreting results',
    totalLessons: '6',
    subtopics: [
      {
        number: '16.1',
        title: 'Two-way tables',
        fullTitle: '16.1 Two-way tables',
        suggestedKeywords: 'Two-way table (tabel kontingensi), Row / Column totals',
        objectives: [
          makeObj('7Ss.03', 'Record, complete and interpret data presented in two-way tables.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.1', 'Two-way tables'),
        ],
      },
      {
        number: '16.2',
        title: 'Dual and compound bar charts',
        fullTitle: '16.2 Dual and compound bar charts',
        suggestedKeywords: 'Dual bar chart (diagram batang ganda), Compound bar chart (diagram batang bertumpuk)',
        objectives: [
          makeObj('7Ss.04', 'Draw and interpret dual and compound bar charts to compare categorical data.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.2', 'Dual and compound bar charts'),
        ],
      },
      {
        number: '16.3',
        title: 'Pie charts and waffle diagrams',
        fullTitle: '16.3 Pie charts and waffle diagrams',
        suggestedKeywords: 'Pie chart (diagram lingkaran), Waffle diagram, Sector angles',
        objectives: [
          makeObj('7Ss.05', 'Construct and interpret pie charts and waffle diagrams.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.3', 'Pie charts and waffle diagrams'),
        ],
      },
      {
        number: '16.4',
        title: 'Infographics',
        fullTitle: '16.4 Infographics',
        suggestedKeywords: 'Infographic (infografis), Visual summary, Critical data evaluation',
        objectives: [
          makeObj('7Ss.06', 'Critique data presentations and extract information from published infographics.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.4', 'Infographics'),
        ],
      },
      {
        number: '16.5',
        title: 'Representing data',
        fullTitle: '16.5 Representing data',
        suggestedKeywords: 'Frequency polygon, Grouped data representation',
        objectives: [
          makeObj('7Ss.07', 'Select and justify appropriate statistical diagrams to represent continuous or discrete data.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.5', 'Representing data'),
        ],
      },
      {
        number: '16.6',
        title: 'Using statistics',
        fullTitle: '16.6 Using statistics',
        suggestedKeywords: 'Mean (rata-rata), Median (nilai tengah), Mode (modus), Range (jangkauan)',
        objectives: [
          makeObj('7Ss.08', 'Calculate and compare measures of central tendency (mean, median, mode) and range.', 'Grade 7', G7_BOOK, '16', 'Interpreting results', '16.6', 'Using statistics'),
        ],
      },
    ],
  },
];

// ----------------------------------------------------
// GRADE 8 CATALOGUE
// ----------------------------------------------------
const G8_BOOK = "Cambridge Mathematics Year 8 Learner's Book";

const G8_UNITS: UnitItem[] = [
  {
    number: '1',
    title: 'Integers',
    fullTitle: 'Unit 1: Integers',
    totalLessons: '6',
    subtopics: [
      {
        number: '1.1',
        title: 'Factors, multiples and primes',
        fullTitle: '1.1 Factors, multiples and primes',
        suggestedKeywords: 'Prime factorisation (faktorisasi prima), Prime factor tree, Index notation',
        objectives: [
          makeObj('8Ni.01', 'Find prime factors of positive integers and express them using index notation.', 'Grade 8', G8_BOOK, '1', 'Integers', '1.1', 'Factors, multiples and primes'),
          makeObj('8Ni.02', 'Find the HCF and LCM of three numbers using prime factor decomposition.', 'Grade 8', G8_BOOK, '1', 'Integers', '1.1', 'Factors, multiples and primes'),
        ],
      },
      {
        number: '1.2',
        title: 'Multiplying and dividing integers',
        fullTitle: '1.2 Multiplying and dividing integers',
        suggestedKeywords: 'Order of operations, Negative operands, Multiplicative inverse',
        objectives: [
          makeObj('8Ni.03', 'Perform multi-step arithmetic operations with positive and negative integers.', 'Grade 8', G8_BOOK, '1', 'Integers', '1.2', 'Multiplying and dividing integers'),
        ],
      },
      {
        number: '1.3',
        title: 'Square roots and cube roots',
        fullTitle: '1.3 Square roots and cube roots',
        suggestedKeywords: 'Estimate square root, Consecutive integers, Irrational estimates',
        objectives: [
          makeObj('8Ni.04', 'Estimate square roots and cube roots between two consecutive positive integers.', 'Grade 8', G8_BOOK, '1', 'Integers', '1.3', 'Square roots and cube roots'),
        ],
      },
      {
        number: '1.4',
        title: 'Indices',
        fullTitle: '1.4 Indices',
        suggestedKeywords: 'Laws of indices (hukum eksponen), aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, Zero power a⁰ = 1',
        objectives: [
          makeObj('8Ni.05', 'Understand and apply the index laws for multiplication, division, and zero power for positive integer indices.', 'Grade 8', G8_BOOK, '1', 'Integers', '1.4', 'Indices'),
        ],
      },
    ],
  },
  {
    number: '2',
    title: 'Expressions, formulae and equations',
    fullTitle: 'Unit 2: Expressions, formulae and equations',
    totalLessons: '6',
    subtopics: [
      {
        number: '2.1',
        title: 'Constructing expressions',
        fullTitle: '2.1 Constructing expressions',
        suggestedKeywords: 'Algebraic modeling, Two-step expression',
        objectives: [
          makeObj('8Ae.01', 'Formulate algebraic expressions with one or more operations from problem descriptions.', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.1', 'Constructing expressions'),
        ],
      },
      {
        number: '2.2',
        title: 'Using expressions and formulae',
        fullTitle: '2.2 Using expressions and formulae',
        suggestedKeywords: 'Negative substitution, Compound formula',
        objectives: [
          makeObj('8Ae.02', 'Substitute integers into linear expressions and formulae containing powers.', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.2', 'Using expressions and formulae'),
        ],
      },
      {
        number: '2.3',
        title: 'Expanding brackets',
        fullTitle: '2.3 Expanding brackets',
        suggestedKeywords: 'Single brackets with negative factor, Distributive rule',
        objectives: [
          makeObj('8Ae.03', 'Expand single brackets with negative signs or variable multipliers (e.g. -3(2x - 5)).', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.3', 'Expanding brackets'),
        ],
      },
      {
        number: '2.4',
        title: 'Factorising',
        fullTitle: '2.4 Factorising',
        suggestedKeywords: 'Factorisation (memfaktorkan), HCF of terms',
        objectives: [
          makeObj('8Ae.04', 'Factorise linear expressions by taking out the highest common factor (HCF).', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.4', 'Factorising'),
        ],
      },
      {
        number: '2.5',
        title: 'Constructing and solving equations',
        fullTitle: '2.5 Constructing and solving equations',
        suggestedKeywords: 'Unknown on both sides (variabel di kedua sisi), Balance method',
        objectives: [
          makeObj('8Ae.05', 'Construct and solve linear equations with unknowns on both sides and brackets.', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.5', 'Constructing and solving equations'),
        ],
      },
      {
        number: '2.6',
        title: 'Inequalities',
        fullTitle: '2.6 Inequalities',
        suggestedKeywords: 'Linear inequality, Number line representation, Integer solution sets',
        objectives: [
          makeObj('8Ae.06', 'Solve simple linear inequalities and represent solutions on number lines.', 'Grade 8', G8_BOOK, '2', 'Expressions, formulae and equations', '2.6', 'Inequalities'),
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Place value and rounding',
    fullTitle: 'Unit 3: Place value and rounding',
    totalLessons: '4',
    subtopics: [
      {
        number: '3.1',
        title: 'Multiplying and dividing by 0.1 and 0.01',
        fullTitle: '3.1 Multiplying and dividing by 0.1 and 0.01',
        suggestedKeywords: 'Inverse relationship, × 0.1 is equivalent to ÷ 10',
        objectives: [
          makeObj('8Np.01', 'Multiply and divide numbers by 0.1 and 0.01 understanding inverse operations.', 'Grade 8', G8_BOOK, '3', 'Place value and rounding', '3.1', 'Multiplying and dividing by 0.1 and 0.01'),
        ],
      },
      {
        number: '3.2',
        title: 'Rounding',
        fullTitle: '3.2 Rounding',
        suggestedKeywords: 'Significant figures, Upper and lower bounds',
        objectives: [
          makeObj('8Np.02', 'Round numbers to a specified number of significant figures.', 'Grade 8', G8_BOOK, '3', 'Place value and rounding', '3.2', 'Rounding'),
        ],
      },
    ],
  },
  {
    number: '4',
    title: 'Decimals',
    fullTitle: 'Unit 4: Decimals',
    totalLessons: '4',
    subtopics: [
      {
        number: '4.1',
        title: 'Ordering decimals',
        fullTitle: '4.1 Ordering decimals',
        suggestedKeywords: 'Ascending / Descending order, Decimals and fractions',
        objectives: [
          makeObj('8Nf.01', 'Compare and order terminating and recurring decimals.', 'Grade 8', G8_BOOK, '4', 'Decimals', '4.1', 'Ordering decimals'),
        ],
      },
      {
        number: '4.2',
        title: 'Multiplying decimals',
        fullTitle: '4.2 Multiplying decimals',
        suggestedKeywords: 'Decimal × Decimal product, Estimating decimal answers',
        objectives: [
          makeObj('8Nf.02', 'Multiply decimals by decimals with up to three decimal places.', 'Grade 8', G8_BOOK, '4', 'Decimals', '4.2', 'Multiplying decimals'),
        ],
      },
      {
        number: '4.3',
        title: 'Dividing by decimals',
        fullTitle: '4.3 Dividing by decimals',
        suggestedKeywords: 'Divisor conversion to integer, Equivalent fractions in division',
        objectives: [
          makeObj('8Nf.03', 'Divide whole numbers and decimals by decimals.', 'Grade 8', G8_BOOK, '4', 'Decimals', '4.3', 'Dividing by decimals'),
        ],
      },
      {
        number: '4.4',
        title: 'Making decimal calculations easier',
        fullTitle: '4.4 Making decimal calculations easier',
        suggestedKeywords: 'Associative property, Partitioning decimal numbers',
        objectives: [
          makeObj('8Nf.04', 'Use associative, commutative, and distributive properties to simplify decimal arithmetic.', 'Grade 8', G8_BOOK, '4', 'Decimals', '4.4', 'Making decimal calculations easier'),
        ],
      },
    ],
  },
  {
    number: '5',
    title: 'Angles and constructions',
    fullTitle: 'Unit 5: Angles and constructions',
    totalLessons: '5',
    subtopics: [
      {
        number: '5.1',
        title: 'Parallel lines',
        fullTitle: '5.1 Parallel lines',
        suggestedKeywords: 'Corresponding angles (sudut sehadap), Alternate angles (sudut berseberangan), Interior angles (sudut dalam sepihak), Transversal',
        objectives: [
          makeObj('8Gg.01', 'Identify and calculate alternate, corresponding, and co-interior angles on parallel lines with a transversal.', 'Grade 8', G8_BOOK, '5', 'Angles and constructions', '5.1', 'Parallel lines'),
        ],
      },
      {
        number: '5.2',
        title: 'The exterior angle of a triangle',
        fullTitle: '5.2 The exterior angle of a triangle',
        suggestedKeywords: 'Exterior angle theorem, Remote interior angles',
        objectives: [
          makeObj('8Gg.02', 'Know and use the theorem that the exterior angle of a triangle equals the sum of two opposite interior angles.', 'Grade 8', G8_BOOK, '5', 'Angles and constructions', '5.2', 'The exterior angle of a triangle'),
        ],
      },
      {
        number: '5.3',
        title: 'Constructions',
        fullTitle: '5.3 Constructions',
        suggestedKeywords: 'Perpendicular bisector (garis sumbu), Angle bisector (garis bagi sudut), Compass',
        objectives: [
          makeObj('8Gg.03', 'Construct perpendicular bisectors of lines and angle bisectors using compass and straight edge.', 'Grade 8', G8_BOOK, '5', 'Angles and constructions', '5.3', 'Constructions'),
        ],
      },
    ],
  },
  {
    number: '6',
    title: 'Collecting data',
    fullTitle: 'Unit 6: Collecting data',
    totalLessons: '4',
    subtopics: [
      {
        number: '6.1',
        title: 'Data collection',
        fullTitle: '6.1 Data collection',
        suggestedKeywords: 'Continuous data (data kontinu), Discrete data (data diskrit), Grouped frequency table',
        objectives: [
          makeObj('8Ss.01', 'Select, design and populate data collection sheets for continuous and discrete data.', 'Grade 8', G8_BOOK, '6', 'Collecting data', '6.1', 'Data collection'),
        ],
      },
      {
        number: '6.2',
        title: 'Sampling',
        fullTitle: '6.2 Sampling',
        suggestedKeywords: 'Random sampling (sampel acak), Bias in sampling, Sample size',
        objectives: [
          makeObj('8Ss.02', 'Understand random sampling methods and identify potential sources of bias.', 'Grade 8', G8_BOOK, '6', 'Collecting data', '6.2', 'Sampling'),
        ],
      },
    ],
  },
  {
    number: '7',
    title: 'Fractions',
    fullTitle: 'Unit 7: Fractions',
    totalLessons: '6',
    subtopics: [
      {
        number: '7.1',
        title: 'Fractions and recurring decimals',
        fullTitle: '7.1 Fractions and recurring decimals',
        suggestedKeywords: 'Terminating decimal, Recurring decimal (desimal berulang), Dot notation',
        objectives: [
          makeObj('8Nf.05', 'Convert proper fractions to terminating or recurring decimals and understand recurring notation.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.1', 'Fractions and recurring decimals'),
        ],
      },
      {
        number: '7.2',
        title: 'Ordering fractions',
        fullTitle: '7.2 Ordering fractions',
        suggestedKeywords: 'Comparing mixed numbers, Common denominator method',
        objectives: [
          makeObj('8Nf.06', 'Compare and order mixed numbers and improper fractions.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.2', 'Ordering fractions'),
        ],
      },
      {
        number: '7.3',
        title: 'Subtracting mixed numbers',
        fullTitle: '7.3 Subtracting mixed numbers',
        suggestedKeywords: 'Regrouping mixed numbers, Subtraction',
        objectives: [
          makeObj('8Nf.07', 'Subtract mixed numbers with unlike denominators using regrouping.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.3', 'Subtracting mixed numbers'),
        ],
      },
      {
        number: '7.4',
        title: 'Multiplying an integer by a mixed number',
        fullTitle: '7.4 Multiplying an integer by a mixed number',
        suggestedKeywords: 'Distributive property for mixed numbers, Improper fraction multiplication',
        objectives: [
          makeObj('8Nf.08', 'Multiply integers by mixed numbers and mixed numbers by mixed numbers.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.4', 'Multiplying an integer by a mixed number'),
        ],
      },
      {
        number: '7.5',
        title: 'Dividing an integer by a fraction',
        fullTitle: '7.5 Dividing an integer by a fraction',
        suggestedKeywords: 'Division by unit and non-unit fractions, Reciprocals',
        objectives: [
          makeObj('8Nf.09', 'Divide integers by fractions and fractions by fractions.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.5', 'Dividing an integer by a fraction'),
        ],
      },
      {
        number: '7.6',
        title: 'Making fraction calculations easier',
        fullTitle: '7.6 Making fraction calculations easier',
        suggestedKeywords: 'Cross-cancellation, Mental math with fractions',
        objectives: [
          makeObj('8Nf.10', 'Apply algebraic and arithmetic properties to calculate fluently with fractions.', 'Grade 8', G8_BOOK, '7', 'Fractions', '7.6', 'Making fraction calculations easier'),
        ],
      },
    ],
  },
  {
    number: '8',
    title: 'Shapes and symmetry',
    fullTitle: 'Unit 8: Shapes and symmetry',
    totalLessons: '5',
    subtopics: [
      {
        number: '8.1',
        title: 'Quadrilaterals and polygons',
        fullTitle: '8.1 Quadrilaterals and polygons',
        suggestedKeywords: 'Parallelogram, Rhombus, Trapezium, Kite, Interior angle sum (n - 2) × 180°',
        objectives: [
          makeObj('8Gg.04', 'Derive and use the sum of interior angles in any convex polygon: (n - 2) × 180°.', 'Grade 8', G8_BOOK, '8', 'Shapes and symmetry', '8.1', 'Quadrilaterals and polygons'),
        ],
      },
      {
        number: '8.2',
        title: 'The circumference of a circle',
        fullTitle: '8.2 The circumference of a circle',
        suggestedKeywords: 'Pi (π), C = 2πr or C = πd, Approximation 22/7 or 3.142',
        objectives: [
          makeObj('8Gg.05', 'Know and use the formula for the circumference of a circle: C = πd = 2πr.', 'Grade 8', G8_BOOK, '8', 'Shapes and symmetry', '8.2', 'The circumference of a circle'),
        ],
      },
      {
        number: '8.3',
        title: '3D shapes',
        fullTitle: '8.3 3D shapes',
        suggestedKeywords: 'Cross-section (penampang lintang), Prism, Isometric drawing',
        objectives: [
          makeObj('8Gg.06', 'Identify uniform cross-sections of prisms and construct isometric drawings of 3D solids.', 'Grade 8', G8_BOOK, '8', 'Shapes and symmetry', '8.3', '3D shapes'),
        ],
      },
    ],
  },
  {
    number: '9',
    title: 'Sequences and functions',
    fullTitle: 'Unit 9: Sequences and functions',
    totalLessons: '5',
    subtopics: [
      {
        number: '9.1',
        title: 'Generating sequences',
        fullTitle: '9.1 Generating sequences',
        suggestedKeywords: 'Linear sequence, Common difference d',
        objectives: [
          makeObj('8Ae.07', 'Generate terms of a linear sequence from practical situations and explicit rules.', 'Grade 8', G8_BOOK, '9', 'Sequences and functions', '9.1', 'Generating sequences'),
        ],
      },
      {
        number: '9.2',
        title: 'Finding rules for sequences',
        fullTitle: '9.2 Finding rules for sequences',
        suggestedKeywords: 'nth term formula dn + c, Position-to-term rule',
        objectives: [
          makeObj('8Ae.08', 'Determine the nth term of a linear sequence and determine if a number belongs to a sequence.', 'Grade 8', G8_BOOK, '9', 'Sequences and functions', '9.2', 'Finding rules for sequences'),
        ],
      },
      {
        number: '9.3',
        title: 'Using the nth term',
        fullTitle: '9.3 Using the nth term',
        suggestedKeywords: 'Algebraic manipulation of nth term',
        objectives: [
          makeObj('8Ae.09', 'Use the nth term to calculate specific terms and solve inverse sequence problems.', 'Grade 8', G8_BOOK, '9', 'Sequences and functions', '9.3', 'Using the nth term'),
        ],
      },
      {
        number: '9.4',
        title: 'Representing simple functions',
        fullTitle: '9.4 Representing simple functions',
        suggestedKeywords: 'Inverse functions (fungsi invers), Composite operations',
        objectives: [
          makeObj('8Ae.10', 'Understand and represent functions algebraically, including finding inverse operations.', 'Grade 8', G8_BOOK, '9', 'Sequences and functions', '9.4', 'Representing simple functions'),
        ],
      },
    ],
  },
  {
    number: '10',
    title: 'Percentages',
    fullTitle: 'Unit 10: Percentages',
    totalLessons: '4',
    subtopics: [
      {
        number: '10.1',
        title: 'Percentage increases and decreases',
        fullTitle: '10.1 Percentage increases and decreases',
        suggestedKeywords: 'Markup, Discount, Simple interest (bunga tunggal), Percentage change',
        objectives: [
          makeObj('8Nf.11', 'Calculate percentage increases and decreases, and find percentage change in financial contexts.', 'Grade 8', G8_BOOK, '10', 'Percentages', '10.1', 'Percentage increases and decreases'),
        ],
      },
      {
        number: '10.2',
        title: 'Using a multiplier',
        fullTitle: '10.2 Using a multiplier',
        suggestedKeywords: 'Multiplier (faktor pengali), Decimal multiplier (e.g. 1.15 for +15%, 0.85 for -15%)',
        objectives: [
          makeObj('8Nf.12', 'Use decimal multipliers to calculate percentage increase, decrease, and original values.', 'Grade 8', G8_BOOK, '10', 'Percentages', '10.2', 'Using a multiplier'),
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Graphs',
    fullTitle: 'Unit 11: Graphs',
    totalLessons: '5',
    subtopics: [
      {
        number: '11.1',
        title: 'Functions',
        fullTitle: '11.1 Functions',
        suggestedKeywords: 'Domain, Range, Linear relationship',
        objectives: [
          makeObj('8Ae.11', 'Plot graphs of linear functions from algebraic equations using tables of values.', 'Grade 8', G8_BOOK, '11', 'Graphs', '11.1', 'Functions'),
        ],
      },
      {
        number: '11.2',
        title: 'Plotting graphs',
        fullTitle: '11.2 Plotting graphs',
        suggestedKeywords: 'Linear graph, Intercepts with axes',
        objectives: [
          makeObj('8Ae.12', 'Plot straight-line graphs of equations in standard form (ax + by = c).', 'Grade 8', G8_BOOK, '11', 'Graphs', '11.2', 'Plotting graphs'),
        ],
      },
      {
        number: '11.3',
        title: 'Gradient and intercept',
        fullTitle: '11.3 Gradient and intercept',
        suggestedKeywords: 'Gradient m = rise/run (gradien), y-intercept c, Parallel lines have equal gradient',
        objectives: [
          makeObj('8Ae.13', 'Understand and calculate the gradient (m) and y-intercept (c) from y = mx + c.', 'Grade 8', G8_BOOK, '11', 'Graphs', '11.3', 'Gradient and intercept'),
        ],
      },
      {
        number: '11.4',
        title: 'Interpreting graphs',
        fullTitle: '11.4 Interpreting graphs',
        suggestedKeywords: 'Distance-time graph, Velocity, Real-world rate interpretation',
        objectives: [
          makeObj('8Ae.14', 'Interpret distance-time graphs and real-life rate graphs.', 'Grade 8', G8_BOOK, '11', 'Graphs', '11.4', 'Interpreting graphs'),
        ],
      },
    ],
  },
  {
    number: '12',
    title: 'Ratio and proportion',
    fullTitle: 'Unit 12: Ratio and proportion',
    totalLessons: '5',
    subtopics: [
      {
        number: '12.1',
        title: 'Simplifying ratios',
        fullTitle: '12.1 Simplifying ratios',
        suggestedKeywords: 'Three-part ratio a:b:c, Ratio in form 1:n or n:1',
        objectives: [
          makeObj('8Np.03', 'Simplify ratios involving three parts and express ratios in the form 1:n or n:1.', 'Grade 8', G8_BOOK, '12', 'Ratio and proportion', '12.1', 'Simplifying ratios'),
        ],
      },
      {
        number: '12.2',
        title: 'Sharing in a ratio',
        fullTitle: '12.2 Sharing in a ratio',
        suggestedKeywords: 'Ratio word problems, Multi-part sharing',
        objectives: [
          makeObj('8Np.04', 'Solve complex multi-step problems involving sharing quantities in three-part ratios.', 'Grade 8', G8_BOOK, '12', 'Ratio and proportion', '12.2', 'Sharing in a ratio'),
        ],
      },
      {
        number: '12.3',
        title: 'Ratio and direct proportion',
        fullTitle: '12.3 Ratio and direct proportion',
        suggestedKeywords: 'Constant of proportionality, Direct proportion graphs passing through (0,0)',
        objectives: [
          makeObj('8Np.05', 'Understand the relationship between ratio, fractions, and direct proportion.', 'Grade 8', G8_BOOK, '12', 'Ratio and proportion', '12.3', 'Ratio and direct proportion'),
        ],
      },
    ],
  },
  {
    number: '13',
    title: 'Probability',
    fullTitle: 'Unit 13: Probability',
    totalLessons: '4',
    subtopics: [
      {
        number: '13.1',
        title: 'Calculating probabilities',
        fullTitle: '13.1 Calculating probabilities',
        suggestedKeywords: 'Theoretical probability, Sample space diagram (diagram ruang sampel)',
        objectives: [
          makeObj('8Sp.01', 'Calculate theoretical probabilities for combined events using sample space diagrams.', 'Grade 8', G8_BOOK, '13', 'Probability', '13.1', 'Calculating probabilities'),
        ],
      },
      {
        number: '13.2',
        title: 'Experimental and theoretical probabilities',
        fullTitle: '13.2 Experimental and theoretical probabilities',
        suggestedKeywords: 'Law of large numbers, Expected frequency',
        objectives: [
          makeObj('8Sp.02', 'Compare experimental and theoretical probabilities, understanding that larger trials yield better estimates.', 'Grade 8', G8_BOOK, '13', 'Probability', '13.2', 'Experimental and theoretical probabilities'),
        ],
      },
    ],
  },
  {
    number: '14',
    title: 'Position and transformation',
    fullTitle: 'Unit 14: Position and transformation',
    totalLessons: '6',
    subtopics: [
      {
        number: '14.1',
        title: 'Bearings',
        fullTitle: '14.1 Bearings',
        suggestedKeywords: 'Three-figure bearing (sudut jurusan 3 angka), Measured clockwise from North',
        objectives: [
          makeObj('8Gg.07', 'Use and interpret three-figure bearings measured clockwise from North.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.1', 'Bearings'),
        ],
      },
      {
        number: '14.2',
        title: 'The midpoint of a line segment',
        fullTitle: '14.2 The midpoint of a line segment',
        suggestedKeywords: 'Midpoint formula ((x1+x2)/2, (y1+y2)/2)',
        objectives: [
          makeObj('8Gg.08', 'Find the coordinates of the midpoint of a line segment on a 2D Cartesian plane.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.2', 'The midpoint of a line segment'),
        ],
      },
      {
        number: '14.3',
        title: 'Translating 2D shapes',
        fullTitle: '14.3 Translating 2D shapes',
        suggestedKeywords: 'Column vector [x, y], Object and image',
        objectives: [
          makeObj('8Gg.09', 'Translate 2D shapes using column vectors.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.3', 'Translating 2D shapes'),
        ],
      },
      {
        number: '14.4',
        title: 'Reflecting shapes',
        fullTitle: '14.4 Reflecting shapes',
        suggestedKeywords: 'Mirror lines y = x and y = -x',
        objectives: [
          makeObj('8Gg.10', 'Reflect shapes in diagonal mirror lines y = x and y = -x.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.4', 'Reflecting shapes'),
        ],
      },
      {
        number: '14.5',
        title: 'Rotating shapes',
        fullTitle: '14.5 Rotating shapes',
        suggestedKeywords: 'Rotation about any coordinate point (a, b)',
        objectives: [
          makeObj('8Gg.11', 'Rotate shapes about any point on a coordinate grid by 90° or 180°.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.5', 'Rotating shapes'),
        ],
      },
      {
        number: '14.6',
        title: 'Enlarging shapes',
        fullTitle: '14.6 Enlarging shapes',
        suggestedKeywords: 'Centre of enlargement, Fractional scale factors',
        objectives: [
          makeObj('8Gg.12', 'Enlarge shapes from a specified centre of enlargement by positive scale factors.', 'Grade 8', G8_BOOK, '14', 'Position and transformation', '14.6', 'Enlarging shapes'),
        ],
      },
    ],
  },
  {
    number: '15',
    title: 'Distance, area and volume',
    fullTitle: 'Unit 15: Distance, area and volume',
    totalLessons: '6',
    subtopics: [
      {
        number: '15.1',
        title: 'Converting between miles and kilometres',
        fullTitle: '15.1 Converting between miles and kilometres',
        suggestedKeywords: 'Miles to km conversion (5 miles ≈ 8 km), Imperial / Metric conversion',
        objectives: [
          makeObj('8Gg.13', 'Convert between imperial miles and metric kilometres using the approximation 5 miles ≈ 8 km.', 'Grade 8', G8_BOOK, '15', 'Distance, area and volume', '15.1', 'Converting between miles and kilometres'),
        ],
      },
      {
        number: '15.2',
        title: 'The area of a parallelogram and trapezium',
        fullTitle: '15.2 The area of a parallelogram and trapezium',
        suggestedKeywords: 'Parallelogram area A = b × h, Trapezium area A = 1/2(a + b)h',
        objectives: [
          makeObj('8Gg.14', 'Derive and use the formulae for the area of a parallelogram (A = bh) and a trapezium (A = 1/2(a + b)h).', 'Grade 8', G8_BOOK, '15', 'Distance, area and volume', '15.2', 'The area of a parallelogram and trapezium'),
        ],
      },
      {
        number: '15.3',
        title: 'Calculating the volume of triangular prisms',
        fullTitle: '15.3 Calculating the volume of triangular prisms',
        suggestedKeywords: 'Volume of prism = Cross-sectional area × length',
        objectives: [
          makeObj('8Gg.15', 'Calculate the volume of right prisms, specifically right triangular prisms.', 'Grade 8', G8_BOOK, '15', 'Distance, area and volume', '15.3', 'Calculating the volume of triangular prisms'),
        ],
      },
      {
        number: '15.4',
        title: 'Calculating the surface area of triangular prisms and pyramids',
        fullTitle: '15.4 Calculating the surface area of triangular prisms and pyramids',
        suggestedKeywords: 'Surface area of prism and square-based pyramid',
        objectives: [
          makeObj('8Gg.16', 'Calculate the total surface area of triangular prisms and right pyramids.', 'Grade 8', G8_BOOK, '15', 'Distance, area and volume', '15.4', 'Calculating the surface area of triangular prisms and pyramids'),
        ],
      },
    ],
  },
  {
    number: '16',
    title: 'Interpreting and discussing results',
    fullTitle: 'Unit 16: Interpreting and discussing results',
    totalLessons: '6',
    subtopics: [
      {
        number: '16.1',
        title: 'Interpreting and drawing frequency diagrams',
        fullTitle: '16.1 Interpreting and drawing frequency diagrams',
        suggestedKeywords: 'Grouped frequency diagram, Continuous intervals',
        objectives: [
          makeObj('8Ss.03', 'Draw and interpret frequency diagrams for grouped discrete and continuous data.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.1', 'Interpreting and drawing frequency diagrams'),
        ],
      },
      {
        number: '16.2',
        title: 'Time series graphs',
        fullTitle: '16.2 Time series graphs',
        suggestedKeywords: 'Time series (grafik deret waktu), Trends (tren data)',
        objectives: [
          makeObj('8Ss.04', 'Construct and interpret time series graphs to identify trends over time.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.2', 'Time series graphs'),
        ],
      },
      {
        number: '16.3',
        title: 'Stem-and-leaf diagram',
        fullTitle: '16.3 Stem-and-leaf diagram',
        suggestedKeywords: 'Stem, Leaf, Key (kunci diagram batang dan daun)',
        objectives: [
          makeObj('8Ss.05', 'Construct and interpret ordered stem-and-leaf diagrams with keys.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.3', 'Stem-and-leaf diagram'),
        ],
      },
      {
        number: '16.4',
        title: 'Pie charts',
        fullTitle: '16.4 Pie charts',
        suggestedKeywords: 'Pie chart sector angle = (frequency / total) × 360°',
        objectives: [
          makeObj('8Ss.06', 'Draw and interpret pie charts, calculating exact sector angles and frequencies.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.4', 'Pie charts'),
        ],
      },
      {
        number: '16.5',
        title: 'Representing data',
        fullTitle: '16.5 Representing data',
        suggestedKeywords: 'Appropriate visual chart choice',
        objectives: [
          makeObj('8Ss.07', 'Compare different data displays and justify choice of diagram.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.5', 'Representing data'),
        ],
      },
      {
        number: '16.6',
        title: 'Using statistics',
        fullTitle: '16.6 Using statistics',
        suggestedKeywords: 'Modal class, Median of grouped data, Estimated mean',
        objectives: [
          makeObj('8Ss.08', 'Calculate an estimate of the mean for grouped data and identify the modal class and median group.', 'Grade 8', G8_BOOK, '16', 'Interpreting and discussing results', '16.6', 'Using statistics'),
        ],
      },
    ],
  },
];

// ----------------------------------------------------
// GRADE 9 CATALOGUE
// ----------------------------------------------------
const G9_BOOK = "Cambridge Mathematics Year 9 Learner's Book";

const G9_UNITS: UnitItem[] = [
  {
    number: '1',
    title: 'Number and calculation',
    fullTitle: 'Unit 1: Number and calculation',
    totalLessons: '6',
    subtopics: [
      {
        number: '1.1',
        title: 'Irrational numbers',
        fullTitle: '1.1 Irrational numbers',
        suggestedKeywords: 'Rational (bilangan rasional), Irrational (bilangan irasional), Surd (bentuk akar), Non-terminating non-recurring',
        objectives: [
          makeObj('9Ni.01', 'Distinguish between rational and irrational numbers, and identify surds.', 'Grade 9', G9_BOOK, '1', 'Number and calculation', '1.1', 'Irrational numbers'),
        ],
      },
      {
        number: '1.2',
        title: 'Standard form',
        fullTitle: '1.2 Standard form',
        suggestedKeywords: 'Scientific notation (bentuk baku / notasi ilmiah), A × 10ⁿ where 1 ≤ A < 10',
        objectives: [
          makeObj('9Ni.02', 'Write very large and very small numbers in standard index form (scientific notation).', 'Grade 9', G9_BOOK, '1', 'Number and calculation', '1.2', 'Standard form'),
        ],
      },
      {
        number: '1.3',
        title: 'Indices',
        fullTitle: '1.3 Indices',
        suggestedKeywords: 'Negative indices a⁻ⁿ = 1/aⁿ, Fractional indices a^(1/n) = ⁿ√a',
        objectives: [
          makeObj('9Ni.03', 'Use negative and fractional integer indices and understand their connection to reciprocals and roots.', 'Grade 9', G9_BOOK, '1', 'Number and calculation', '1.3', 'Indices'),
        ],
      },
    ],
  },
  {
    number: '2',
    title: 'Expressions and formulae',
    fullTitle: 'Unit 2: Expressions and formulae',
    totalLessons: '6',
    subtopics: [
      {
        number: '2.1',
        title: 'Substituting into expressions',
        fullTitle: '2.1 Substituting into expressions',
        suggestedKeywords: 'Evaluation with powers and negative numbers',
        objectives: [
          makeObj('9Ae.01', 'Substitute positive and negative numbers into complex algebraic expressions and formulae.', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.1', 'Substituting into expressions'),
        ],
      },
      {
        number: '2.2',
        title: 'Constructing expressions',
        fullTitle: '2.2 Constructing expressions',
        suggestedKeywords: 'Algebraic modeling of geometric and practical scenarios',
        objectives: [
          makeObj('9Ae.02', 'Construct complex algebraic expressions from geometric patterns and multi-step word problems.', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.2', 'Constructing expressions'),
        ],
      },
      {
        number: '2.3',
        title: 'Expressions and indices',
        fullTitle: '2.3 Expressions and indices',
        suggestedKeywords: 'Multiplying and dividing algebraic terms with index laws',
        objectives: [
          makeObj('9Ae.03', 'Simplify algebraic expressions involving integer powers using index laws (e.g. 2x³ × 4x⁵).', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.3', 'Expressions and indices'),
        ],
      },
      {
        number: '2.4',
        title: 'Expanding the product of two linear expressions',
        fullTitle: '2.4 Expanding the product of two linear expressions',
        suggestedKeywords: 'FOIL method, (x + a)(x + b) = x² + (a+b)x + ab, Difference of two squares (x+a)(x-a) = x² - a²',
        objectives: [
          makeObj('9Ae.04', 'Expand products of two linear expressions to form quadratic expressions.', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.4', 'Expanding the product of two linear expressions'),
        ],
      },
      {
        number: '2.5',
        title: 'Simplifying algebraic fractions',
        fullTitle: '2.5 Simplifying algebraic fractions',
        suggestedKeywords: 'Common algebraic factors, Factorising numerator and denominator',
        objectives: [
          makeObj('9Ae.05', 'Simplify algebraic fractions by cancelling common linear or monomial factors.', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.5', 'Simplifying algebraic fractions'),
        ],
      },
      {
        number: '2.6',
        title: 'Deriving and using formulae',
        fullTitle: '2.6 Deriving and using formulae',
        suggestedKeywords: 'Rearranging formulae (mengubah subjek rumus), Change of subject',
        objectives: [
          makeObj('9Ae.06', 'Derive formulae and rearrange linear formulae to change the subject.', 'Grade 9', G9_BOOK, '2', 'Expressions and formulae', '2.6', 'Deriving and using formulae'),
        ],
      },
    ],
  },
  {
    number: '3',
    title: 'Decimals, percentages and rounding',
    fullTitle: 'Unit 3: Decimals, percentages and rounding',
    totalLessons: '5',
    subtopics: [
      {
        number: '3.1',
        title: 'Multiplying and dividing by powers of 10',
        fullTitle: '3.1 Multiplying and dividing by powers of 10',
        suggestedKeywords: '10⁻¹, 10⁻², 10⁻³, Index notation with negative powers',
        objectives: [
          makeObj('9Np.01', 'Multiply and divide by negative powers of 10 understanding reciprocal relationships.', 'Grade 9', G9_BOOK, '3', 'Decimals, percentages and rounding', '3.1', 'Multiplying and dividing by powers of 10'),
        ],
      },
      {
        number: '3.2',
        title: 'Multiplying and dividing decimals',
        fullTitle: '3.2 Multiplying and dividing decimals',
        suggestedKeywords: 'Multi-step decimal arithmetic, Efficient estimation',
        objectives: [
          makeObj('9Nf.01', 'Multiply and divide decimals by decimals fluently.', 'Grade 9', G9_BOOK, '3', 'Decimals, percentages and rounding', '3.2', 'Multiplying and dividing decimals'),
        ],
      },
      {
        number: '3.3',
        title: 'Understanding compound percentages',
        fullTitle: '3.3 Understanding compound percentages',
        suggestedKeywords: 'Compound interest (bunga majemuk), Repeated percentage change, Depreciation (penyusutan)',
        objectives: [
          makeObj('9Nf.02', 'Calculate repeated percentage change and compound interest using multipliers.', 'Grade 9', G9_BOOK, '3', 'Decimals, percentages and rounding', '3.3', 'Understanding compound percentages'),
        ],
      },
      {
        number: '3.4',
        title: 'Understanding upper and lower bounds',
        fullTitle: '3.4 Understanding upper and lower bounds',
        suggestedKeywords: 'Upper bound (batas atas), Lower bound (batas bawah), Degree of accuracy',
        objectives: [
          makeObj('9Np.02', 'Determine the upper and lower bounds of numbers specified to a given degree of accuracy.', 'Grade 9', G9_BOOK, '3', 'Decimals, percentages and rounding', '3.4', 'Understanding upper and lower bounds'),
        ],
      },
    ],
  },
  {
    number: '4',
    title: 'Equations and inequalities',
    fullTitle: 'Unit 4: Equations and inequalities',
    totalLessons: '5',
    subtopics: [
      {
        number: '4.1',
        title: 'Constructing and solving equations',
        fullTitle: '4.1 Constructing and solving equations',
        suggestedKeywords: 'Equations with algebraic fractions, Multi-step linear equations',
        objectives: [
          makeObj('9Ae.07', 'Solve linear equations involving brackets, algebraic fractions, and negative coefficients.', 'Grade 9', G9_BOOK, '4', 'Equations and inequalities', '4.1', 'Constructing and solving equations'),
        ],
      },
      {
        number: '4.2',
        title: 'Simultaneous equations',
        fullTitle: '4.2 Simultaneous equations',
        suggestedKeywords: 'Simultaneous equations (persamaan linear dua variabel), Elimination method, Substitution method',
        objectives: [
          makeObj('9Ae.08', 'Construct and solve pairs of linear simultaneous equations by elimination and substitution.', 'Grade 9', G9_BOOK, '4', 'Equations and inequalities', '4.2', 'Simultaneous equations'),
        ],
      },
      {
        number: '4.3',
        title: 'Inequalities',
        fullTitle: '4.3 Inequalities',
        suggestedKeywords: 'Double inequalities (e.g. -2 < 3x + 1 <= 10), Multiplying by negative reverses inequality',
        objectives: [
          makeObj('9Ae.09', 'Solve multi-step linear inequalities and double inequalities, representing solution sets algebraically.', 'Grade 9', G9_BOOK, '4', 'Equations and inequalities', '4.3', 'Inequalities'),
        ],
      },
    ],
  },
  {
    number: '5',
    title: 'Angles',
    fullTitle: 'Unit 5: Angles',
    totalLessons: '6',
    subtopics: [
      {
        number: '5.1',
        title: 'Calculating angles',
        fullTitle: '5.1 Calculating angles',
        suggestedKeywords: 'Multi-step angle proofs, Parallel line theorems',
        objectives: [
          makeObj('9Gg.01', 'Use geometric deductive reasoning to calculate angles in composite diagrams.', 'Grade 9', G9_BOOK, '5', 'Angles', '5.1', 'Calculating angles'),
        ],
      },
      {
        number: '5.2',
        title: 'Interior angles of polygons',
        fullTitle: '5.2 Interior angles of polygons',
        suggestedKeywords: 'Interior angle sum = (n - 2) × 180°, Each interior angle of regular polygon',
        objectives: [
          makeObj('9Gg.02', 'Calculate interior angles and exterior angles of any regular or irregular polygon.', 'Grade 9', G9_BOOK, '5', 'Angles', '5.2', 'Interior angles of polygons'),
        ],
      },
      {
        number: '5.3',
        title: 'Exterior angles of polygons',
        fullTitle: '5.3 Exterior angles of polygons',
        suggestedKeywords: 'Sum of exterior angles = 360°, Exterior angle + Interior angle = 180°',
        objectives: [
          makeObj('9Gg.03', 'Know that the sum of exterior angles of any convex polygon is 360° and use this to solve problems.', 'Grade 9', G9_BOOK, '5', 'Angles', '5.3', 'Exterior angles of polygons'),
        ],
      },
      {
        number: '5.4',
        title: 'Constructions',
        fullTitle: '5.4 Constructions',
        suggestedKeywords: 'Locus / Loci (titik kedudukan), Equidistant from points and lines',
        objectives: [
          makeObj('9Gg.04', 'Construct and solve loci problems involving points equidistant from given points or lines.', 'Grade 9', G9_BOOK, '5', 'Angles', '5.4', 'Constructions'),
        ],
      },
      {
        number: '5.5',
        title: "Pythagoras' theorem",
        fullTitle: "5.5 Pythagoras' theorem",
        suggestedKeywords: "Hypotenuse (sisi miring), a² + b² = c², Right-angled triangle, Pythagorean triples",
        objectives: [
          makeObj('9Gg.05', "Understand and apply Pythagoras' theorem to calculate unknown sides in right-angled triangles.", 'Grade 9', G9_BOOK, '5', 'Angles', '5.5', "Pythagoras' theorem"),
        ],
      },
    ],
  },
  {
    number: '6',
    title: 'Statistical investigations',
    fullTitle: 'Unit 6: Statistical investigations',
    totalLessons: '4',
    subtopics: [
      {
        number: '6.1',
        title: 'Data collection and sampling',
        fullTitle: '6.1 Data collection and sampling',
        suggestedKeywords: 'Stratified sampling, Survey design, Reliability',
        objectives: [
          makeObj('9Ss.01', 'Plan statistical investigations, considering sample size, sample representation and ethical data handling.', 'Grade 9', G9_BOOK, '6', 'Statistical investigations', '6.1', 'Data collection and sampling'),
        ],
      },
      {
        number: '6.2',
        title: 'Bias',
        fullTitle: '6.2 Bias',
        suggestedKeywords: 'Selection bias, Leading questions, Non-response bias',
        objectives: [
          makeObj('9Ss.02', 'Identify and minimise bias in question wording, sampling techniques, and data collection.', 'Grade 9', G9_BOOK, '6', 'Statistical investigations', '6.2', 'Bias'),
        ],
      },
    ],
  },
  {
    number: '7',
    title: 'Shapes and measurements',
    fullTitle: 'Unit 7: Shapes and measurements',
    totalLessons: '5',
    subtopics: [
      {
        number: '7.1',
        title: 'Circumference and area of a circle',
        fullTitle: '7.1 Circumference and area of a circle',
        suggestedKeywords: 'Circle area A = πr², Circumference C = 2πr, Semicircle, Sector',
        objectives: [
          makeObj('9Gg.06', 'Know and use the formula for the area of a circle (A = πr²) and solve composite circular shape problems.', 'Grade 9', G9_BOOK, '7', 'Shapes and measurements', '7.1', 'Circumference and area of a circle'),
        ],
      },
      {
        number: '7.2',
        title: 'Areas of compound shapes',
        fullTitle: '7.2 Areas of compound shapes',
        suggestedKeywords: 'Compound shapes (bangun gabungan), Decomposition of shapes',
        objectives: [
          makeObj('9Gg.07', 'Calculate areas of compound 2D shapes combining rectangles, triangles, parallelograms, and circles.', 'Grade 9', G9_BOOK, '7', 'Shapes and measurements', '7.2', 'Areas of compound shapes'),
        ],
      },
      {
        number: '7.3',
        title: 'Large and small units',
        fullTitle: '7.3 Large and small units',
        suggestedKeywords: 'Compound units (speed = d/t, density = m/v, pressure = F/A)',
        objectives: [
          makeObj('9Gg.08', 'Convert between compound units of speed (m/s, km/h) and density.', 'Grade 9', G9_BOOK, '7', 'Shapes and measurements', '7.3', 'Large and small units'),
        ],
      },
    ],
  },
  {
    number: '8',
    title: 'Fractions',
    fullTitle: 'Unit 8: Fractions',
    totalLessons: '5',
    subtopics: [
      {
        number: '8.1',
        title: 'Fractions and recurring decimals',
        fullTitle: '8.1 Fractions and recurring decimals',
        suggestedKeywords: 'Converting recurring decimals to fractions algebraically',
        objectives: [
          makeObj('9Nf.03', 'Use algebra to convert recurring decimals into equivalent fractions in simplest form.', 'Grade 9', G9_BOOK, '8', 'Fractions', '8.1', 'Fractions and recurring decimals'),
        ],
      },
      {
        number: '8.2',
        title: 'Fractions and the correct order of operations',
        fullTitle: '8.2 Fractions and the correct order of operations',
        suggestedKeywords: 'BODMAS / BIDMAS with mixed fractions',
        objectives: [
          makeObj('9Nf.04', 'Evaluate arithmetic expressions with multiple operations, brackets, and powers involving fractions.', 'Grade 9', G9_BOOK, '8', 'Fractions', '8.2', 'Fractions and the correct order of operations'),
        ],
      },
      {
        number: '8.3',
        title: 'Multiplying fractions',
        fullTitle: '8.3 Multiplying fractions',
        suggestedKeywords: 'Fraction operations in algebraic contexts',
        objectives: [
          makeObj('9Nf.05', 'Multiply proper and improper fractions and mixed numbers fluently in multi-step problems.', 'Grade 9', G9_BOOK, '8', 'Fractions', '8.3', 'Multiplying fractions'),
        ],
      },
      {
        number: '8.4',
        title: 'Dividing fractions',
        fullTitle: '8.4 Dividing fractions',
        suggestedKeywords: 'Division of mixed numbers with algebraic applications',
        objectives: [
          makeObj('9Nf.06', 'Divide proper and improper fractions and mixed numbers fluently.', 'Grade 9', G9_BOOK, '8', 'Fractions', '8.4', 'Dividing fractions'),
        ],
      },
      {
        number: '8.5',
        title: 'Making calculations easier',
        fullTitle: '8.5 Making calculations easier',
        suggestedKeywords: 'Efficient mathematical strategies with fractions and decimals',
        objectives: [
          makeObj('9Nf.07', 'Apply strategic properties of numbers to simplify complex fractional computations.', 'Grade 9', G9_BOOK, '8', 'Fractions', '8.5', 'Making calculations easier'),
        ],
      },
    ],
  },
  {
    number: '9',
    title: 'Sequences and functions',
    fullTitle: 'Unit 9: Sequences and functions',
    totalLessons: '5',
    subtopics: [
      {
        number: '9.1',
        title: 'Generating sequences',
        fullTitle: '9.1 Generating sequences',
        suggestedKeywords: 'Quadratic sequences (barisan kuadratik), Second differences',
        objectives: [
          makeObj('9Ae.10', 'Generate terms of quadratic sequences and examine second differences.', 'Grade 9', G9_BOOK, '9', 'Sequences and functions', '9.1', 'Generating sequences'),
        ],
      },
      {
        number: '9.2',
        title: 'Using nth term',
        fullTitle: '9.2 Using nth term',
        suggestedKeywords: 'nth term for linear and simple quadratic sequences (an² + c)',
        objectives: [
          makeObj('9Ae.11', 'Find and use the nth term of simple quadratic sequences.', 'Grade 9', G9_BOOK, '9', 'Sequences and functions', '9.2', 'Using nth term'),
        ],
      },
      {
        number: '9.3',
        title: 'Representing functions',
        fullTitle: '9.3 Representing functions',
        suggestedKeywords: 'Function notation f(x) = ax + b, Composite functions',
        objectives: [
          makeObj('9Ae.12', 'Understand and use formal function notation f(x) and evaluate f(a).', 'Grade 9', G9_BOOK, '9', 'Sequences and functions', '9.3', 'Representing functions'),
        ],
      },
    ],
  },
  {
    number: '10',
    title: 'Graphs',
    fullTitle: 'Unit 10: Graphs',
    totalLessons: '5',
    subtopics: [
      {
        number: '10.1',
        title: 'Functions',
        fullTitle: '10.1 Functions',
        suggestedKeywords: 'Non-linear graphs, Parabola (parabola), Turning point',
        objectives: [
          makeObj('9Ae.13', 'Plot graphs of quadratic functions y = ax² + bx + c and identify lines of symmetry and turning points.', 'Grade 9', G9_BOOK, '10', 'Graphs', '10.1', 'Functions'),
        ],
      },
      {
        number: '10.2',
        title: 'Plotting graphs',
        fullTitle: '10.2 Plotting graphs',
        suggestedKeywords: 'Simultaneous graphical solution, Point of intersection',
        objectives: [
          makeObj('9Ae.14', 'Solve simultaneous linear equations graphically by identifying the point of intersection.', 'Grade 9', G9_BOOK, '10', 'Graphs', '10.2', 'Plotting graphs'),
        ],
      },
      {
        number: '10.3',
        title: 'Gradient and intercept',
        fullTitle: '10.3 Gradient and intercept',
        suggestedKeywords: 'Parallel and perpendicular gradients (m1 × m2 = -1)',
        objectives: [
          makeObj('9Ae.15', 'Find the equation of a straight line given two points, and understand perpendicular lines.', 'Grade 9', G9_BOOK, '10', 'Graphs', '10.3', 'Gradient and intercept'),
        ],
      },
      {
        number: '10.4',
        title: 'Interpreting graphs',
        fullTitle: '10.4 Interpreting graphs',
        suggestedKeywords: 'Gradient as rate of change, Area under distance-time or speed-time graph',
        objectives: [
          makeObj('9Ae.16', 'Interpret gradient as rate of change in practical graphs (speed, acceleration, rate of fill).', 'Grade 9', G9_BOOK, '10', 'Graphs', '10.4', 'Interpreting graphs'),
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Ratio and proportion',
    fullTitle: 'Unit 11: Ratio and proportion',
    totalLessons: '5',
    subtopics: [
      {
        number: '11.1',
        title: 'Using ratios',
        fullTitle: '11.1 Using ratios',
        suggestedKeywords: 'Scale factors in area and volume, Similar shapes ratio',
        objectives: [
          makeObj('9Np.03', 'Solve problems involving ratio in geometry, including scale factors of similar figures.', 'Grade 9', G9_BOOK, '11', 'Ratio and proportion', '11.1', 'Using ratios'),
        ],
      },
      {
        number: '11.2',
        title: 'Direct and inverse proportion',
        fullTitle: '11.2 Direct and inverse proportion',
        suggestedKeywords: 'Inverse proportion (perbandingan berbalik nilai), y = k/x, Reciprocal graph',
        objectives: [
          makeObj('9Np.04', 'Recognise and solve problems involving inverse proportion (e.g. workers and completion time).', 'Grade 9', G9_BOOK, '11', 'Ratio and proportion', '11.2', 'Direct and inverse proportion'),
        ],
      },
    ],
  },
  {
    number: '12',
    title: 'Probability',
    fullTitle: 'Unit 12: Probability',
    totalLessons: '5',
    subtopics: [
      {
        number: '12.1',
        title: 'Mutually exclusive events',
        fullTitle: '12.1 Mutually exclusive events',
        suggestedKeywords: 'P(A or B) = P(A) + P(B), Venn diagrams, Addition rule',
        objectives: [
          makeObj('9Sp.01', 'Use Venn diagrams and the addition rule for mutually exclusive events: P(A or B) = P(A) + P(B).', 'Grade 9', G9_BOOK, '12', 'Probability', '12.1', 'Mutually exclusive events'),
        ],
      },
      {
        number: '12.2',
        title: 'Independent events',
        fullTitle: '12.2 Independent events',
        suggestedKeywords: 'Independent events (kejadian saling bebas), P(A and B) = P(A) × P(B)',
        objectives: [
          makeObj('9Sp.02', 'Know and use the multiplication rule for independent events: P(A and B) = P(A) × P(B).', 'Grade 9', G9_BOOK, '12', 'Probability', '12.2', 'Independent events'),
        ],
      },
      {
        number: '12.3',
        title: 'Combined events',
        fullTitle: '12.3 Combined events',
        suggestedKeywords: 'Tree diagram (diagram pohon), Branch probabilities',
        objectives: [
          makeObj('9Sp.03', 'Use probability tree diagrams to calculate probabilities of successive combined events.', 'Grade 9', G9_BOOK, '12', 'Probability', '12.3', 'Combined events'),
        ],
      },
      {
        number: '12.4',
        title: 'Chance experiments',
        fullTitle: '12.4 Chance experiments',
        suggestedKeywords: 'Simulation, Expected frequencies from probability models',
        objectives: [
          makeObj('9Sp.04', 'Design and run chance simulations to model real-world risks and probabilities.', 'Grade 9', G9_BOOK, '12', 'Probability', '12.4', 'Chance experiments'),
        ],
      },
    ],
  },
  {
    number: '13',
    title: 'Position and transformation',
    fullTitle: 'Unit 13: Position and transformation',
    totalLessons: '5',
    subtopics: [
      {
        number: '13.1',
        title: 'Bearings and scale drawings',
        fullTitle: '13.1 Bearings and scale drawings',
        suggestedKeywords: 'Navigation bearings, Back bearings (bearing balik ±180°)',
        objectives: [
          makeObj('9Gg.09', 'Use bearings and scale drawings to solve complex navigational and positional problems.', 'Grade 9', G9_BOOK, '13', 'Position and transformation', '13.1', 'Bearings and scale drawings'),
        ],
      },
      {
        number: '13.2',
        title: 'Points on a line segment',
        fullTitle: '13.2 Points on a line segment',
        suggestedKeywords: 'Dividing line segment in ratio m:n on a grid',
        objectives: [
          makeObj('9Gg.10', 'Find coordinates of points that divide line segments in given ratios.', 'Grade 9', G9_BOOK, '13', 'Position and transformation', '13.2', 'Points on a line segment'),
        ],
      },
      {
        number: '13.3',
        title: 'Transformations',
        fullTitle: '13.3 Transformations',
        suggestedKeywords: 'Combined transformations, Sequence of reflection and translation',
        objectives: [
          makeObj('9Gg.11', 'Describe and execute combinations of transformations (reflection, rotation, translation).', 'Grade 9', G9_BOOK, '13', 'Position and transformation', '13.3', 'Transformations'),
        ],
      },
      {
        number: '13.4',
        title: 'Enlarging shapes',
        fullTitle: '13.4 Enlarging shapes',
        suggestedKeywords: 'Negative scale factors (inverting through centre), Fractional scale factors',
        objectives: [
          makeObj('9Gg.12', 'Enlarge shapes with fractional and negative scale factors about a specified centre.', 'Grade 9', G9_BOOK, '13', 'Position and transformation', '13.4', 'Enlarging shapes'),
        ],
      },
    ],
  },
  {
    number: '14',
    title: 'Volume, surface area and symmetry',
    fullTitle: 'Unit 14: Volume, surface area and symmetry',
    totalLessons: '6',
    subtopics: [
      {
        number: '14.1',
        title: 'Calculating the volume of prisms',
        fullTitle: '14.1 Calculating the volume of prisms',
        suggestedKeywords: 'Cylinder volume V = πr²h, General prism volume = Area of cross-section × length',
        objectives: [
          makeObj('9Gg.13', 'Calculate the volume of cylinders and general prisms.', 'Grade 9', G9_BOOK, '14', 'Volume, surface area and symmetry', '14.1', 'Calculating the volume of prisms'),
        ],
      },
      {
        number: '14.2',
        title: 'Calculating the surface area of triangular prisms, pyramids and cylinders',
        fullTitle: '14.2 Calculating the surface area of triangular prisms, pyramids and cylinders',
        suggestedKeywords: 'Cylinder curved surface area = 2πrh, Total surface area = 2πrh + 2πr²',
        objectives: [
          makeObj('9Gg.14', 'Calculate the total surface area of cylinders, triangular prisms, and regular pyramids.', 'Grade 9', G9_BOOK, '14', 'Volume, surface area and symmetry', '14.2', 'Calculating the surface area of triangular prisms, pyramids and cylinders'),
        ],
      },
      {
        number: '14.3',
        title: 'Symmetry in three-dimensional shapes',
        fullTitle: '14.3 Symmetry in three-dimensional shapes',
        suggestedKeywords: 'Plane symmetry (bidang simetri), Axis of rotational symmetry (sumbu simetri putar)',
        objectives: [
          makeObj('9Gg.15', 'Identify planes of symmetry and axes of rotational symmetry in 3D shapes.', 'Grade 9', G9_BOOK, '14', 'Volume, surface area and symmetry', '14.3', 'Symmetry in three-dimensional shapes'),
        ],
      },
    ],
  },
  {
    number: '15',
    title: 'Interpreting and discussing results',
    fullTitle: 'Unit 15: Interpreting and discussing results',
    totalLessons: '6',
    subtopics: [
      {
        number: '15.1',
        title: 'Interpreting and drawing frequency polygons',
        fullTitle: '15.1 Interpreting and drawing frequency polygons',
        suggestedKeywords: 'Frequency polygon (poligon frekuensi), Midpoint plotting',
        objectives: [
          makeObj('9Ss.03', 'Draw and interpret frequency polygons to compare continuous data sets.', 'Grade 9', G9_BOOK, '15', 'Interpreting and discussing results', '15.1', 'Interpreting and drawing frequency polygons'),
        ],
      },
      {
        number: '15.2',
        title: 'Scatter graphs',
        fullTitle: '15.2 Scatter graphs',
        suggestedKeywords: 'Scatter graph (diagram pencar), Correlation (korelasi positif/negatif/nol), Line of best fit',
        objectives: [
          makeObj('9Ss.04', 'Draw and interpret scatter graphs, identify correlation, and draw a line of best fit by eye.', 'Grade 9', G9_BOOK, '15', 'Interpreting and discussing results', '15.2', 'Scatter graphs'),
        ],
      },
      {
        number: '15.3',
        title: 'Back-to-back stem-and-leaf diagrams',
        fullTitle: '15.3 Back-to-back stem-and-leaf diagrams',
        suggestedKeywords: 'Back-to-back stem plot, Comparative analysis, Shared central stem',
        objectives: [
          makeObj('9Ss.05', 'Construct and interpret back-to-back stem-and-leaf diagrams to compare two distributions.', 'Grade 9', G9_BOOK, '15', 'Interpreting and discussing results', '15.3', 'Back-to-back stem-and-leaf diagrams'),
        ],
      },
      {
        number: '15.4',
        title: 'Calculating statistics for grouped data',
        fullTitle: '15.4 Calculating statistics for grouped data',
        suggestedKeywords: 'Estimated mean from frequency table Σ(fx)/Σf, Median class',
        objectives: [
          makeObj('9Ss.06', 'Calculate estimates of mean, median class, and modal class for large grouped continuous data sets.', 'Grade 9', G9_BOOK, '15', 'Interpreting and discussing results', '15.4', 'Calculating statistics for grouped data'),
        ],
      },
      {
        number: '15.5',
        title: 'Representing data',
        fullTitle: '15.5 Representing data',
        suggestedKeywords: 'Statistical critique, Misleading graphs, Critical evaluation of findings',
        objectives: [
          makeObj('9Ss.07', 'Critically evaluate statistical claims, recognise misleading graphs, and write balanced conclusion reports.', 'Grade 9', G9_BOOK, '15', 'Interpreting and discussing results', '15.5', 'Representing data'),
        ],
      },
    ],
  },
];

// Complete Catalogue grouped by Grade
export const CAMBRIDGE_GRADES: GradeItem[] = [
  {
    id: 'Grade 7',
    title: 'Grade 7 (SMP Kelas 7)',
    yearGroupNumber: '7',
    books: [
      {
        id: 'y7-book',
        title: G7_BOOK,
        grade: 'Grade 7',
        units: G7_UNITS,
      },
    ],
  },
  {
    id: 'Grade 8',
    title: 'Grade 8 (SMP Kelas 8)',
    yearGroupNumber: '8',
    books: [
      {
        id: 'y8-book',
        title: G8_BOOK,
        grade: 'Grade 8',
        units: G8_UNITS,
      },
    ],
  },
  {
    id: 'Grade 9',
    title: 'Grade 9 (SMP Kelas 9)',
    yearGroupNumber: '9',
    books: [
      {
        id: 'y9-book',
        title: G9_BOOK,
        grade: 'Grade 9',
        units: G9_UNITS,
      },
    ],
  },
];
