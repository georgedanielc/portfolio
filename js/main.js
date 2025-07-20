document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("project-container");
  const mainContent = document.querySelector(".main-content");

  let originalContent = container.innerHTML; 

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const url = this.getAttribute("data-project");

      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Network error");
          return response.text();
        })
        .then((html) => {
          container.innerHTML = html + `
            <button id="back-button" class="floating-back-btn">&lt;</button>
          `;
		  mainContent.style.display = "none";
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
        container.innerHTML = originalContent;
		mainContent.style.display = "block"; 
        window.dispatchEvent(new Event("DOMContentLoaded"));
      });
    }
  }
});
