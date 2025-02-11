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

  // DIALOG
  const dialog = document.querySelector(".notification-dialog");
  const closeDialogBtn = document.querySelector(".notification-dialog-close");
  const dialogAgreeBtn = document.querySelector(
    ".notification-dialog-agree-btn"
  );
  (function openDialog() {
    dialog.showModal();
    dialog.focus();
    requestAnimationFrame(() => {
      dialog.style.opacity = 1;
    });
  })();

  function closeDialog() {
    requestAnimationFrame(() => {
      dialog.style.opacity = 0;
    });
    dialog.close();
  }

  closeDialogBtn.addEventListener("click", closeDialog);
  dialogAgreeBtn.addEventListener("click", closeDialog);

  const sectionItems = document.querySelectorAll(".second-section-box");
  const statItems = document.querySelectorAll(".stat-item");
  let currentIndexSectionItems = 0;
  let currentIndexStatItems = 0;

  function updateSectionItems() {
    currentIndexSectionItems = updateActiveClass(
      sectionItems,
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
  // CLOSURE-FOR-INITIAL-UPDATE
  function initialUpdateSectionItems() {
    let firstRender = true;
    return function run() {
      if (firstRender) {
        updateSectionItems();
        firstRender = false;
      }
    };
  }

  initialUpdateSectionItems()();

  setInterval(updateSectionItems, 5500);
  setInterval(updateStatItems, 1800);

  // ASIDE-ACTIVE-CLASS
  const sections = document.querySelectorAll(".section");
  const dots = document.querySelectorAll(".nav-dot");
  const handleScroll = (e) => {
    if (window.innerWidth > 1024) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const sectionId = entry.target.id;
            const currentDot = document.querySelector(
              `.nav-dot[data-section=${sectionId}]`
            );

            if (entry.isIntersecting) {
              dots.forEach((dot) => {
                dot.classList.remove("active-dot");
              });
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
  window.addEventListener("load", function () {
    const sections = document.querySelectorAll(".section");
    const observeSectionsForActiveClass = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections.forEach((section) => {
              section.classList.remove("active-section");
            });
            entry.target.classList.add("active-section");
            window.location.hash = entry.target.id;
          }
        });
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => {
      observeSectionsForActiveClass.observe(section);
    });
  });
});
