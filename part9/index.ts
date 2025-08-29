import { calculateImc } from './calculateBmi';

const imc = calculateImc(1.85, 110);
console.log(`IMC category: ${imc}`);
