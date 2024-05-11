import styles from "$$/page/work.module.css";
import { Header, Link } from "@/components/server";
import MDXLayout from "@/layouts/mdxLayout";
import type { Metadata } from "next";
const title = "Work";
const description = "Career Slices...";

export const metadata: Metadata = {
  title,
  description,
};
export default function WorkPage() {
  return (
    <section>
      <Header title={title} description={description} />
      <MDXLayout>
        <p>
          On a mission to build products developers{" "}
          <Link href="/notes/developer-experience-examples">love</Link>, and
          along the way, teach the next generation of developers. Here's a
          summary of my work so far.
        </p>
        <hr className={styles["ja-rule"]} />
        <h2 className={styles.firm}>Vercel</h2>

        <div className={styles.position}>VP of Product</div>
        <div className={styles.summary}>
          I joined <a href="https://vercel.com/home">Vercel</a> early to grow{" "}
          <a href="https://nextjs.org">Next.js</a> and our developer community.
          I built our Developer Relations team to teach our community about our
          products.
        </div>
        <ul>
          <li>
            In 2021, I was promoted to Director of DevRel. We{" "}
            <a href="https://twitter.com/kelseyhightower/status/1105985400110112768">
              translated customer pain
            </a>{" "}
            back into the product roadmap. We spoke at{" "}
            <Link href="/notes/nextjs-conf-2022-recap">conferences</Link>, wrote
            blog posts, and created videos. We built open-source examples and
            contributed back to the product.
          </li>
          <li>
            In 2022, I was promoted to VP of Developer Experience, now also
            leading our product documentation team. My team created a{" "}
            <a href="https://nextjs.org/learn">new free course</a> to teach
            Next.js, which had 17 million page views that year.{" "}
            <a href="https://twitter.com/vmprmyth/status/1608900031859527682">
              I shipped.
            </a>{" "}
            I partnered with our open-source community, collaborating with
            frameworks like{" "}
            <a href="https://vercel.com/docs/frameworks/nuxt">Nuxt</a> and{" "}
            <a href="https://astro.build/notes/vercel-official-hosting-partner/">
              Astro
            </a>{" "}
            and sponsoring individuals and projects.
          </li>
          <li>
            In 2023, I was promoted to VP of Product, now also leading Product
            Management.
          </li>
        </ul>

        <hr className={styles["ja-rule"]} />
        <h2 className={styles.firm}>VVV</h2>
        <div className={styles.position}>
          Senior Software Engineer, 2018 — 2020
        </div>
        <p>
          Hy-Vee, an almost 100-year-old grocery chain in the United States,
          wanted to build a new version of their digital storefront. I joined a
          team of <Link href="/notes/product-engineers">product engineers</Link>{" "}
          working across web and mobile to rebuild their legacy .NET application
          (~500k MAU) with React and React Native.
        </p>
        <p>
          On the frontend, I led our move from a custom webpack and React
          configuration to Next.js and the latest React patterns. In the
          process, I shared my learnings online, helping educate members of the
          React and Next.js community by creating courses.
        </p>
        <p>
          Throughout my two years, I was able to work on some hard problems:
          decoupling a decade old monolith into microservices, working with a
          federated GraphQL API, learning and occasionally managing a Kubernetes
          cluster, building and implementing a design system, incrementally
          migrating individual components and routes to a new framework and
          infrastructure, and more.
        </p>
        <hr className={styles["ja-rule"]} />
        <h2 className={styles.firm}>Workiva</h2>
        <div className={styles.position}>Software Engineer, 2015 — 2018</div>
        <p>
          Workiva ($WK) is a cloud platform for data reporting and compliance.
          During my time at Workiva, I gained my first production experience
          using React. I worked on tooling to help predict and alert and
          regressions in our SaaS platform, building a product similar to
          open-source tools like Sentry.
        </p>
      </MDXLayout>
    </section>
  );
}
