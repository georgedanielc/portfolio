document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("main-container");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const url = this.getAttribute("data-project");

      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.text();
        })
        .then((html) => {
          container.innerHTML = html;
        })
        .catch((error) => {
          container.innerHTML = "<p>Failed to load project content.</p>";
          console.error(error);
        });
    });
  });
});
