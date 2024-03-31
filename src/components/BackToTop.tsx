export default function BackToTop() {
  return (
    <button
      id="back-to-top"
      aria-label="Back to top of page"
      class="group flex w-fit p-1.5 gap-1.5 text-sm items-center border rounded hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-90"
      >
        <line
          x1="19"
          y1="12"
          x2="5"
          y2="12"
          class="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
        />
        <polyline
          points="12 19 5 12 12 5"
          class="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
        />
      </svg>
      <div class="w-full group-hover:text-black group-hover:dark:text-white transition-colors duration-300 ease-in-out">
        Back to top
      </div>
    </button>
  )
}
