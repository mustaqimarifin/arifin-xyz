import { ViewCounter } from "../notes/view-counter";
import { increment } from "../db/actions";
import { rdx } from "../db/redis";
//import { getViewsCount } from "../db/queries";

export async function AddViews({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;

  increment(slug);
  return <ViewCounter views={views} />;
}

export async function Views({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;

  return <ViewCounter views={views} />;
}

/* export async function TViews({ slug }: { slug: string }) {
  let views = await getViewsCount();
  inc(slug);
  return <TCounter allViews={views} slug={slug} />;
}
 */
