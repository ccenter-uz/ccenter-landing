document.addEventListener("DOMContentLoaded", function () {
  // DIALOG-CONTENT
  const dialog = document.querySelector(".consent-dialog");
  const closeDialogBtn = document.querySelector(".consent-dialog-close");
  const openDialogBtn = document.querySelector(".consent-label");
  const dialogAgreeBtn = document.querySelector(".consent-dialog-agree-btn");
  const consentCheckbox = document.getElementById("consent");

  // Function to open the dialog
  const openDialog = () => {
    dialog.showModal();
    dialog.focus();
    requestAnimationFrame(() => {
      dialog.style.opacity = 1;
    });
  };

  const closeDialog = async () => {
    requestAnimationFrame(() => {
      dialog.style.opacity = 0;
    });
    dialog.close();
  };

  // Add event listeners
  openDialogBtn.addEventListener("click", openDialog);
  closeDialogBtn.addEventListener("click", closeDialog);
  dialogAgreeBtn.addEventListener("click", function () {
    consentCheckbox.checked = true;
    closeDialog();
  });

  // POST-FORM
  const form = document.getElementById("contact-form");
  const notification = document.getElementsByClassName("success-message")[0];
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if (
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("phone")
    )
      return null;

    submitBtn.disabled = true;
    submitBtn.classList.add("disabled-btn");
    fetch(
      "https://script.google.com/macros/s/AKfycbxF5MllZEfe7YBeA5JGZYWyTq_B3AS-8JZNZ03rf8yLbHrrot3fAHnqVx-d_a1BT-3PIQ/exec",
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          notification.classList.add("active-success-message");
          window.open("assets/pdf.pdf", "_blank");
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          notification.classList.remove("active-success-message");
          submitBtn.classList.remove("disabled-btn");
          form.reset();
          submitBtn.disabled = false;
        }, 3000);
      });
  });
});
