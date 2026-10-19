import React, { useState } from 'react';
import { LessonPlanData } from './types/lessonPlan';
import { DEFAULT_LESSON_PLAN } from './data/cambridgeCurriculum';
import { LessonPlanForm } from './components/LessonPlanForm';
import { DocumentPreview } from './components/DocumentPreview';
import { ValidationModal } from './components/ValidationModal';
import {
  FileText,
  Sparkles,
  Download,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { exportLessonPlanDocx } from './services/templateProcessor';

export default function App() {
  const [plan, setPlan] = useState<LessonPlanData>(DEFAULT_LESSON_PLAN);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [isValidationOpen, setIsValidationOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [activeTabMobile, setActiveTabMobile] = useState<'form' | 'preview'>('preview');

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  const handleUpdatePlan = (updated: Partial<LessonPlanData>) => {
    setPlan((prev) => ({ ...prev, ...updated }));
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all fields to the default Semesta School Cambridge lesson plan?')) {
      setPlan(DEFAULT_LESSON_PLAN);
      showNotification('info', 'Reset to Semesta School standard lesson plan template.');
    }
  };

  const handleGeneratePlan = async (formParams: any) => {
    try {
      setIsGenerating(true);
      const res = await fetch('/api/generate-lesson-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formParams),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setPlan(data.plan);
      showNotification('success', 'Lesson plan generated successfully with Gemini AI!');
      setActiveTabMobile('preview');
    } catch (err: any) {
      console.error('Error generating lesson plan:', err);
      showNotification(
        'error',
        err.message || 'Could not connect to generator. Please check your inputs.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateSection = async (
    section: 'fiveE' | 'differentiation' | 'waltWilf' | 'assessment'
  ) => {
    try {
      setIsRegenerating(true);
      setRegeneratingSection(section);
      const res = await fetch('/api/regenerate-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          currentPlan: plan,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to regenerate section');
      }

      setPlan((prev) => ({
        ...prev,
        ...data.updatedFields,
      }));

      const sectionNames: Record<string, string> = {
        fiveE: '5E Instructional Model',
        differentiation: 'Differentiation Provisions',
        waltWilf: 'WALT, WILF & SLOs',
        assessment: 'Assessment & Reflection',
      };
      showNotification(
        'success',
        `${sectionNames[section] || 'Section'} updated successfully!`
      );
    } catch (err: any) {
      console.error('Error regenerating section:', err);
      showNotification('error', err.message || 'Failed to regenerate section');
    } finally {
      setIsRegenerating(false);
      setRegeneratingSection(null);
    }
  };

  const handleQuickDownload = async () => {
    try {
      const blob = await exportLessonPlanDocx(plan);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const safeUnit = (plan.tittle_unit || 'LessonPlan').replace(/[^a-zA-Z0-9_-]/g, '_');
      const filename = `Cambridge_Year${plan.kelas || '7'}_${safeUnit}_Lesson${plan.lesson || '1'}.docx`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('Quick download error:', err);
      showNotification('error', 'Failed to generate Word document.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800">
      {/* Top Application Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shrink-0 px-4 py-2.5 flex items-center justify-between z-30 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                Cambridge Lesson Plan Generator
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/80">
                0862 Syllabus
              </span>
              <span className="hidden sm:inline-block text-[10px] text-slate-400">
                Semesta School • WASC EV-B3.1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
              Year {plan.kelas} (SMP) • Unit {plan.unit}: {plan.tittle_unit} • Lesson {plan.lesson} of {plan.total_lesson}
            </p>
          </div>
        </div>

        {/* Global Toolbar Buttons */}
        <div className="flex items-center gap-2">
          {/* Mobile view switcher */}
          <div className="flex md:hidden bg-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTabMobile('form')}
              className={`px-2.5 py-1 rounded-md ${
                activeTabMobile === 'form' ? 'bg-teal-700 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Form
            </button>
            <button
              onClick={() => setActiveTabMobile('preview')}
              className={`px-2.5 py-1 rounded-md ${
                activeTabMobile === 'preview' ? 'bg-teal-700 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Document
            </button>
          </div>

          <button
            onClick={() => setIsValidationOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors shadow-2xs"
            title="Inspect lesson plan quality and compliance report"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Audit Report</span>
          </button>

          <button
            onClick={handleQuickDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-xs transition-colors"
            title="Download Microsoft Word .docx"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .DOCX</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium border transition-all animate-bounce-short ${
            notification.type === 'success'
              ? 'bg-emerald-900 border-emerald-700 text-emerald-100'
              : notification.type === 'error'
              ? 'bg-rose-900 border-rose-700 text-rose-100'
              : 'bg-slate-900 border-slate-700 text-slate-100'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-emerald-400" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Two-Column Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Controls */}
        <div
          className={`w-full md:w-[46%] lg:w-[42%] bg-slate-50 border-r border-slate-200 overflow-y-auto ${
            activeTabMobile === 'form' ? 'block' : 'hidden md:block'
          } print:hidden`}
        >
          <LessonPlanForm
            plan={plan}
            onUpdatePlan={handleUpdatePlan}
            onGeneratePlan={handleGeneratePlan}
            isGenerating={isGenerating}
            onResetToDefault={handleResetToDefault}
          />
        </div>

        {/* Right Column: High-Fidelity Document Preview */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            activeTabMobile === 'preview' ? 'block' : 'hidden md:block'
          }`}
        >
          <DocumentPreview
            plan={plan}
            onUpdatePlan={handleUpdatePlan}
            onRegenerateSection={handleRegenerateSection}
            isRegenerating={isRegenerating}
            regeneratingSection={regeneratingSection}
          />
        </div>
      </div>

      {/* Quality Validation Modal */}
      <ValidationModal
        plan={plan}
        isOpen={isValidationOpen}
        onClose={() => setIsValidationOpen(false)}
      />
    </div>
  );
}
