/**
 * Timing utilities for Cambridge Lesson Plan
 * Handles time range calculations (e.g. "0-10 minutes", "10-35 minutes")
 * and ensures strict "minutes" notation across the application and exports.
 */

export function parsePhaseMinutes(val: string | undefined | null, defaultVal: number = 0): number {
  if (!val) return defaultVal;
  const str = String(val).trim();

  // Match range pattern like "0-10 minutes", "10 - 25 min", "20–75"
  const rangeMatch = str.match(/(\d+)\s*[-–—]\s*(\d+)/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1], 10);
    const end = parseInt(rangeMatch[2], 10);
    return Math.max(0, end - start);
  }

  // Match single number like "10", "10 minutes", "10 min"
  const singleMatch = str.match(/\d+/);
  return singleMatch ? parseInt(singleMatch[0], 10) : defaultVal;
}

export function parseTotalMinutes(duration: string | undefined | null, defaultVal: number = 80): number {
  if (!duration) return defaultVal;
  const match = String(duration).match(/\d+/);
  return match ? parseInt(match[0], 10) : defaultVal;
}

export function formatPhaseTimeRange(
  phase: 'engage' | 'explore' | 'explain' | 'elaborate' | 'evaluate',
  data: {
    duration?: string;
    engage_t?: string;
    explore_t?: string;
    explain_t?: string;
    elaborate_t?: string;
    evaluate_t?: string;
    tittle_unit?: string;
  }
): string {
  const currentVal = data[`${phase}_t` as keyof typeof data];
  const str = currentVal ? String(currentVal).trim() : '';

  // If already explicitly formatted as a range, normalize unit to "minutes"
  const explicitRangeMatch = str.match(/^(\d+)\s*[-–—]\s*(\d+)(?:\s*(?:minutes?|mins?))?$/i);
  if (explicitRangeMatch) {
    return `${explicitRangeMatch[1]}-${explicitRangeMatch[2]} minutes`;
  }

  // Otherwise calculate cumulative elapsed timing based on phase durations
  const isUnitTest = (data.tittle_unit || '').toLowerCase().includes('unit test');
  const engDur = parsePhaseMinutes(data.engage_t, isUnitTest ? 20 : 10);
  const expDur = parsePhaseMinutes(data.explore_t, isUnitTest ? 0 : 25);
  const explDur = parsePhaseMinutes(data.explain_t, isUnitTest ? 0 : 15);
  const elabDur = parsePhaseMinutes(data.elaborate_t, isUnitTest ? 55 : 20);
  const evalDur = parsePhaseMinutes(data.evaluate_t, isUnitTest ? 5 : 10);

  const t0 = 0;
  const t1 = t0 + engDur;
  const t2 = t1 + expDur;
  const t3 = t2 + explDur;
  const t4 = t3 + elabDur;
  const t5 = t4 + evalDur;

  switch (phase) {
    case 'engage':
      return `${t0}-${t1} minutes`;
    case 'explore':
      return `${t1}-${t2} minutes`;
    case 'explain':
      return `${t2}-${t3} minutes`;
    case 'elaborate':
      return `${t3}-${t4} minutes`;
    case 'evaluate':
      return `${t4}-${t5} minutes`;
  }
}

export function formatDurationDisplay(duration: string | undefined | null): string {
  if (!duration) return '80 minutes';
  const mins = parseTotalMinutes(duration, 80);
  return `${mins} minutes`;
}
