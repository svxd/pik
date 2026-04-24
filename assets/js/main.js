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

const phoneInput = document.querySelector('input[name="phone"]');

function formatPhone(value) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  let prefix = "+7";
  let rest = digits;

  if (digits[0] === "8") {
    prefix = "8";
    rest = digits.slice(1);
  } else if (digits[0] === "7") {
    rest = digits.slice(1);
  } else if (digits[0] === "9") {
    rest = digits;
  }

  const parts = [
    rest.slice(0, 3),
    rest.slice(3, 6),
    rest.slice(6, 8),
    rest.slice(8, 10),
  ].filter(Boolean);

  let formatted = prefix;

  if (parts[0]) {
    formatted += ` (${parts[0]}`;
    if (parts[0].length === 3) {
      formatted += ")";
    }
  }

  if (parts[1]) {
    formatted += ` ${parts[1]}`;
  }

  if (parts[2]) {
    formatted += `-${parts[2]}`;
  }

  if (parts[3]) {
    formatted += `-${parts[3]}`;
  }

  return formatted;
}

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });
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
