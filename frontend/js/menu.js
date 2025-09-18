document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-icon");
  const nav = document.querySelector("nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
    menuBtn.classList.toggle("open");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove("active");
      menuBtn.classList.remove("open");
    }
  });
});
