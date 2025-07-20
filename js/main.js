document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("project-container");
  const mainContent = document.querySelector(".main-content");

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const url = this.getAttribute("data-project");
      if (!url) return;

      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.text();
        })
        .then((html) => {
          mainContent.style.display = "none";
          container.style.display = "block";

          container.innerHTML = html + `
            <button id="back-button" class="floating-back-btn">&lt;</button>
          `;

          attachBackButtonListener();
        })
        .catch((error) => {
          container.innerHTML = "<p>Failed to load project content.</p>";
          console.error(error);
        });
    });
  });

  function attachBackButtonListener() {
    const backButton = document.getElementById("back-button");
    if (backButton) {
      backButton.addEventListener("click", function () {
        container.innerHTML = "";
        container.style.display = "none";
        mainContent.style.display = "block"; 
      });
    }
  }

  container.style.display = "none";
});
