document.addEventListener("DOMContentLoaded", function () { 
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("project-container");
  const mainContent = document.querySelector(".main-content");
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  const logo = document.querySelector(".logo");
  const centerTitle = document.querySelector(".center-title");
  const footer = document.querySelector("footer");
  
	if (logo) {
	  logo.addEventListener("click", function () {
		container.innerHTML = "";
		container.classList.add("hidden");         
		mainContent.classList.remove("hidden");    

		body.classList.remove("white-theme");
		if (navbar) navbar.classList.remove("white-theme");
	  });
	}


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
		  if (footer) footer.classList.add("white-theme");

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
		if (footer) footer.classList.remove("white-theme");

      });
    }
  }
  
  if (centerTitle) {
  centerTitle.addEventListener("click", function () {
    fetch("about.html")
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
		if (footer) footer.classList.remove("white-theme");


        attachBackButtonListener();
      })
      .catch((error) => {
        container.innerHTML = "<p>Failed to load About Me.</p>";
        console.error(error);
      });
  });
}

  container.classList.add("hidden");
  
  
});
