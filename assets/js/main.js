const yearNode = document.getElementById("year");
const formNextNode = document.getElementById("form-next");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (formNextNode) {
  const currentPath = window.location.pathname;
  const basePath = currentPath.endsWith(".html")
    ? currentPath.slice(0, currentPath.lastIndexOf("/") + 1)
    : `${currentPath.replace(/\/?$/, "/")}`;

  formNextNode.value = `${window.location.origin}${basePath}thanks.html`;
}

const sliderButtons = document.querySelectorAll("[data-slider-target]");

sliderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sliderName = button.getAttribute("data-slider-target");
    const slider = document.querySelector(`[data-slider="${sliderName}"]`);

    if (!slider) {
      return;
    }

    const firstCard = slider.querySelector(".service-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 14 : 280;
    const direction = button.classList.contains("slider-button--next") ? 1 : -1;

    slider.scrollBy({
      left: step * direction,
      behavior: "smooth",
    });
  });
});
