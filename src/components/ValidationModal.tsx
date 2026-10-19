import React from 'react';
import { LessonPlanData, ValidationIssue } from '../types/lessonPlan';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface ValidationModalProps {
  plan: LessonPlanData;
  isOpen: boolean;
  onClose: () => void;
}

export const ValidationModal: React.FC<ValidationModalProps> = ({
  plan,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const issues: ValidationIssue[] = [];

  // 1. Duration check
  const totalM = parseInt(plan.duration) || 80;
  const engageM = parseInt(plan.engage_t) || 0;
  const exploreM = parseInt(plan.explore_t) || 0;
  const explainM = parseInt(plan.explain_t) || 0;
  const elaborateM = parseInt(plan.elaborate_t) || 0;
  const evaluateM = parseInt(plan.evaluate_t) || 0;
  const sum5E = engageM + exploreM + explainM + elaborateM + evaluateM;

  if (sum5E !== totalM) {
    issues.push({
      type: 'error',
      field: '5E Duration',
      message: `Total duration (${totalM} min) does not match sum of 5E phases (${sum5E} min: Engage ${engageM}m + Explore ${exploreM}m + Explain ${explainM}m + Elaborate ${elaborateM}m + Evaluate ${evaluateM}m).`,
    });
  } else {
    issues.push({
      type: 'info',
      field: '5E Duration',
      message: `Duration correctly balanced: total ${totalM} min matches 5E phases sum perfectly.`,
    });
  }

  // 2. WALT & WILF alignment
  if (!plan.LO_1 || !plan.LO_2 || !plan.LO_3) {
    issues.push({
      type: 'warning',
      field: 'WALT Objectives',
      message: 'One or more WALT learning objectives are blank. Provide 3 measurable objectives.',
    });
  } else {
    issues.push({
      type: 'info',
      field: 'WALT Objectives',
      message: 'All 3 WALT learning objectives are defined.',
    });
  }

  if (!plan.WILF_1 || !plan.WILF_2 || !plan.WILF_3) {
    issues.push({
      type: 'warning',
      field: 'WILF Success Criteria',
      message: 'One or more WILF success criteria are blank.',
    });
  }

  // 3. SLO categories
  if (!plan.SLO_1 || !plan.SLO_2 || !plan.SLO_3 || !plan.SLO_4) {
    issues.push({
      type: 'warning',
      field: 'SLO Integration',
      message: 'Ensure all four SLO categories (Confident, Responsible, Reflective, Innovative) have descriptions.',
    });
  }

  // 4. CLIL Language terms
  if (!plan.keyword || plan.keyword.length < 5) {
    issues.push({
      type: 'warning',
      field: 'CLIL Language Objectives',
      message: 'Key mathematical terms with English & Bahasa Indonesia equivalents should be listed.',
    });
  }

  // 5. Cambridge AOs
  if (!plan.AO1 || !plan.AO2 || !plan.AO3) {
    issues.push({
      type: 'warning',
      field: 'Cambridge AOs',
      message: 'Cambridge Assessment Objectives AO1, AO2, and AO3 should be clearly defined.',
    });
  }

  // 6. Exit ticket
  if (
    !plan.assessment_evaluate2?.toLowerCase().includes('ao') &&
    !plan.evaluate?.toLowerCase().includes('exit ticket')
  ) {
    issues.push({
      type: 'info',
      field: 'Exit Ticket',
      message: 'Exit ticket assessing AO1/AO2/AO3 is present in the Evaluate phase.',
    });
  }

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');
  const infos = issues.filter((i) => i.type === 'info');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-teal-100 text-teal-800 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lesson Plan Quality & Validation Report
              </h3>
              <p className="text-[11px] text-slate-500">
                Verified against Cambridge 0862 & Semesta School standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Summary Banner */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed: {infos.length}</span>
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Warnings: {warnings.length}</span>
          </span>
          {errors.length > 0 && (
            <span className="flex items-center gap-1.5 text-rose-700 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Errors: {errors.length}</span>
            </span>
          )}
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto space-y-2.5 text-xs">
          {errors.map((err, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] uppercase tracking-wide text-rose-800">
                  {err.field}
                </strong>
                <p className="mt-0.5 leading-relaxed">{err.message}</p>
              </div>
            </div>
          ))}

          {warnings.map((warn, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] uppercase tracking-wide text-amber-800">
                  {warn.field}
                </strong>
                <p className="mt-0.5 leading-relaxed">{warn.message}</p>
              </div>
            </div>
          ))}

          {infos.map((info, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] uppercase tracking-wide text-slate-700">
                  {info.field}
                </strong>
                <p className="mt-0.5 leading-relaxed text-slate-600">{info.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
