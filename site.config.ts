const isProduction = process.env.NODE_ENV === "production";
export const env = {
	intRedis: "redis://localhost:6379",

	tursoLCL: "http://127.0.0.1:8080",
	adminEmail: "mustaqim.arifin@gmail.com",
	extRedis: process.env.UPSTASH!,
	tursoURL: process.env.TURSO_URL as string,
	tursoTKN: process.env.TURSO_TOKEN as string,
	gitID: process.env.AUTH_GITHUB_ID as string,
	gitSecret: process.env.AUTH_GITHUB_SECRET as string,
};
