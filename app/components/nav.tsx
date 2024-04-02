import Link from "next/link";

const navItems = {
  "/": {
    name: `                                       
𝖆𝖗𝖎𝖋𝖎𝖓`,
  },
  "/work": {
    name: "work",
  },
  "/notes": {
    name: "notes",
  },
  "/guestbook": {
    name: "guestbook",
  },
};

export function Navbar() {
  return (
    <>
      <aside className="-ml-[8px] mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          {/*           <a
            href="/"
            className=" gap-1 text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"
          >
            <svg className="flex flex-1 ml-2 size-6 fill-current">
              <use href="/sprite.svg#kit"></use>
            </svg>
          </a>
 */}
          <nav
            className="flex flex-row items-start place-items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          >
            {/*            <svg className="flex items-center align-middle justify-between size-6  fill-current">
      <use href="/sprite.svg#kit"></use>
    </svg> */}
            <div className="flex flex-row space-x-0 pr-10">
              {/*                  <div className="bg-blend-screen text-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-2xl inline-flex py-1 px-2 justify-start ">𝖆𝖗𝖎𝖋𝖎𝖓</div> */}
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="transition-all hover:text-neutral-800 leading-loose dark:hover:text-neutral-200 inline-flex relative py-1 px-2"
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
