import { getMDXComponent } from "next-contentlayer2/hooks";
import React from "react";

import { Callout, ConsCard, Pix, ProsCard } from "./client";
import { Code, Image, Link, heading } from "./server";
import Tweet from "./tweet";

const components = {
  h1: heading(1),
  h2: heading(1),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  img: Pix,
  Image,
  a: Link,
  Callout,
  ProsCard,
  ConsCard,
  Tweet,
  code: Code,
};

export async function MDX(props: any) {
  const Component = getMDXComponent(props.code);
  return (
    <Component
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
