import React, { useState, useRef } from 'react';
import { LessonPlanData } from '../types/lessonPlan';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Edit3,
  Check,
  Sparkles,
  RefreshCw,
  Upload,
  FileCheck,
  FileText,
  AlertCircle,
} from 'lucide-react';
import {
  exportLessonPlanDocx,
  setCustomTemplate,
  hasCustomTemplate,
  clearCustomTemplate,
} from '../services/templateProcessor';

interface DocumentPreviewProps {
  plan: LessonPlanData;
  onUpdatePlan: (updated: Partial<LessonPlanData>) => void;
  onRegenerateSection: (section: 'fiveE' | 'differentiation' | 'waltWilf' | 'assessment') => void;
  isRegenerating: boolean;
  regeneratingSection: string | null;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  plan,
  onUpdatePlan,
  onRegenerateSection,
  isRegenerating,
  regeneratingSection,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<'all' | '1' | '2'>('all');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isCustomTemplateActive, setIsCustomTemplateActive] = useState<boolean>(hasCustomTemplate());
  const [customTemplateName, setCustomTemplateName] = useState<string | null>(null);
  const [templateNotice, setTemplateNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadDocx = async () => {
    try {
      setIsDownloading(true);
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
      console.error('Failed to export authoritative docx:', err);
      setTemplateNotice(`Export error: ${err.message || 'Could not generate Word document'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadRawTemplate = () => {
    const a = document.createElement('a');
    a.href = '/templates/Format_Lesson_Plan.docx';
    a.download = 'Format_Lesson_Plan.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUploadCustomDocx = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.docx')) {
      alert('Please upload a valid Microsoft Word (.docx) file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = event.target?.result as ArrayBuffer;
      if (buffer) {
        setCustomTemplate(buffer);
        setIsCustomTemplateActive(true);
        setCustomTemplateName(file.name);
        setTemplateNotice(`Custom authoritative template "${file.name}" loaded successfully.`);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleResetToAuthoritativeTemplate = () => {
    clearCustomTemplate();
    setIsCustomTemplateActive(false);
    setCustomTemplateName(null);
    setTemplateNotice('Reset to bundled authoritative Semesta School template.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100">
      {/* Document Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-2">
          {/* Page Selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setActivePage('all')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePage === 'all'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Pages
            </button>
            <button
              onClick={() => setActivePage('1')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePage === '1'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 1
            </button>
            <button
              onClick={() => setActivePage('2')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activePage === '2'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Page 2
            </button>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors border ${
              isEditing
                ? 'bg-amber-50 border-amber-300 text-amber-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle inline content editing directly in document preview"
          >
            {isEditing ? <Check className="w-3.5 h-3.5 text-amber-700" /> : <Edit3 className="w-3.5 h-3.5 text-slate-500" />}
            {isEditing ? 'Editing Mode' : 'Inline Edit'}
          </button>
        </div>

        {/* Template Status & Actions */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx"
            onChange={handleUploadCustomDocx}
            className="hidden"
          />

          <div className="hidden lg:flex items-center gap-1 text-[11px] bg-teal-50 text-teal-900 border border-teal-200 px-2.5 py-1 rounded-lg font-medium">
            <FileCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>
              {isCustomTemplateActive
                ? `Custom Template: ${customTemplateName}`
                : 'Format_Lesson_Plan.docx (Authoritative)'}
            </span>
            {isCustomTemplateActive && (
              <button
                onClick={handleResetToAuthoritativeTemplate}
                className="ml-1 text-teal-700 hover:text-teal-950 underline font-bold"
                title="Revert to bundled authoritative template"
              >
                Reset
              </button>
            )}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs"
            title="Upload custom Format_Lesson_Plan.docx template"
          >
            <Upload className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Upload DOCX</span>
          </button>

          <button
            onClick={handleDownloadRawTemplate}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium shadow-2xs"
            title="Download pristine blank template Format_Lesson_Plan.docx"
          >
            <FileText className="w-3 h-3 text-slate-500" />
            <span className="hidden sm:inline">Raw Template</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 p-0.5 text-xs text-slate-700">
            <button
              onClick={() => setZoom(Math.max(60, zoom - 10))}
              className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono font-medium">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(140, zoom + 10))}
              className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors shadow-2xs"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={handleDownloadDocx}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
            title="Export authoritative Microsoft Word .docx file with exact template formatting"
          >
            {isDownloading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Export .DOCX</span>
          </button>
        </div>
      </div>

      {/* Notice bar if any */}
      {templateNotice && (
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-1.5 text-xs text-teal-900 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
            <span>{templateNotice}</span>
          </div>
          <button
            onClick={() => setTemplateNotice(null)}
            className="text-teal-700 hover:text-teal-950 font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Document Viewport Container */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex flex-col items-center gap-8">
        {/* Printable & Preview Wrapper */}
        <div
          className="transition-transform origin-top flex flex-col gap-10"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* ================= PAGE 1 ================= */}
          {(activePage === 'all' || activePage === '1') && (
            <div className="w-[816px] min-h-[1056px] bg-white shadow-xl rounded-sm p-[48px] text-[11px] leading-tight font-sans text-slate-800 flex flex-col justify-between border border-slate-200 select-text relative">
              {/* Page 1 Header */}
              <div>
                <div className="border-b-2 border-teal-800 pb-1.5 mb-3 flex items-center justify-between text-[9.5px] font-bold text-slate-600 tracking-wide uppercase">
                  <span>SEMESTA SCHOOL | EV-B3.1 | Lesson Plans | WASC Initial Report 2026-2027</span>
                  <span className="text-teal-800 font-semibold lowercase">page 1</span>
                </div>

                {/* Main Title */}
                <div className="border-b-2 border-teal-800 pb-1 mb-3">
                  <h1 className="text-[17px] font-bold text-teal-900 tracking-tight flex items-center gap-2">
                    Lesson Plan: Cambridge Lower Secondary Mathematics —{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        value={plan.tittle_unit}
                        onChange={(e) => onUpdatePlan({ tittle_unit: e.target.value })}
                        className="bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5 text-teal-900 font-bold flex-1"
                      />
                    ) : (
                      <span className="text-teal-800 underline decoration-teal-700 underline-offset-2">
                        {plan.tittle_unit || 'Untitled Unit'}
                      </span>
                    )}
                  </h1>
                </div>

                {/* Table 1: Lesson Information Banner */}
                <div className="border border-slate-300 rounded-xs overflow-hidden mb-3.5 shadow-2xs">
                  {/* Banner */}
                  <div className="bg-[#006064] text-white px-3 py-2 text-center">
                    <div className="text-[13px] font-bold tracking-wide">
                      Cambridge Lower Secondary Mathematics (0862)
                    </div>
                    <div className="text-[10px] text-teal-100 mt-0.5">
                      Unit {plan.unit}: {plan.tittle_unit} | Lesson {plan.lesson} of {plan.total_lesson}
                    </div>
                  </div>

                  {/* Grid Rows */}
                  <div className="grid grid-cols-4 divide-x divide-slate-300 bg-slate-50 text-[10px] border-b border-slate-300">
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Year Group</span>
                      <span>Year {plan.kelas} (SMP)</span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Lesson</span>
                      <span>
                        {plan.lesson} / {plan.total_lesson}
                      </span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Duration</span>
                      <span>{plan.duration}</span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Date</span>
                      <span>
                        {plan.date_L} / {plan.month_L} / {plan.year_L}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 divide-x divide-slate-300 bg-white text-[10px]">
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Teacher</span>
                      <span>{plan.teacher}</span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Department</span>
                      <span>{plan.department}</span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Syllabus</span>
                      <span className="text-[9.5px] leading-tight block">{plan.syllabus}</span>
                    </div>
                    <div className="p-1.5">
                      <span className="font-bold text-teal-900 block text-[9.5px]">Cambridge AOs</span>
                      <div className="text-[9px] leading-snug text-slate-700">
                        <div>
                          <strong className="text-teal-900">AO1</strong> {plan.AO1};
                        </div>
                        <div>
                          <strong className="text-teal-900">AO2</strong> {plan.AO2};
                        </div>
                        <div>
                          <strong className="text-teal-900">AO3</strong> {plan.AO3};
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Table 2: WALT, WILF, SLO Integration */}
                <div className="relative mb-3.5">
                  <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
                    <div className="grid grid-cols-3 bg-[#006064] text-white divide-x divide-teal-800 text-center py-1">
                      <div>
                        <div className="font-bold text-[11px]">WALT</div>
                        <div className="text-[9px] text-teal-100">We Are Learning To</div>
                      </div>
                      <div>
                        <div className="font-bold text-[11px]">WILF</div>
                        <div className="text-[9px] text-teal-100">What I'm Looking For</div>
                      </div>
                      <div>
                        <div className="font-bold text-[11px]">SLO Integration</div>
                        <div className="text-[9px] text-teal-100">Schoolwide Learner Outcomes</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-slate-300 bg-white p-2 gap-2 text-[10px] leading-relaxed">
                      {/* WALT */}
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1">
                          <span className="text-teal-800 font-bold">•</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.LO_1}
                              onChange={(e) => onUpdatePlan({ LO_1: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.LO_1}</span>
                          )}
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="text-teal-800 font-bold">•</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.LO_2}
                              onChange={(e) => onUpdatePlan({ LO_2: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.LO_2}</span>
                          )}
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="text-teal-800 font-bold">•</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.LO_3}
                              onChange={(e) => onUpdatePlan({ LO_3: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.LO_3}</span>
                          )}
                        </div>
                      </div>

                      {/* WILF */}
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1 text-slate-800">
                          <span className="text-emerald-700 font-bold">✔</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.WILF_1}
                              onChange={(e) => onUpdatePlan({ WILF_1: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.WILF_1}</span>
                          )}
                        </div>
                        <div className="flex items-start gap-1 text-slate-800">
                          <span className="text-emerald-700 font-bold">✔</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.WILF_2}
                              onChange={(e) => onUpdatePlan({ WILF_2: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.WILF_2}</span>
                          )}
                        </div>
                        <div className="flex items-start gap-1 text-slate-800">
                          <span className="text-emerald-700 font-bold">✔</span>
                          {isEditing ? (
                            <textarea
                              rows={2}
                              value={plan.WILF_3}
                              onChange={(e) => onUpdatePlan({ WILF_3: e.target.value })}
                              className="w-full text-[9.5px] p-1 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.WILF_3}</span>
                          )}
                        </div>
                      </div>

                      {/* SLO with Green Stars matching original template */}
                      <div className="space-y-1 text-[9.5px]">
                        <div>
                          <strong className="text-emerald-800">★ SLO-1 Confident —</strong>{' '}
                          {isEditing ? (
                            <input
                              type="text"
                              value={plan.SLO_1}
                              onChange={(e) => onUpdatePlan({ SLO_1: e.target.value })}
                              className="w-full text-[9px] p-0.5 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.SLO_1}</span>
                          )}
                        </div>
                        <div>
                          <strong className="text-emerald-800">★ SLO-2 Responsible —</strong>{' '}
                          {isEditing ? (
                            <input
                              type="text"
                              value={plan.SLO_2}
                              onChange={(e) => onUpdatePlan({ SLO_2: e.target.value })}
                              className="w-full text-[9px] p-0.5 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.SLO_2}</span>
                          )}
                        </div>
                        <div>
                          <strong className="text-emerald-800">★ SLO-3 Reflective —</strong>{' '}
                          {isEditing ? (
                            <input
                              type="text"
                              value={plan.SLO_3}
                              onChange={(e) => onUpdatePlan({ SLO_3: e.target.value })}
                              className="w-full text-[9px] p-0.5 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.SLO_3}</span>
                          )}
                        </div>
                        <div>
                          <strong className="text-emerald-800">★ SLO-4 Innovative —</strong>{' '}
                          {isEditing ? (
                            <input
                              type="text"
                              value={plan.SLO_4}
                              onChange={(e) => onUpdatePlan({ SLO_4: e.target.value })}
                              className="w-full text-[9px] p-0.5 border rounded bg-amber-50"
                            />
                          ) : (
                            <span>{plan.SLO_4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRegenerateSection('waltWilf')}
                    disabled={isRegenerating}
                    className="absolute -top-2 -right-2 bg-teal-700 text-white p-1 rounded-full shadow hover:bg-teal-800 text-[10px] flex items-center gap-1 px-2 print:hidden"
                    title="Regenerate WALT, WILF & SLOs"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Regen</span>
                  </button>
                </div>

                {/* Language Objectives (CLIL) Box */}
                <div className="border border-[#006064] bg-[#E0F7FA] rounded-xs p-2 mb-3.5 text-[9.5px] leading-tight">
                  <strong className="text-[#006064] font-bold">Language Objectives (CLIL):</strong> Key terms:{' '}
                  {isEditing ? (
                    <input
                      type="text"
                      value={plan.keyword}
                      onChange={(e) => onUpdatePlan({ keyword: e.target.value })}
                      className="w-full mt-1 p-1 bg-white border border-teal-400 rounded text-[9.5px]"
                    />
                  ) : (
                    <span className="font-medium text-slate-900">{plan.keyword}</span>
                  )}
                  . <span className="text-slate-600 italic">EAL students: bilingual vocabulary mat provided (English–Bahasa Indonesia).</span>
                </div>

                {/* Differentiation Provisions */}
                <div className="mb-3.5 relative">
                  <h3 className="text-[12px] font-bold text-teal-900 mb-1">Differentiation Provisions</h3>
                  <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
                    <div className="grid grid-cols-4 text-white text-center text-[10px] font-bold divide-x divide-slate-400/40">
                      <div className="bg-[#2E5496] py-1 px-1">
                        <div>Struggled Scaffolding</div>
                      </div>
                      <div className="bg-[#006064] py-1 px-1">
                        <div>EAL Support</div>
                        <div className="text-[8px] font-normal text-teal-100">English as Additional Language</div>
                      </div>
                      <div className="bg-[#C62828] py-1 px-1">
                        <div>SEN Scaffolding</div>
                        <div className="text-[8px] font-normal text-red-100">Additional Learning Needs</div>
                      </div>
                      <div className="bg-[#4A148C] py-1 px-1">
                        <div>Extension Tasks</div>
                        <div className="text-[8px] font-normal text-purple-100">High-Achieving Students</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 divide-x divide-slate-300 bg-white p-2 text-[9px] leading-relaxed">
                      {/* Struggled */}
                      <div className="space-y-1">
                        <div>● {plan.struggledscaff_1}</div>
                        <div>● {plan.struggledscaff_2}</div>
                        <div>● {plan.struggledscaff_3}</div>
                      </div>
                      {/* EAL */}
                      <div className="space-y-1">
                        <div>• {plan.ealsupport_1}</div>
                        <div>• {plan.ealsupport_2}</div>
                        <div>• {plan.ealsupport_3}</div>
                      </div>
                      {/* SEN */}
                      <div className="space-y-1">
                        <div>• {plan.senscaff_1}</div>
                        <div>• {plan.senscaff_2}</div>
                        <div>• {plan.senscaff_3}</div>
                      </div>
                      {/* Extension */}
                      <div className="space-y-1">
                        <div>• {plan.extensiontask_1}</div>
                        <div>• {plan.extensiontask_2}</div>
                        <div>• {plan.extensiontask_3}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRegenerateSection('differentiation')}
                    disabled={isRegenerating}
                    className="absolute -top-2 -right-2 bg-indigo-700 text-white p-1 rounded-full shadow hover:bg-indigo-800 text-[10px] flex items-center gap-1 px-2 print:hidden"
                    title="Regenerate Differentiation Provisions"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Regen</span>
                  </button>
                </div>

                {/* Lesson Sequence — 5E Instructional Model */}
                <div className="mb-3.5 relative">
                  <h3 className="text-[12px] font-bold text-teal-900 mb-1">Lesson Sequence — 5E Instructional Model</h3>
                  <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
                    <div className="grid grid-cols-12 bg-[#006064] text-white text-[10px] font-bold py-1 px-2 text-center divide-x divide-teal-800">
                      <div className="col-span-2">Phase</div>
                      <div className="col-span-1">Time</div>
                      <div className="col-span-6">Teacher and Student Activity</div>
                      <div className="col-span-3">Assessment / SLO</div>
                    </div>

                    <div className="divide-y divide-slate-300 text-[9.5px]">
                      {/* Engage */}
                      <div className="grid grid-cols-12 divide-x divide-slate-300 bg-white">
                        <div className="col-span-2 bg-[#006064] text-white font-bold p-1.5 flex items-center justify-center">
                          Engage
                        </div>
                        <div className="col-span-1 p-1.5 text-center font-semibold text-slate-700 flex items-center justify-center">
                          {plan.engage_t} min
                        </div>
                        <div className="col-span-6 p-1.5 leading-snug text-slate-800">
                          {plan.engage}
                        </div>
                        <div className="col-span-3 p-1.5 space-y-0.5 text-[8.5px] leading-tight text-slate-700">
                          <div>
                            <span className="text-teal-800 font-bold">▶</span> {plan.assessment_engage1}
                          </div>
                          <div>
                            <span className="text-teal-800 font-bold">▶</span> {plan.assessment_engage2}
                          </div>
                          <div>
                            <span className="text-teal-800 font-bold">▶</span> {plan.assessment_engage3}
                          </div>
                        </div>
                      </div>

                      {/* Explore */}
                      <div className="grid grid-cols-12 divide-x divide-slate-300 bg-white">
                        <div className="col-span-2 bg-[#00838F] text-white font-bold p-1.5 flex items-center justify-center">
                          Explore
                        </div>
                        <div className="col-span-1 p-1.5 text-center font-semibold text-slate-700 flex items-center justify-center">
                          {plan.explore_t} min
                        </div>
                        <div className="col-span-6 p-1.5 leading-snug text-slate-800">
                          {plan.explore}
                        </div>
                        <div className="col-span-3 p-1.5 space-y-0.5 text-[8.5px] leading-tight text-slate-700">
                          <div>
                            <span className="text-[#00838F] font-bold">▶</span> {plan.assessment_explore1}
                          </div>
                          <div>
                            <span className="text-[#00838F] font-bold">▶</span> {plan.assessment_explore2}
                          </div>
                          <div>
                            <span className="text-[#00838F] font-bold">▶</span> {plan.assessment_explore3}
                          </div>
                        </div>
                      </div>

                      {/* Explain */}
                      <div className="grid grid-cols-12 divide-x divide-slate-300 bg-white">
                        <div className="col-span-2 bg-[#2E5496] text-white font-bold p-1.5 flex items-center justify-center">
                          Explain
                        </div>
                        <div className="col-span-1 p-1.5 text-center font-semibold text-slate-700 flex items-center justify-center">
                          {plan.explain_t} min
                        </div>
                        <div className="col-span-6 p-1.5 leading-snug text-slate-800">
                          {plan.explain}
                        </div>
                        <div className="col-span-3 p-1.5 space-y-0.5 text-[8.5px] leading-tight text-slate-700">
                          <div>
                            <span className="text-[#2E5496] font-bold">▶</span> {plan.assessment_explain1}
                          </div>
                          <div>
                            <span className="text-[#2E5496] font-bold">▶</span> {plan.assessment_explain2}
                          </div>
                          <div>
                            <span className="text-[#2E5496] font-bold">▶</span> {plan.assessment_explain3}
                          </div>
                        </div>
                      </div>

                      {/* Elaborate */}
                      <div className="grid grid-cols-12 divide-x divide-slate-300 bg-white">
                        <div className="col-span-2 bg-[#E65100] text-white font-bold p-1.5 flex items-center justify-center">
                          Elaborate
                        </div>
                        <div className="col-span-1 p-1.5 text-center font-semibold text-slate-700 flex items-center justify-center">
                          {plan.elaborate_t} min
                        </div>
                        <div className="col-span-6 p-1.5 leading-snug text-slate-800">
                          {plan.elaborate}
                        </div>
                        <div className="col-span-3 p-1.5 space-y-0.5 text-[8.5px] leading-tight text-slate-700">
                          <div>
                            <span className="text-[#E65100] font-bold">▶</span> {plan.assessment_elaborate1}
                          </div>
                          <div>
                            <span className="text-[#E65100] font-bold">▶</span> {plan.assessment_elaborate2}
                          </div>
                          <div>
                            <span className="text-[#E65100] font-bold">▶</span> {plan.assessment_elaborate3}
                          </div>
                        </div>
                      </div>

                      {/* Evaluate */}
                      <div className="grid grid-cols-12 divide-x divide-slate-300 bg-white">
                        <div className="col-span-2 bg-[#2E7D32] text-white font-bold p-1.5 flex items-center justify-center">
                          Evaluate
                        </div>
                        <div className="col-span-1 p-1.5 text-center font-semibold text-slate-700 flex items-center justify-center">
                          {plan.evaluate_t} min
                        </div>
                        <div className="col-span-6 p-1.5 leading-snug text-slate-800">
                          {plan.evaluate}
                        </div>
                        <div className="col-span-3 p-1.5 space-y-0.5 text-[8.5px] leading-tight text-slate-700">
                          <div>
                            <span className="text-[#2E7D32] font-bold">▶</span> {plan.assessment_evaluate1}
                          </div>
                          <div>
                            <span className="text-[#2E7D32] font-bold">▶ Exit ticket (AO1/AO2/AO3).</span>{' '}
                            {plan.assessment_evaluate2}
                          </div>
                          <div>
                            <span className="text-[#2E7D32] font-bold">▶</span> {plan.assessment_evaluate3}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRegenerateSection('fiveE')}
                    disabled={isRegenerating}
                    className="absolute -top-2 -right-2 bg-emerald-700 text-white p-1 rounded-full shadow hover:bg-emerald-800 text-[10px] flex items-center gap-1 px-2 print:hidden"
                    title="Regenerate 5E Sequence"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Regen</span>
                  </button>
                </div>
              </div>

              {/* Page 1 Footer */}
              <div className="pt-2 border-t border-slate-300 text-center text-[8.5px] text-slate-500 italic flex items-center justify-between">
                <span>Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3</span>
                <span className="font-mono not-italic text-slate-400">1 / 2</span>
              </div>
            </div>
          )}

          {/* ================= PAGE 2 ================= */}
          {(activePage === 'all' || activePage === '2') && (
            <div className="w-[816px] min-h-[1056px] bg-white shadow-xl rounded-sm p-[48px] text-[11px] leading-tight font-sans text-slate-800 flex flex-col justify-between border border-slate-200 select-text relative">
              {/* Page 2 Header */}
              <div>
                <div className="border-b-2 border-teal-800 pb-1.5 mb-4 flex items-center justify-between text-[9.5px] font-bold text-slate-600 tracking-wide uppercase">
                  <span>SEMESTA SCHOOL | EV-B3.1 | Lesson Plans | WASC Initial Report 2026-2027</span>
                  <span className="text-teal-800 font-semibold lowercase">page 2</span>
                </div>

                {/* Formative Assessment, Homework, and Teacher Reflection */}
                <div className="mb-4 relative">
                  <h3 className="text-[12px] font-bold text-teal-900 mb-1">
                    Formative Assessment, Homework, and Teacher Reflection
                  </h3>
                  <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
                    <div className="grid grid-cols-3 text-white text-[10px] font-bold divide-x divide-slate-400/40 text-center">
                      <div className="bg-[#006064] py-1 px-1">
                        <div>Formative Assessment (in class)</div>
                      </div>
                      <div className="bg-[#2E5496] py-1 px-1">
                        <div>Homework / Next Lesson (outside class)</div>
                      </div>
                      <div className="bg-[#334155] py-1 px-1">
                        <div>Teacher Post-Lesson Reflection</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-slate-300 bg-white p-2 text-[9.5px] leading-relaxed">
                      {/* Formative */}
                      <div className="space-y-1">
                        <div>• {plan.formative_1}</div>
                        <div>• {plan.formative_2}</div>
                        <div>• {plan.formative_3}</div>
                        <div className="font-semibold text-teal-900">
                          • Exit ticket: AO1/AO2/AO3 (Evaluate — informs next lesson)
                        </div>
                      </div>

                      {/* Homework */}
                      <div className="space-y-1">
                        <div>• {plan.nextlesson_1}</div>
                        <div>• {plan.nextlesson_2}</div>
                        <div>• {plan.nextlesson_3}</div>
                      </div>

                      {/* Reflection */}
                      <div className="space-y-1 text-slate-600 italic">
                        <div>{plan.postlesson_1}</div>
                        <div>{plan.postlesson_2}</div>
                        <div>{plan.postlesson_3}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRegenerateSection('assessment')}
                    disabled={isRegenerating}
                    className="absolute -top-2 -right-2 bg-slate-700 text-white p-1 rounded-full shadow hover:bg-slate-800 text-[10px] flex items-center gap-1 px-2 print:hidden"
                    title="Regenerate Assessment & Reflection"
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Regen</span>
                  </button>
                </div>

                {/* Resource List */}
                <div className="mb-4">
                  <h3 className="text-[12px] font-bold text-blue-800 mb-1">Resource List</h3>
                  <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
                    <div className="grid grid-cols-12 bg-[#2563EB] text-white text-[10px] font-bold py-1 px-2 divide-x divide-blue-400">
                      <div className="col-span-3">Type</div>
                      <div className="col-span-5">Resource Name</div>
                      <div className="col-span-4">Location / Access</div>
                    </div>

                    <div className="divide-y divide-slate-300 text-[9.5px]">
                      <div className="grid grid-cols-12 divide-x divide-slate-300 p-1.5 bg-slate-50">
                        <div className="col-span-3 font-semibold text-slate-800">Digital</div>
                        <div className="col-span-5">IFP Presentation</div>
                        <div className="col-span-4 text-slate-700">{plan.slide}</div>
                      </div>
                      <div className="grid grid-cols-12 divide-x divide-slate-300 p-1.5 bg-white">
                        <div className="col-span-3 font-semibold text-slate-800">Textbook</div>
                        <div className="col-span-5">Cambridge Lower Secondary Mathematics {plan.LB}</div>
                        <div className="col-span-4 text-slate-700">Student copies — class set in bookshelf</div>
                      </div>
                      <div className="grid grid-cols-12 divide-x divide-slate-300 p-1.5 bg-slate-50">
                        <div className="col-span-3 font-semibold text-slate-800">ASP/SEN</div>
                        <div className="col-span-5">Individual Support Plans</div>
                        <div className="col-span-4 text-slate-500 italic">Teacher locked drawer — do not distribute</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STQS Alignment */}
                <div className="border border-teal-700 bg-teal-50/50 rounded-xs p-2.5 mb-6 text-[9px] text-slate-800 leading-normal">
                  <strong className="text-teal-900 font-bold">STQS Alignment:</strong> Domain 1 (Cambridge AOs) | Domain 2 (WALT/WILF, three-tier differentiation) | Domain 4 (5E model, higher-order questioning) | Domain 5 (Five embedded formative assessment points)
                </div>

                {/* Teacher and HoD Review Approval Box */}
                <div className="border border-slate-300 rounded-xs overflow-hidden shadow-2xs mb-6">
                  <div className="grid grid-cols-2 text-white font-bold text-[10px] divide-x divide-slate-400">
                    <div className="bg-[#006064] p-1.5 text-center">Teacher</div>
                    <div className="bg-[#2E5496] p-1.5 text-center">Head of Department — Science</div>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-slate-300 text-[10px] p-3 bg-white">
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-600 block text-[9px]">Teacher Signature:</span>
                        <span className="italic font-serif text-[13px] text-teal-950 font-medium">
                          {plan.teacher || 'Niswa Ajilla, S.Mat'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">Submitted to Edunav:</span>{' '}
                        <span className="font-medium text-slate-800">
                          {plan.date_s} / {plan.month_s} / {plan.year_s}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pl-3">
                      <div className="flex items-center gap-4 text-[9.5px]">
                        <span className="font-semibold text-slate-700">HoD review:</span>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!plan.hodReviewApproved}
                            onChange={(e) => onUpdatePlan({ hodReviewApproved: e.target.checked })}
                            className="rounded text-teal-800"
                          />
                          <span>Approved</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!plan.hodReviewFeedback}
                            onChange={(e) => onUpdatePlan({ hodReviewFeedback: e.target.checked })}
                            className="rounded text-teal-800"
                          />
                          <span>Feedback provided</span>
                        </label>
                      </div>

                      <div className="text-[9.5px] text-slate-600 pt-1">
                        <div>HoD Signature: _______________________</div>
                        <div className="mt-1">Date: ___ / ___ / ________</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page 2 Footer */}
              <div className="pt-2 border-t border-slate-300 text-center text-[8.5px] text-slate-500 italic flex items-center justify-between">
                <span>Cambridge International Education | WASC Evidence | Criteria B.3, B.1, C.3</span>
                <span className="font-mono not-italic text-slate-400">2 / 2</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
