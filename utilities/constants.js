export const tokenName = 'firebaseToken';

const dev = process.env.NODE_ENV === 'development';

export const server = dev ? 'http://localhost:3000' : 'https://bracketball.vercel.app/';

export const tournamentTypes = [
  { value: 'pool', label: 'Standard Pool' },
  { value: 'seed', label: 'Seed Pool' },
  { value: 'random', label: 'Random' },
];

export const playerNumbers = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
];
