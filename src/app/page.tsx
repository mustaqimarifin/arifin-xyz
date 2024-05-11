import { HomePageNav } from "@/components/client";
import slow from "next/dynamic";

const HomeBG = slow(
  () => import("@/components/client").then((mod) => mod.HomeBG),
  {
    ssr: false,
  },
);

export default function Page() {
  return (
    <section>
      <HomePageNav />
      <HomeBG />
    </section>
  );
}
