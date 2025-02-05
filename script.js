document.addEventListener("DOMContentLoaded", function () {
 const sectionItems = document.querySelectorAll(".second-section-box");
  const statItems = document.querySelectorAll(".stat-item");

  if (!sectionItems.length || !statItems.length) return; // Prevent errors if elements are missing

  let currentIndex = 0;

  function updateActiveClass(items, currentIndex, activeClass) {
    items.forEach((item) => item.classList.remove(activeClass));

    if (items[currentIndex]) {
      items[currentIndex].classList.add(activeClass);
    }

    return (currentIndex + 1) % items.length;
  }

  function updateItems() {
    requestAnimationFrame(() => {
      currentIndex = updateActiveClass(sectionItems, currentIndex, "active-second-section-box");
      updateActiveClass(statItems, currentIndex, "active-stat-item");
    });
  }

  setInterval(updateItems, 1800);

  // SCROLL-BEHAVIOR
  const body = document.querySelector(".container");
  let isScrolling = false;
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".nav-dot");
  let scrollDirection;
  const handleScroll = (e) => {
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
              entry.target.classList.add("fadeIn");
              entry.target.classList.remove("fadeOut");
              dots.forEach((dot) => dot.classList.remove("active-dot"));
                currentDot.classList.add("active-dot");
            } else {
              entry.target.classList.add("fadeOut");
              entry.target.classList.remove("fadeIn");
            }
          });
        },
        { threshold: 0.8 }
      );

      sections.forEach((section) => {
        observer.observe(section);
      });
    }

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
