import ViewCounter, { TViewCounter } from "../notes/view-counter";
import { getViews, increment, ink } from "../db/actions";
import { rdx } from "../db/redis";
import { cache } from "react";

let inc = cache(increment);
export async function AddViews({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;
  inc(slug);
  return <ViewCounter views={views} />;
}
export async function Views({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;
  return <ViewCounter views={views} />;
}

export async function TViews({ slug }: { slug: string }) {
  const views = await getViews()
  return <TViewCounter allViews={views} slug={slug} />;
}

export async function TADDViews({ slug }: { slug: string }) {
  ink(slug)
  const views = await getViews()
  return <TViewCounter allViews={views} slug={slug} />;
}
