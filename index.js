window.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.innerHTML = new Date().getFullYear();
  }
});
