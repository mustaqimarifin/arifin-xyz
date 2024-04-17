import { db } from "@/db";
import { views } from "@/db/schema";

export const revalidate = 86400;
export async function GET() {
	const res = await db.select().from(views);

	return Response.json(res);
}
