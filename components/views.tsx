"use server";
import { TViewCounter, ViewCounter } from "../app/(site)/notes/view-counter";
import { getViews, ink } from "../db/actions";

//let inc = cache(ink);
/* export async function AddViews({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;
  inc(slug);
  return <ViewCounter views={views} />;
}
export async function Views({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;
  return <ViewCounter views={views} />;
}
 */
export async function TViews({ slug }: { slug: string }) {
	const views = await getViews();
	return <TViewCounter allViews={views} slug={slug} />;
}

export async function TADDViews({ slug }: { slug: string }) {
	const views = await ink(slug);
	//const views = await getViewsCount();
	return <ViewCounter views={views} />;
}