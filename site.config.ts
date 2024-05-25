export const env = {
  title: '[ARIFIN-XYZ]',
  author: 'Mustaqim Arifin',
  headerTitle: 'arifin.xyz',
  description: 'Music Producer | Regional Marketing',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://arifin.xyz',
  siteRepo: 'https://github.com/mustaqimarifin/arifin-xyz',
  siteLogo: '/av3.png',
  socialBanner: '/og.png',
  email: 'mus@arifin.xyz',
  github: 'https://github.com/mustaqimarifin',
  twitter: 'https://twitter.com/vmprmyth',
  youtube: 'https://www.youtube.com/@akhyla9848',
  //linkedin: "https://www.linkedin.com",
  //threads: "https://www.threads.net",
  //instagram: "https://www.instagram.com",
  locale: 'en-US',
  intRedis: 'redis://localhost:6379',
  tursoLCL: 'http://127.0.0.1:8080',
  //pgLucia: process.env.PG_LUCIA as string,
  //gitIDLucia: process.env.GIT_ID_LUCIA as string,
  //gitSecretLucia: process.env.GIT_SECRET_LUCIA as string,
  postgrease: process.env.PG_LOCAL as string,
  pgPool: process.env.PG_NEON as string,
  pgDirect: process.env.PG_NEON_DIRECT as string,
  adminEmail: 'mustaqim.arifin@gmail.com',
  extRedis: process.env.UPSTASH,
  tursoURL: process.env.TURSO_URL,
  tursoTKN: process.env.TURSO_TOKEN,
  gitID: process.env.AUTH_GITHUB_ID as string,
  gitSecret: process.env.AUTH_GITHUB_SECRET as string,
  resendAdd: 'https://api.resend.com/emails',
  resendSecret: process.env.RESEND,
  resendAudience: process.env.RESEND_AUDIENCE_ID,
}
