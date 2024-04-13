export const environment = process.env.NODE_ENV || "development";
export const isDev = environment === "development";
export const isProd = environment === "production";
export const intRedis = "redis://localhost:6379";
export const tursoLCL = "http://127.0.0.1:8080";
export const adminEmail = "mustaqim.arifin@gmail.com";
export const extRedis = process.env.UPSTASH!;
export const tursoURL = process.env.TURSO_URL as string;
export const tursoTKN = process.env.TURSO_TOKEN as string;

export const gitID = process.env.AUTH_GITHUB_ID as string;
export const gitSecret = process.env.AUTH_GITHUB_SECRET as string;
export const previews = true;

export const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

export const liveURL = "arifin.xyz";

export const CurrentENV = isProd ? `https://${liveURL}` : `http://localhost:3000`;
