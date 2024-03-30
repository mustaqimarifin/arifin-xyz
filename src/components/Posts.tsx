import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">
  pill?: boolean
}


export default function PostList({entry, pill}: Props) {
const fDate = () => <div class="text-xs uppercase">{formatDate(entry.data.date)}</div>

    return (
      <a href={`/${entry.collection}/${entry.slug}`} class="group  gap-3 flex items-center rounded-lg hover:bg-black/5 hover:dark:bg-white/10 transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex items-center align-middle gap-2">
          {pill &&
            <div class="text-sm capitalize px-2 py-0.5 ">
              {entry.collection === "blog" ? "post" : "project"}
            </div>
          }
          <span class="font-semibold text-black dark:text-white">
          {entry.data.title}
        </span>
               <span>
            {fDate()}
          </span> 
        </div>
      </div>

    </a>
   )
}