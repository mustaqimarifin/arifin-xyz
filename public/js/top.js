  function goBackToTop(event) {
    event.preventDefault()
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
  }

  function inintializeBackToTop() {
    const backToTop = document.getElementById("back-to-top")
    backToTop?.addEventListener("click", goBackToTop)
  }

  document.addEventListener("astro:after-swap", inintializeBackToTop)
  inintializeBackToTop()
