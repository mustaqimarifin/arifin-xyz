"use client";
import { cx } from "@/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";
import fb from "public/default.jpg";
import { type FC, type ReactNode, Suspense } from "react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { GreenCheck, RedCross } from "../Sprites";
import { Link } from "../server";
import styles from "./client.module.css";

const pages = [
  { name: "[𝖆𝖗𝖎𝖋𝖎𝖓]", path: "/" },
  { name: "WORK", path: "/work" },
  { name: "NOTES", path: "/notes" },
  { name: "STACK", path: "/stack" },
  { name: "GUESTBOOK", path: "/guestbook" },
  { name: "BOOKMARKS", path: "/bookmarks" },
  { name: "{rss}", path: "/feed.xml" },
];

export const HomePageNav = () => {
  return (
    <ul>
      {pages.map(({ name, path }) => {
        return (
          <li className={styles["nav-1"]} key={path}>
            <Link href={path} prefetch={false} className={styles["nav-1-link"]}>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    path === "/" ? path === pathname : pathname.startsWith(path);

  return (
    <nav className={styles.navbar}>
      {pages.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          label={link.name}
          className={cx(
            "relative py-3",
            isActive(link.path)
              ? "font-medium text-rose-500"
              : "text-neutral-500 dark:text-neutral-400",
          )}
        >
          <span className="block sm:hidden">{}</span>
          <span className="hidden sm:block">{link.name}</span>
          {isActive(link.path) && <span className={styles["navbar-span"]} />}
        </Link>
      ))}
    </nav>
  );
};

export type ImgProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  blurDataURL?: string;
  className?: string;
};

export const Pix = (props: ImgProps) => {
  const { src, alt, className, caption, width, height } = props;
  let path = require(`../../../public/images${src}`);
  let img = src.startsWith("http") ? src : path;

  return (
    <div className={styles.pix}>
      <Fade>
        <figure>
          <Image
            src={img}
            alt={alt}
            width={Number(width)}
            height={Number(height)}
            unoptimized={src.startsWith("http")}
            //className={styles}
          />
          <figcaption>{caption && <span>{caption}</span>}</figcaption>
        </figure>
      </Fade>
    </div>
  );
};

export const Fade = ({ children }: { children: ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    //rootMargin: '-100px 0px',
    threshold: 0.4,
  });

  return (
    <div
      suppressHydrationWarning
      ref={ref}
      className={`transition-all duration-500 ${inView ? "fade-in blur-0 opacity-100" : "fade-out blur-md  opacity-0"}`}
    >
      {children}
    </div>
  );
};

export function HomeBG() {
  return (
    <Suspense>
      <Fade>
        <div className={styles["bg-wrap"]} />
      </Fade>
      <div id="clock" className={styles.clock}>
        <Clock />
      </div>
    </Suspense>
  );
}

export function Clock() {
  return (
    <Script id="clock">{`var b=function(){let a=new Date,y=a.getHours(),P=a.getMinutes();if(y>=12){if(y>12)y-=12}else if(y===0)y=12;y=y<10?"0"+y:y,P=P<10?"0"+P:P;let d=y+":"+P+":KL";document.getElementById("clock").innerHTML=d};setInterval(b,60000);b();`}</Script>
  );
}

export const HeroImage = () => {
  return (
    <div className="flex size-16 rounded-full border-5 overflow-hidden aspect-square">
      <video
        autoPlay
        loop
        muted
        playsInline
        //width={200}
        //height={200}
        className="flex-1 object-cover box-border border-indigo-700 "
      >
        <source src="/Xyz2.webm" type="video/webm" />
      </video>
    </div>
  );
};

export const VideoPlayer = (props) => {
  return (
    <div className="flex">
      <video
        //autoPlay
        loop
        muted
        playsInline
        //width={200}
        //height={200}
        className="flex-1"
      >
        <source src={props.src} type="video/mp4" />
      </video>
    </div>
  );
};

export function Callout(props) {
  return (
    <div className={styles.callout}>
      <div className={styles.emoji}>{props.emoji}</div>
      <div className={styles.children}>{props.children}</div>
    </div>
  );
}

export function ProsCard({ title, pros }) {
  return (
    <div className={styles["pro-card"]}>
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-1rem">
        {pros.map((pro) => (
          <div key={pro} className={styles["pc-ow"]}>
            <div className={styles["pc-iw"]}>
              <GreenCheck className={styles["pc-cm"]} />
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConsCard({ title, cons }) {
  return (
    <div className={styles["con-card"]}>
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-1rem">
        {cons.map((con) => (
          <div key={con} className={styles["cc-ow"]}>
            <div className={styles["cc-iw"]}>
              <RedCross className={styles["cc-cm"]} />
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface AvatarProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "size"> {
  src: string;
  size?: "sm" | "lg";
  isLoading?: boolean;
  error?: any;
}

export const Avatar: FC<AvatarProps> = ({
  src,
  className,
  size = "sm",
  isLoading,
  error,

  ...otherProps
}) => {
  //const image = useImage({ srcList: src || [], useSuspense: false });

  return (
    <div
      {...otherProps}
      className={cx(
        size === "sm" ? "h-6 w-6" : "h-10 w-10",
        "bg-alpha-10 relative inline-block overflow-hidden rounded-full",
        className,
      )}
    >
      {src && (
        <img
          className="h-full w-full rounded-full object-cover"
          src={src}
          alt=""
          width={24}
          height={24}
        />
      )}

      {isLoading && <div className="absolute inset-0" />}
      {error && (
        <div className="absolute inset-0">
          <svg
            className="text-alpha-60"
            viewBox="0 0 128 128"
            role="img"
            aria-label="avatar"
          >
            <path
              fill="currentColor"
              d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
            />
            <path
              fill="currentColor"
              d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export const GBPost = ({ entry }) => {
  return (
    <div key={entry.id} className={styles["entry-ow"]}>
      <div className={styles["entry-iw"]}>
        <div className="inline-flex mr-4">
          {entry.author.image}
          {/* <Avatar src={entry.author?.image!} className="rounded-full" /> */}
        </div>
        <span className="mr-4">{entry.author?.name}:</span>
        {entry.body}
      </div>
    </div>
  );
};
