import { glob } from "fast-glob";

type ImgMeta = {
  src: string;
};

export async function imgGlob() {
  //let rimages: ImgMeta[]
  const rimages = (await glob(
    "./app/assets/**/*.{jpeg,jpg,png,gif,webp}",
  )) as unknown as ImgMeta[];

  for (const src of rimages) {
    //console.log(i,src);
    rimages.push(src);
  }
  return rimages;
}
