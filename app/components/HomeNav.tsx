"use client";

import Link from "next/link";
import { navItems } from "./nav";

export const Kont = ({ children }) => (
  <div className="mx-auto max-w-screen-sm px-5">{children}</div>
);

export const PageLinks = () => {
  return (
    <>
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <div className="flex mr-40 justify-between flex-col">
            <Link
              key={path}
              href={path}
              className=" duration-700 ease-in-out transition-all hover:text-neutral-800 dark:hover:text-pink-200 text-2xl md:text-5xl tracking-tight py-1 md:py-2 font-black"
            >
              {name}
            </Link>
          </div>
        );
      })}
    </>
  );
};
