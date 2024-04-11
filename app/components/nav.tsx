import Link from "next/link";

export const navItems = {
  "/": {
    name: `[𝖆𝖗𝖎𝖋𝖎𝖓]`,
  },
  "/work": {
    name: "WORK",
  },
  "/notes": {
    name: "NOTES",
  },
  "/guestbook": {
    name: "GUESTBOOK",
  },
/*   "/events": {
    name: "EVENTS",
  },
  "/audio": {
    name: "AUDIO",
  }, */
};

export function Navbar() {
  return (
    <>
        {/*           <a
            href="/"
            className=" gap-1 text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"
          >
            <svg className="flex flex-1 ml-2 size-6 fill-current">
              <use href="/sprite.svg#kit"></use>
            </svg>
          </a>
 */}
        {/*           <nav
            className="flex flex-row items-start place-items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
            id="nav"
          > */}
        {/*            <svg className="flex items-center align-middle justify-between size-6  fill-current">
      <use href="/sprite.svg#kit"></use>
    </svg> */}
        <nav className="flex flex-row space-x-0 pr-10 items-center align-middle justify-between   ">
         {/*  <div className="flex tracking-wide px-2 mt-1"> [𝖆𝖗𝖎𝖋𝖎𝖓] </div> */}
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="transition-all text-sm font-bold hover:text-neutral-800 leading-loose dark:hover:text-neutral-200 inline-flex relative py-1 px-2"
              >
                {name}
              </Link>
            );
          })}
        </nav>
        {/*   </nav> */}
    </>
  );
}

export function Navbar2() {
  return (
    <>
      <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg width="20" height="20" role="img" aria-label="Kitteh">
              <use href="/sprite.svg#kit" />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
