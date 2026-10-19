import React, { useState, useEffect } from 'react';
import {
  CAMBRIDGE_GRADES,
  GradeItem,
  BookItem,
  UnitItem,
  SubtopicItem,
  CambridgeObjective,
} from '../data/cambridgeCatalogue';
import {
  BookOpen,
  ChevronRight,
  CheckSquare,
  Square,
  GraduationCap,
  Layers,
  Compass,
  FileCheck2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface DependentDropdownSystemProps {
  onCurriculumSelect: (selection: {
    grade: string;
    yearGroupNumber: string;
    bookTitle: string;
    unitNumber: string;
    unitTitle: string;
    subtopicNumber: string;
    subtopicTitle: string;
    selectedObjectives: CambridgeObjective[];
    suggestedKeywords?: string;
  }) => void;
  initialGrade?: string;
  initialUnit?: string;
}

export const DependentDropdownSystem: React.FC<DependentDropdownSystemProps> = ({
  onCurriculumSelect,
  initialGrade = 'Grade 7',
  initialUnit = '1',
}) => {
  // Dropdown 1: Grade
  const [selectedGradeId, setSelectedGradeId] = useState<string>(initialGrade);

  // Dropdown 2: Book
  const [selectedBookId, setSelectedBookId] = useState<string>('');

  // Dropdown 3: Unit
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<string>('');

  // Dropdown 4: Subtopic
  const [selectedSubtopicNumber, setSelectedSubtopicNumber] = useState<string>('');

  // Dropdown 5: Objectives (multi-select)
  const [selectedObjectiveCodes, setSelectedObjectiveCodes] = useState<string[]>([]);

  // Find currently active grade object
  const activeGrade: GradeItem | undefined = CAMBRIDGE_GRADES.find(
    (g) => g.id === selectedGradeId
  );

  // Available books for the selected grade
  const availableBooks: BookItem[] = activeGrade ? activeGrade.books : [];

  // Find active book object
  const activeBook: BookItem | undefined = availableBooks.find(
    (b) => b.id === selectedBookId
  );

  // Available units for the selected book
  const availableUnits: UnitItem[] = activeBook ? activeBook.units : [];

  // Find active unit object
  const activeUnit: UnitItem | undefined = availableUnits.find(
    (u) => u.number === selectedUnitNumber
  );

  // Available subtopics for the selected unit
  const availableSubtopics: SubtopicItem[] = activeUnit ? activeUnit.subtopics : [];

  // Find active subtopic object
  const activeSubtopic: SubtopicItem | undefined = availableSubtopics.find(
    (s) => s.number === selectedSubtopicNumber
  );

  // Available objectives for currently selected subtopic
  const availableObjectives: CambridgeObjective[] = activeSubtopic
    ? activeSubtopic.objectives
    : [];

  // Initial setup: auto-select single book when grade changes
  useEffect(() => {
    if (availableBooks.length === 1 && !selectedBookId) {
      setSelectedBookId(availableBooks[0].id);
    }
  }, [availableBooks, selectedBookId]);

  // Initial setup for Unit 1 and Subtopic 1.1 if matching default
  useEffect(() => {
    if (selectedGradeId === 'Grade 7' && selectedBookId === 'y7-book' && !selectedUnitNumber) {
      const u1 = availableUnits.find((u) => u.number === '1');
      if (u1) {
        setSelectedUnitNumber('1');
        if (u1.subtopics.length > 0) {
          const s1 = u1.subtopics[0];
          setSelectedSubtopicNumber(s1.number);
          setSelectedObjectiveCodes(s1.objectives.map((o) => o.code));
        }
      }
    }
  }, [selectedGradeId, selectedBookId, availableUnits]);

  // ----------------------------------------------------
  // CASCADE & RESET HANDLERS (STRICT ENFORCEMENT)
  // ----------------------------------------------------

  // 1. When Grade changes:
  const handleGradeChange = (newGradeId: string) => {
    setSelectedGradeId(newGradeId);
    // Reset all downstream dropdowns
    const newGrade = CAMBRIDGE_GRADES.find((g) => g.id === newGradeId);
    if (newGrade && newGrade.books.length === 1) {
      setSelectedBookId(newGrade.books[0].id);
    } else {
      setSelectedBookId('');
    }
    setSelectedUnitNumber('');
    setSelectedSubtopicNumber('');
    setSelectedObjectiveCodes([]);
  };

  // 2. When Book changes:
  const handleBookChange = (newBookId: string) => {
    setSelectedBookId(newBookId);
    // Reset all downstream dropdowns
    setSelectedUnitNumber('');
    setSelectedSubtopicNumber('');
    setSelectedObjectiveCodes([]);
  };

  // 3. When Unit changes:
  const handleUnitChange = (newUnitNumber: string) => {
    setSelectedUnitNumber(newUnitNumber);
    // Reset all downstream dropdowns
    setSelectedSubtopicNumber('');
    setSelectedObjectiveCodes([]);
  };

  // 4. When Subtopic changes:
  const handleSubtopicChange = (newSubtopicNumber: string) => {
    setSelectedSubtopicNumber(newSubtopicNumber);
    // Automatically select all objectives for this subtopic by default
    const sub = availableSubtopics.find((s) => s.number === newSubtopicNumber);
    if (sub) {
      setSelectedObjectiveCodes(sub.objectives.map((o) => o.code));
    } else {
      setSelectedObjectiveCodes([]);
    }
  };

  // 5. Objective toggle handler
  const handleToggleObjective = (code: string) => {
    setSelectedObjectiveCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Select all objectives for the current subtopic
  const handleSelectAllObjectives = () => {
    if (selectedObjectiveCodes.length === availableObjectives.length) {
      setSelectedObjectiveCodes([]);
    } else {
      setSelectedObjectiveCodes(availableObjectives.map((o) => o.code));
    }
  };

  // Synchronize changes to parent form whenever a complete or valid path is chosen
  useEffect(() => {
    if (activeGrade && activeBook && activeUnit && activeSubtopic) {
      const chosenObjectives = availableObjectives.filter((o) =>
        selectedObjectiveCodes.includes(o.code)
      );

      onCurriculumSelect({
        grade: activeGrade.id,
        yearGroupNumber: activeGrade.yearGroupNumber,
        bookTitle: activeBook.title,
        unitNumber: activeUnit.number,
        unitTitle: activeUnit.title,
        subtopicNumber: activeSubtopic.number,
        subtopicTitle: activeSubtopic.title,
        selectedObjectives: chosenObjectives,
        suggestedKeywords: activeSubtopic.suggestedKeywords,
      });
    }
  }, [
    selectedGradeId,
    selectedBookId,
    selectedUnitNumber,
    selectedSubtopicNumber,
    selectedObjectiveCodes,
  ]);

  return (
    <div className="bg-white border border-teal-200/90 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-teal-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-800 text-white rounded-lg shadow-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-teal-950 uppercase tracking-wider flex items-center gap-1.5">
              <span>Dependent Dropdown Curriculum System</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-teal-100 text-teal-800 rounded font-normal">
                0862 Syllabus
              </span>
            </h2>
            <p className="text-[11px] text-slate-500">
              Grade → Learner's Book → Unit → Subtopic → Cambridge Learning Objectives
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Dropdowns 1 to 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* DROPDOWN 1: Grade */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-teal-800 text-white text-[9px] flex items-center justify-center font-mono">
              1
            </span>
            <span>Grade</span>
          </label>
          <select
            value={selectedGradeId}
            onChange={(e) => handleGradeChange(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 shadow-2xs"
          >
            <option value="" disabled>
              Select Grade...
            </option>
            {CAMBRIDGE_GRADES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.id} (Year {g.yearGroupNumber} SMP)
              </option>
            ))}
          </select>
        </div>

        {/* DROPDOWN 2: Cambridge Learner's Book */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-teal-800 text-white text-[9px] flex items-center justify-center font-mono">
              2
            </span>
            <span>Cambridge Learner's Book</span>
          </label>
          <select
            value={selectedBookId}
            onChange={(e) => handleBookChange(e.target.value)}
            disabled={!selectedGradeId || availableBooks.length === 0}
            className={`w-full text-xs p-2.5 rounded-xl border transition-colors shadow-2xs ${
              !selectedGradeId
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-300 font-medium text-slate-900 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
            }`}
          >
            {!selectedGradeId ? (
              <option value="">Select a grade first</option>
            ) : (
              <>
                <option value="" disabled>
                  Select Learner's Book...
                </option>
                {availableBooks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* DROPDOWN 3: Unit / Chapter */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-teal-800 text-white text-[9px] flex items-center justify-center font-mono">
              3
            </span>
            <span>Unit / Chapter</span>
            {availableUnits.length > 0 && (
              <span className="text-[10px] text-teal-700 font-normal ml-auto">
                {availableUnits.length} units available
              </span>
            )}
          </label>
          <select
            value={selectedUnitNumber}
            onChange={(e) => handleUnitChange(e.target.value)}
            disabled={!selectedBookId || availableUnits.length === 0}
            className={`w-full text-xs p-2.5 rounded-xl border transition-colors shadow-2xs ${
              !selectedBookId
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-300 font-medium text-slate-900 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
            }`}
          >
            {!selectedBookId ? (
              <option value="">Select a book first</option>
            ) : (
              <>
                <option value="" disabled>
                  Select Unit / Chapter...
                </option>
                {availableUnits.map((u) => (
                  <option key={u.number} value={u.number}>
                    Unit {u.number}: {u.title}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* DROPDOWN 4: Topic / Subtopic */}
        <div>
          <label className="block text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-teal-800 text-white text-[9px] flex items-center justify-center font-mono">
              4
            </span>
            <span>Topic / Subtopic</span>
            {availableSubtopics.length > 0 && (
              <span className="text-[10px] text-teal-700 font-normal ml-auto">
                {availableSubtopics.length} subtopics
              </span>
            )}
          </label>
          <select
            value={selectedSubtopicNumber}
            onChange={(e) => handleSubtopicChange(e.target.value)}
            disabled={!selectedUnitNumber || availableSubtopics.length === 0}
            className={`w-full text-xs p-2.5 rounded-xl border transition-colors shadow-2xs ${
              !selectedUnitNumber
                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-white border-slate-300 font-medium text-slate-900 focus:border-teal-700 focus:ring-1 focus:ring-teal-700'
            }`}
          >
            {!selectedUnitNumber ? (
              <option value="">Select a unit first</option>
            ) : (
              <>
                <option value="" disabled>
                  Select Topic / Subtopic...
                </option>
                {availableSubtopics.map((s) => (
                  <option key={s.number} value={s.number}>
                    {s.fullTitle}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* DROPDOWN 5: Learning Objectives (Multi-select) */}
      <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/70 space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-teal-800 text-white text-[9px] flex items-center justify-center font-mono">
              5
            </span>
            <span>Cambridge Learning Objectives</span>
            {availableObjectives.length > 0 && (
              <span className="text-[10px] font-normal text-slate-500">
                ({selectedObjectiveCodes.length} of {availableObjectives.length} selected)
              </span>
            )}
          </label>

          {availableObjectives.length > 0 && (
            <button
              type="button"
              onClick={handleSelectAllObjectives}
              className="text-[11px] text-teal-800 hover:text-teal-950 font-semibold flex items-center gap-1"
            >
              {selectedObjectiveCodes.length === availableObjectives.length ? (
                <>
                  <Square className="w-3.5 h-3.5 text-teal-700" />
                  <span>Deselect all</span>
                </>
              ) : (
                <>
                  <CheckSquare className="w-3.5 h-3.5 text-teal-700" />
                  <span>Select all relevant objectives</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Empty state or list */}
        {!selectedSubtopicNumber ? (
          <div className="p-3 text-center text-xs text-slate-400 bg-white rounded-lg border border-dashed border-slate-200">
            Select a subtopic first to view Cambridge learning objectives.
          </div>
        ) : availableObjectives.length === 0 ? (
          <div className="p-3 text-center text-xs text-slate-500 bg-white rounded-lg border border-slate-200">
            No specific objectives mapped for this subtopic.
          </div>
        ) : (
          <div className="space-y-2">
            {availableObjectives.map((obj) => {
              const isChecked = selectedObjectiveCodes.includes(obj.code);
              return (
                <div
                  key={obj.code}
                  onClick={() => handleToggleObjective(obj.code)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'bg-teal-50 border-teal-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleObjective(obj.code)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5 rounded text-teal-800 focus:ring-teal-700"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono font-bold text-teal-900 bg-teal-100/80 px-1.5 py-0.5 rounded text-[10px]">
                        {obj.code}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {obj.unitTitle} • {obj.subtopicTitle}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Curriculum Pathway Bar */}
      {activeGrade && activeBook && activeUnit && activeSubtopic && (
        <div className="bg-teal-900 text-teal-100 rounded-xl p-3 text-xs shadow-xs flex flex-col gap-1">
          <div className="text-[10px] text-teal-300 uppercase tracking-wider font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Active Cambridge Curriculum Pathway</span>
          </div>
          <div className="font-medium flex flex-wrap items-center gap-1 text-[11px] text-white">
            <span className="font-bold">{activeGrade.id}</span>
            <ChevronRight className="w-3 h-3 text-teal-400" />
            <span>{activeBook.title}</span>
            <ChevronRight className="w-3 h-3 text-teal-400" />
            <span className="font-bold">Unit {activeUnit.number}: {activeUnit.title}</span>
            <ChevronRight className="w-3 h-3 text-teal-400" />
            <span className="underline decoration-teal-400">{activeSubtopic.fullTitle}</span>
            {selectedObjectiveCodes.length > 0 && (
              <span className="bg-teal-800 text-teal-200 px-1.5 py-0.5 rounded font-mono text-[10px] ml-1">
                [{selectedObjectiveCodes.join(', ')}]
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
