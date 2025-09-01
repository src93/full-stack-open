type ImcCategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';

interface ImcRange {
  max: number;
  category: ImcCategory;
}

const imcRanges: ImcRange[] = [
  { max: 18.5, category: 'Underweight' },
  { max: 24.9, category: 'Normal weight' },
  { max: 29.9, category: 'Overweight' },
  { max: Infinity, category: 'Obesity' }
];

export const calculateImc = (height: number, weight: number): ImcCategory => {
  const imc: number = weight / (height * height);

  const range = imcRanges.find(range => imc < range.max);
  return range?.category || 'Obesity';
};