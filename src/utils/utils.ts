export const toWookiee = (s: string) => s.split('').reverse().join('');

export const getValue = (val: string | undefined, language: 'en' | 'wookiee') => {
  if (!val) return '';
  return language === 'wookiee' ? toWookiee(val) : val;
};
