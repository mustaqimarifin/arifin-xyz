function init() {
	animate();

	function animate() {
		const animateElements = document.querySelectorAll(".animate");

		animateElements.forEach((element, index) => {
			setTimeout(() => {
				element.classList.add("show");
			}, index * 150);
		});
	}

	document.addEventListener("DOMContentLoaded", () => init());
}
