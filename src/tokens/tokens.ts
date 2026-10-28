/**
 * Design tokens — single source of truth.
 *
 * Two tiers:
 *   1. `primitive` — raw values (the palette, the scale). Never referenced by components.
 *   2. `semantic`  — intent-named aliases that components consume (`--color-action`, not `--oxblood-700`).
 *
 * `toCss()` flattens both tiers into custom properties on :root; the styleguide reads the
 * same objects to render swatches, so documentation can't drift from what ships.
 */

export const primitive = {
  color: {
    // Brand reds, anchored on the existing #780B0B
    'oxblood-50': '#FBF4F4',
    'oxblood-100': '#F4E4E3',
    'oxblood-200': '#E6C3C1',
    'oxblood-400': '#B4504C',
    'oxblood-600': '#8F1A17',
    'oxblood-700': '#780B0B',
    'oxblood-800': '#5A0707',
    'oxblood-900': '#3D0303',
    // Saint Lucia flag gold — used on dark grounds only
    'gold-300': '#F2D27E',
    'gold-500': '#E8B84A',
    // Neutrals, warmed a touch toward the red so greys don't go blue next to oxblood
    'ink-900': '#1F1A1A',
    'ink-700': '#3F3737',
    'ink-500': '#6B6262',
    'ink-300': '#B9B0AF',
    'ink-100': '#E9E4E3',
    'paper': '#FFFFFF',
    // Feedback
    'green-700': '#1F6B47',
    'green-50': '#EAF5EF',
    'amber-700': '#8A5A00',
  },
  font: {
    serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
    sans: "'Public Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  // Modular scale, ratio 1.25 (major third) from 1.0625rem body
  size: {
    '-2': '0.75rem',
    '-1': '0.875rem',
    '0': '1.0625rem',
    '1': '1.3125rem',
    '2': '1.625rem',
    '3': '2.0625rem',
    '4': '2.5625rem',
    '5': 'clamp(2.5rem, 1.6rem + 3.6vw, 4rem)',
    '6': 'clamp(2.875rem, 1.5rem + 5.2vw, 5.5rem)',
  },
  // 4px base grid
  space: {
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.5rem',
    '6': '2rem',
    '7': '3rem',
    '8': '4rem',
    '9': '6rem',
    '10': '8rem',
  },
  radius: {
    sm: '4px',
    md: '8px',
    pill: '999px',
  },
} as const;

const c = (name: keyof typeof primitive.color) => `var(--${name})`;

export const semantic = {
  color: {
    'surface': c('paper'),
    'surface-tint': c('oxblood-50'),
    'surface-sunken': c('oxblood-100'),
    'surface-inverse': c('oxblood-900'),
    'text': c('ink-900'),
    'text-muted': c('ink-500'),
    'text-inverse': c('paper'),
    'text-inverse-muted': c('oxblood-200'),
    'heading': c('oxblood-900'),
    'action': c('oxblood-700'),
    'action-hover': c('oxblood-800'),
    'action-text': c('paper'),
    'accent-on-dark': c('gold-500'),
    'border': c('ink-100'),
    'border-strong': c('ink-300'),
    'focus': c('gold-500'),
    'success': c('green-700'),
    'success-surface': c('green-50'),
    'rating': c('amber-700'),
  },
  font: {
    'heading': 'var(--font-serif)',
    'body': 'var(--font-sans)',
  },
  leading: {
    tight: '1.1',
    snug: '1.3',
    body: '1.6',
  },
  measure: {
    prose: '66ch',
    narrow: '48ch',
  },
  layout: {
    'container': '76rem',
    'gutter': 'clamp(1rem, 4vw, 2.5rem)',
    'section-y': 'clamp(4rem, 8vw, 7.5rem)',
  },
  shadow: {
    raised: '0 1px 2px rgb(61 3 3 / 0.06), 0 8px 24px -12px rgb(61 3 3 / 0.18)',
  },
  motion: {
    fast: '120ms',
    base: '220ms',
    ease: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
  },
} as const;

/** Flatten tokens into a `:root { … }` block. */
export function toCss(): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(primitive.color)) lines.push(`--${k}: ${v};`);
  for (const [k, v] of Object.entries(primitive.font)) lines.push(`--font-${k}: ${v};`);
  for (const [k, v] of Object.entries(primitive.size)) lines.push(`--size-${k}: ${v};`);
  for (const [k, v] of Object.entries(primitive.space)) lines.push(`--space-${k}: ${v};`);
  for (const [k, v] of Object.entries(primitive.radius)) lines.push(`--radius-${k}: ${v};`);
  for (const [group, values] of Object.entries(semantic)) {
    for (const [k, v] of Object.entries(values)) lines.push(`--${group}-${k}: ${v};`);
  }
  return `:root{${lines.join('')}}`;
}
