"use client";
import Image from "next/image";
import { cx } from "../utils";

type Props = {
  src?: string;
  alt?: string;
  caption?: string;
  width?: string | number;
  height?: string | number;
  blurDataURL?: string;
  className?: string;
};

const Pix = (props: Props) => {
  const { src, alt, className, caption } = props;
  return (
    <div className="filter drop-shadow-sm">
      <figure>
        <Image
          src={require(`../../public/images${src}`)}
          //src={src}
          alt={alt!}
          //width={680}
          //height={503}
          //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

          //sizes="(max-width: 1920px) 213px, 33vw"
          //blurDataURL={blurDataURL}
          //width={width}
          //height={height}
          //placeholder={"blur" ?? "empty"}
          className={cx(className, "rounded-lg dark:bg-zinc-900 bg-zinc-50")}
        />
        <figcaption className="text-right">
          {caption && (
            <span className="text-sm  text-gray-600 dark:text-gray-400">
              {caption}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default Pix;
