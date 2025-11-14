const scriptURL =
  "https://script.google.com/macros/s/AKfycbwJuY7wpmbgrCXjOnWTF30r7OQiFYEXUGdeSHbeUZ4OC9LRD4P7l2RT1LvJ-UePY5iGiQ/exec";

const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => response.json())
    .then((data) => {
      if (data.result === "success") {
        alert("Form submitted successfully!");
        form.reset();
      } else {
        alert("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error!", error.message);
      alert("There was an error submitting the form.");
    });
});
