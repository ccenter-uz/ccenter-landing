function updateActiveClass(items, currentIndex, activeClass) {
  items?.forEach((item) => item.classList.remove(`${activeClass}`));

  if (items[currentIndex]) {
    items[currentIndex].classList.add(`${activeClass}`);
  }

  return (currentIndex + 1) % items.length;
}

document.addEventListener("DOMContentLoaded", function () {
  const sectionitems = document.querySelectorAll(".second-section-box");
  const statItems = document.querySelectorAll(".stat-item");
  let currentIndexSectionItems = 0;
  let currentIndexStatItems = 0;

  function updateSectionItems() {
    currentIndexSectionItems = updateActiveClass(
      sectionitems,
      currentIndexSectionItems,
      "active-second-section-box"
    );
  }

  function updateStatItems() {
    currentIndexStatItems = updateActiveClass(
      statItems,
      currentIndexStatItems,
      "active-stat-item"
    );
  }

  setInterval(updateSectionItems, 1800);
  setInterval(updateStatItems, 1800);

  // SCROLL-BEHAVIOR
  const body = document.querySelector(".container");
  let isScrolling = false;
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".nav-dot");


  const handleScroll = (e) => {
      const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        const currentDot = document.querySelector(`.nav-dot[data-section=${sectionId}]`);
        console.log(currentDot,'currentDot');
        
        if (entry.isIntersecting) {
          dots.forEach((dot) => dot.classList.remove("active-dot"));
          currentDot.classList.add("active-dot");
        }
      });
    },{threshold: 0.5});

    sections.forEach((section) => {
      observer.observe(section);
    });




    e.preventDefault();
    if (!isScrolling) {
      isScrolling = true;

      if (e.deltaY > 0) {
        body.scrollTop += window.innerHeight;
      } else {
        body.scrollTop -= window.innerHeight;
      }

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }
  };

  window.addEventListener("wheel", handleScroll, { passive: false });
});
