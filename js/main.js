document.addEventListener("DOMContentLoaded", function () { 
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("project-container");
  const mainContent = document.querySelector(".main-content");
  const navbar = document.querySelector(".navbar");
  const body = document.body;

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
          mainContent.classList.add("hidden");    
          container.classList.remove("hidden");   
          container.innerHTML = html + `
            <button id="back-button" class="floating-back-btn">&lt;</button>
          `;

          body.classList.add("white-theme");
          if (navbar) navbar.classList.add("white-theme");

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
        container.classList.add("hidden");         
        mainContent.classList.remove("hidden");    

        body.classList.remove("white-theme");
        if (navbar) navbar.classList.remove("white-theme");
      });
    }
  }

  container.classList.add("hidden");
});
