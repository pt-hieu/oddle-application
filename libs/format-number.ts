export const compactFormat = Intl.NumberFormat('en', {
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
}).format;

export const normalFormat = Intl.NumberFormat('en', {
  notation: 'standard',
}).format;
