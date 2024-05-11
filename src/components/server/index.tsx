import { slugify } from "@/utils";
import { formatDateXtra } from "@/utils/_date";
import Img from "next/image";
import { type FC, type ReactNode, createElement } from "react";
import { highlight } from "sugar-high";
import styles from "./server.module.css";

type HeaderProps = {
  readonly title: string;
  readonly description?: string;
};

export const Header: FC<HeaderProps> = ({ title, description }) => (
  <header className="space-y-2">
    <h1 className="text-3xl m-0">{title}</h1>
    <p className="m-0 text-lg">{description}</p>
  </header>
);

type CardProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export const Card: FC<CardProps> = ({ title, children }) => (
  <div className={styles.card}>
    <p className={styles.title}>{title}</p>
    <div className={styles.detail}>{children}</div>
  </div>
);

type PanelProps = {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
};
export function PagePanel(props: PanelProps) {
  const { tags, title, date, readTime } = props;
  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
      <h1 className={styles["page-title"]}>{title}</h1>
      <div className={styles.panel}>
        <time dateTime={date}>{formatDateXtra(date)}</time>
        <span>· {readTime}</span>
      </div>
    </>
  );
}

interface Props {
  text: string;
}

export const Tag = ({ text }: Props) => {
  return <div className={styles.tags}>{text.split(" ").join("-")}</div>;
};

type SectionProps = {
  children: React.ReactNode;
  large?: boolean;
  alt?: string;
  className?: string;
};

export function Section({ children }: SectionProps) {
  return (
    <section className="container mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      {children}
    </section>
  );
}

export function Code({ children, ...props }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

export function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function heading(level) {
  return ({ children }) => {
    let slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
}

import { Suspense } from "react";
import type { ImgProps } from "../client";

export function ViewCounter({ views }) {
  const number = views || 0;

  return (
    <div className="flex items-center justify-center space-x-1 ">
      <span className="flex items-center align-middle mr-1">{number}</span>
      {/*  <span className="mb-2 size-5 text-white  dark:invert">👁️‍🗨️</span> */}
      <span className="dark:text-white mr-4 ">
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </span>{" "}
    </div>
  );
}

export function ViewCounter2({ views }) {
  const number = views || 0;

  return (
    <Suspense>
      <p>
        <span className="emoji">{number}</span>
      </p>
    </Suspense>
  );
}

export function TViewCounter({
  slug,
  allViews,
}: {
  slug: string;
  allViews?: {
    slug: string;
    count: number;
  }[];
  trackView?: boolean;
}) {
  const viewsForSlug = allViews?.find((view) => view.slug === slug);
  const number = viewsForSlug?.count || 0;

  return (
    <div className="flex items-center justify-center space-x-1 ">
      <div className="flex items-center align-middle mr-1  ">{number}</div>
      <div className="flex-1  ">
        {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=" w-4 h-4 -mt-0"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        }
      </div>{" "}
    </div>
  );
}

export const CoverPix = (props: ImgProps) => {
  const { src, alt } = props;
  //let path = require(`../../public/images${src}`)
  //const local_img = path.join('./public/images', src)
  //let img = src.startsWith('http') ? src : local_img

  return (
    <div className={styles["cover-wrapper"]}>
      <div className={styles.pix}>
        <Img
          src={src}
          alt={alt}
          priority
          width={1240}
          height={698}
          //sunoptimized={props.src.startsWith('http')}
          className={styles["pix-img"]}
          quality={100}
        />
      </div>
    </div>
  );
};

export function Image(props) {
  return <Img alt={props.alt} className="flex mx-auto rounded-lg" {...props} />;
}

import NextLink from "next/link";

type LinkProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly label?: string;
  readonly as?: string;
  readonly prefetch?: boolean;
};

export const Link: FC<LinkProps> = ({ href, children, label, as, ...props }) =>
  href.startsWith("/") ? (
    <NextLink href={href} as={as} aria-label={label} {...props}>
      {children}
    </NextLink>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...props}
    >
      {children}
    </a>
  );
