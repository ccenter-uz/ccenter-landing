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

  // SCROLL-VIEWPORT
  function scrollToSnapPoint(element, index) {
  const snapPoints = Array.from(element.children);
  const snapPoint = snapPoints[index];
  element.scrollTo({
    top: snapPoint.offsetTop,
    behavior: 'smooth'
  });
}

// Example usage:
const container = document.querySelector('.sections-container');
scrollToSnapPoint(container, 1);
});
