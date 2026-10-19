import React, { useState } from 'react';
import { LessonPlanData } from '../types/lessonPlan';
import { DependentDropdownSystem } from './DependentDropdownSystem';
import { CambridgeObjective } from '../data/cambridgeCatalogue';
import {
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  Layers,
  GraduationCap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface LessonPlanFormProps {
  plan: LessonPlanData;
  onUpdatePlan: (updated: Partial<LessonPlanData>) => void;
  onGeneratePlan: (formParams: any) => Promise<void>;
  isGenerating: boolean;
  onResetToDefault: () => void;
}

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({
  plan,
  onUpdatePlan,
  onGeneratePlan,
  isGenerating,
  onResetToDefault,
}) => {
  const [customInstructions, setCustomInstructions] = useState<string>(
    'Focus on student-centred inquiry during Explore phase. Emphasise concrete representations before abstract notation.'
  );
  const [priorKnowledge, setPriorKnowledge] = useState<string>(
    'Prerequisite understanding from previous grade and early stage units.'
  );

  // Parse total duration in minutes
  const totalDurationMinutes = parseInt(plan.duration) || 80;
  const engageM = parseInt(plan.engage_t) || 10;
  const exploreM = parseInt(plan.explore_t) || 25;
  const explainM = parseInt(plan.explain_t) || 15;
  const elaborateM = parseInt(plan.elaborate_t) || 20;
  const evaluateM = parseInt(plan.evaluate_t) || 10;
  const sum5E = engageM + exploreM + explainM + elaborateM + evaluateM;
  const isTimingBalanced = sum5E === totalDurationMinutes;

  const handleCurriculumSelect = (sel: {
    grade: string;
    yearGroupNumber: string;
    bookTitle: string;
    unitNumber: string;
    unitTitle: string;
    subtopicNumber: string;
    subtopicTitle: string;
    selectedObjectives: CambridgeObjective[];
    suggestedKeywords?: string;
  }) => {
    const objs = sel.selectedObjectives;
    let lo1 = plan.LO_1;
    let lo2 = plan.LO_2;
    let lo3 = plan.LO_3;

    if (objs.length === 1) {
      lo1 = `Students will be able to: ${objs[0].description} (${objs[0].code})`;
      lo2 = `Students will be able to apply ${sel.subtopicTitle.toLowerCase()} methods to solve contextualised problems.`;
      lo3 = `Students will be able to justify mathematical steps and explain reasoning using formal notation.`;
    } else if (objs.length === 2) {
      lo1 = `Students will be able to: ${objs[0].description} (${objs[0].code})`;
      lo2 = `Students will be able to: ${objs[1].description} (${objs[1].code})`;
      lo3 = `Students will be able to combine these concepts to solve multi-step mathematical problems.`;
    } else if (objs.length >= 3) {
      lo1 = `Students will be able to: ${objs[0].description} (${objs[0].code})`;
      lo2 = `Students will be able to: ${objs[1].description} (${objs[1].code})`;
      lo3 = `Students will be able to: ${objs[2].description} (${objs[2].code})`;
    }

    onUpdatePlan({
      kelas: sel.yearGroupNumber,
      unit: sel.unitNumber,
      tittle_unit: `${sel.unitTitle} — ${sel.subtopicNumber} ${sel.subtopicTitle}`,
      LB: `${sel.bookTitle}, Unit ${sel.unitNumber}`,
      slide: `IFP Presentation — ${sel.subtopicNumber} ${sel.subtopicTitle}`,
      keyword: sel.suggestedKeywords || plan.keyword,
      LO_1: lo1,
      LO_2: lo2,
      LO_3: lo3,
      AO1: `Recall definitions, facts, and standard operations for ${sel.subtopicTitle}.`,
      AO2: `Apply knowledge of ${sel.subtopicTitle} to solve authentic and multi-step problems.`,
      AO3: `Explain and justify mathematical decisions in ${sel.subtopicTitle} using rigorous reasoning.`,
    });
  };

  const handleAutoBalanceTiming = () => {
    const total = parseInt(plan.duration) || 80;
    const eng = Math.round(total * 0.125); // ~10m for 80m
    const exp = Math.round(total * 0.3125); // ~25m for 80m
    const expl = Math.round(total * 0.1875); // ~15m for 80m
    const elab = Math.round(total * 0.25); // ~20m for 80m
    const evalT = total - (eng + exp + expl + elab);

    onUpdatePlan({
      engage_t: eng.toString(),
      explore_t: exp.toString(),
      explain_t: expl.toString(),
      elaborate_t: elab.toString(),
      evaluate_t: evalT.toString(),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePlan({
      tittle_unit: plan.tittle_unit,
      unit: plan.unit,
      lesson: plan.lesson,
      total_lesson: plan.total_lesson,
      kelas: plan.kelas,
      duration: plan.duration,
      date_L: plan.date_L,
      month_L: plan.month_L,
      year_L: plan.year_L,
      teacher: plan.teacher,
      department: plan.department,
      syllabus: plan.syllabus,
      userObjectives: `${plan.LO_1} | ${plan.LO_2} | ${plan.LO_3}`,
      priorKnowledge,
      teachingPreferences: customInstructions,
      timingSplit: {
        engage: plan.engage_t,
        explore: plan.explore_t,
        explain: plan.explain_t,
        elaborate: plan.elaborate_t,
        evaluate: plan.evaluate_t,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6 text-slate-800">
      {/* 5-TIER DEPENDENT DROPDOWN CURRICULUM SYSTEM */}
      <DependentDropdownSystem
        onCurriculumSelect={handleCurriculumSelect}
        initialGrade={plan.kelas === '8' ? 'Grade 8' : plan.kelas === '9' ? 'Grade 9' : 'Grade 7'}
        initialUnit={plan.unit || '1'}
      />

      {/* Section 1: Basic Information */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-teal-700" />
            <span>1. Lesson Information</span>
          </h2>
          <span className="text-[11px] text-slate-500">School & Schedule</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Year Group */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Year Group
            </label>
            <input
              type="text"
              readOnly
              value={`Year ${plan.kelas} (SMP)`}
              className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 font-medium"
            />
          </div>

          {/* Unit Number */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Unit Number
            </label>
            <input
              type="text"
              value={plan.unit}
              onChange={(e) => onUpdatePlan({ unit: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-semibold"
              placeholder="e.g. 1"
            />
          </div>

          {/* Lesson X */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Lesson Number
            </label>
            <input
              type="text"
              value={plan.lesson}
              onChange={(e) => onUpdatePlan({ lesson: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-semibold"
              placeholder="e.g. 1"
            />
          </div>

          {/* Total Lessons */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Total Lessons
            </label>
            <input
              type="text"
              value={plan.total_lesson}
              onChange={(e) => onUpdatePlan({ total_lesson: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="e.g. 6"
            />
          </div>
        </div>

        {/* Unit Title */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Unit Title & Subtopic
          </label>
          <input
            type="text"
            value={plan.tittle_unit}
            onChange={(e) => onUpdatePlan({ tittle_unit: e.target.value })}
            className="w-full text-xs p-2 rounded-lg border border-slate-300 font-medium focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-teal-900 font-semibold"
            placeholder="e.g. Integers"
          />
        </div>

        {/* Duration with presets */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
            <span>Total Lesson Duration</span>
            <span className="text-slate-400 font-normal">Standard: 80 min (double period)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={plan.duration}
              onChange={(e) => onUpdatePlan({ duration: e.target.value })}
              className="w-32 text-xs p-2 rounded-lg border border-slate-300 font-medium focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              placeholder="80 min"
            />
            <div className="flex items-center gap-1">
              {['45 min', '60 min', '80 min', '90 min'].map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => onUpdatePlan({ duration: dur })}
                  className={`px-2 py-1.5 text-[11px] rounded-lg border transition-colors ${
                    plan.duration === dur
                      ? 'bg-teal-700 text-white border-teal-700 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Date & Teacher */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Lesson Date (DD / MM / YYYY)
            </label>
            <div className="grid grid-cols-3 gap-1">
              <input
                type="text"
                value={plan.date_L}
                onChange={(e) => onUpdatePlan({ date_L: e.target.value, date_s: e.target.value })}
                className="text-xs p-1.5 rounded-lg border border-slate-300 text-center font-medium"
                placeholder="DD"
              />
              <input
                type="text"
                value={plan.month_L}
                onChange={(e) =>
                  onUpdatePlan({ month_L: e.target.value, month_s: e.target.value })
                }
                className="text-xs p-1.5 rounded-lg border border-slate-300 text-center font-medium"
                placeholder="MM"
              />
              <input
                type="text"
                value={plan.year_L}
                onChange={(e) => onUpdatePlan({ year_L: e.target.value, year_s: e.target.value })}
                className="text-xs p-1.5 rounded-lg border border-slate-300 text-center font-medium"
                placeholder="YYYY"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Teacher Name
            </label>
            <input
              type="text"
              value={plan.teacher}
              onChange={(e) => onUpdatePlan({ teacher: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Department
            </label>
            <input
              type="text"
              value={plan.department}
              onChange={(e) => onUpdatePlan({ department: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Section 2: 5E Model Timing Allocator */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-700" />
            <span>2. 5E Timing Split</span>
          </h2>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isTimingBalanced
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {isTimingBalanced ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-amber-600" />
              )}
              <span>
                Sum: {sum5E} / {totalDurationMinutes} min
              </span>
            </span>

            {!isTimingBalanced && (
              <button
                type="button"
                onClick={handleAutoBalanceTiming}
                className="text-[11px] text-teal-700 hover:text-teal-900 underline font-semibold"
              >
                Auto Balance
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-teal-50 border border-teal-200">
            <label className="block font-bold text-[#006064] text-[11px] mb-1">Engage</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="text"
                value={plan.engage_t}
                onChange={(e) => onUpdatePlan({ engage_t: e.target.value })}
                className="w-12 text-center text-xs font-semibold p-1 bg-white border border-teal-300 rounded"
              />
              <span className="text-[10px] text-slate-500">min</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-cyan-50 border border-cyan-200">
            <label className="block font-bold text-[#00838F] text-[11px] mb-1">Explore</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="text"
                value={plan.explore_t}
                onChange={(e) => onUpdatePlan({ explore_t: e.target.value })}
                className="w-12 text-center text-xs font-semibold p-1 bg-white border border-cyan-300 rounded"
              />
              <span className="text-[10px] text-slate-500">min</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
            <label className="block font-bold text-[#2E5496] text-[11px] mb-1">Explain</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="text"
                value={plan.explain_t}
                onChange={(e) => onUpdatePlan({ explain_t: e.target.value })}
                className="w-12 text-center text-xs font-semibold p-1 bg-white border border-blue-300 rounded"
              />
              <span className="text-[10px] text-slate-500">min</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
            <label className="block font-bold text-[#E65100] text-[11px] mb-1">Elaborate</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="text"
                value={plan.elaborate_t}
                onChange={(e) => onUpdatePlan({ elaborate_t: e.target.value })}
                className="w-12 text-center text-xs font-semibold p-1 bg-white border border-orange-300 rounded"
              />
              <span className="text-[10px] text-slate-500">min</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
            <label className="block font-bold text-[#2E7D32] text-[11px] mb-1">Evaluate</label>
            <div className="flex items-center justify-center gap-1">
              <input
                type="text"
                value={plan.evaluate_t}
                onChange={(e) => onUpdatePlan({ evaluate_t: e.target.value })}
                className="w-12 text-center text-xs font-semibold p-1 bg-white border border-emerald-300 rounded"
              />
              <span className="text-[10px] text-slate-500">min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Objectives & AOs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-teal-700" />
            <span>3. Cambridge Assessment Objectives (AOs)</span>
          </h2>
          <span className="text-[11px] text-slate-500">Syllabus 0862</span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-teal-900 mb-0.5">
              AO1 (Knowledge & Understanding)
            </label>
            <input
              type="text"
              value={plan.AO1}
              onChange={(e) => onUpdatePlan({ AO1: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-teal-900 mb-0.5">
              AO2 (Applying Mathematical Knowledge & Problem Solving)
            </label>
            <input
              type="text"
              value={plan.AO2}
              onChange={(e) => onUpdatePlan({ AO2: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-teal-900 mb-0.5">
              AO3 (Mathematical Reasoning & Communicating Mathematically)
            </label>
            <input
              type="text"
              value={plan.AO3}
              onChange={(e) => onUpdatePlan({ AO3: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600"
            />
          </div>
        </div>

        {/* Resources References */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Textbook Reference (LB)
            </label>
            <input
              type="text"
              value={plan.LB}
              onChange={(e) => onUpdatePlan({ LB: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-medium"
              placeholder="e.g. Cambridge Mathematics Year 7 Learner's Book, Unit 1"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Digital Presentation (Slide)
            </label>
            <input
              type="text"
              value={plan.slide}
              onChange={(e) => onUpdatePlan({ slide: e.target.value })}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 font-medium"
              placeholder="e.g. IFP Presentation — Unit 1 Lesson 1"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Context & Teacher Directives */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-teal-700" />
            <span>4. Pedagogical Focus & Classroom Constraints</span>
          </h2>
          <span className="text-[11px] text-slate-500">AI Prompt Guidance</span>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Prior Knowledge Context
          </label>
          <input
            type="text"
            value={priorKnowledge}
            onChange={(e) => setPriorKnowledge(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-300"
            placeholder="e.g. Prerequisite knowledge from primary or earlier units..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Teacher Instructions & Specific Classroom Demands
          </label>
          <textarea
            rows={3}
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-teal-600 leading-relaxed"
            placeholder="e.g. Focus on student discovery during Explore. Provide bilingual visual mats for EAL students. Include real-world problem context."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isGenerating}
          className="flex-1 py-3 px-4 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating Cambridge Lesson Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-teal-200" />
              <span>Generate 5E Lesson Plan with AI</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onResetToDefault}
          className="py-3 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
          title="Reset to verified Semesta default lesson plan"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset</span>
        </button>
      </div>
    </form>
  );
};
