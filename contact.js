document.addEventListener("DOMContentLoaded", function () {
  // POST-FORM
  const form = document.getElementById("contact-form");
  const notification = document.getElementsByClassName("success-message")[0];
  const submitBtn = document.getElementById("submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    if (!formData.get("name") || !formData.get("email") || !formData.get("phone")) return null;

    submitBtn.disabled = true;
    submitBtn.classList.add("disabled-btn")
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
          form.reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          notification.classList.remove("active-success-message");
          submitBtn.classList.remove("disabled-btn")
          form.reset();
          submitBtn.disabled = false;
        }, 3000);
      });
  });
});
