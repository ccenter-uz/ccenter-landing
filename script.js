function updateActiveClass(items, currentIndex, activeClass) {
  items?.forEach((item) => item.classList.remove(`${activeClass}`));

  if (items[currentIndex]) {
    items[currentIndex].classList.add(`${activeClass}`);
  }

  return (currentIndex + 1) % items.length;
}

window.onload = function () {
  document.getElementById("loader").style.display = "none";
  document.getElementById("container").style.display = "block";
};

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);

  const sectionItems = document.querySelectorAll(".second-section-box");
  const statItems = document.querySelectorAll(".stat-item");
  let currentIndexSectionItems = 0;
  let currentIndexStatItems = 0;

  function updateSectionItems() {
    currentIndexSectionItems = updateActiveClass(
      sectionItems,
      currentIndexSectionItems,
      "active-second-section-box",
    );
  }

  function updateStatItems() {
    currentIndexStatItems = updateActiveClass(
      statItems,
      currentIndexStatItems,
      "active-stat-item",
    );
  }

  setInterval(updateSectionItems, 1800);
  setInterval(updateStatItems, 1800);

  // ASIDE-ACTIVE-CLASS
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".nav-dot");
  let scrollDirection;
  const handleScroll = (e) => {
    e.preventDefault();
    if (window.innerWidth > 1024) {
      scrollDirection = e.wheelDeltaY;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;
            const currentDot = document.querySelector(
              `.nav-dot[data-section=${sectionId}]`
            );

            if (entry.isIntersecting) {
              dots.forEach((dot) => dot.classList.remove("active-dot"));
              currentDot.classList.add("active-dot");
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });
    }
  };

  window.addEventListener("wheel", handleScroll);
});
