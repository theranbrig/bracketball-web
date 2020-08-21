export const tokenName = 'firebaseToken';

const dev = process.env.NODE_ENV === 'development';

export const server = dev ? 'http://localhost:3000' : 'https://bracketball.vercel.app/';
