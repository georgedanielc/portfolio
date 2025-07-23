document.addEventListener("DOMContentLoaded", function () { 
  const cards = document.querySelectorAll(".card");
  const container = document.getElementById("project-container");
  const mainContent = document.querySelector(".main-content");
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  const logo = document.querySelector(".logo");
  const about = document.querySelector(".about-icon");
  const footer = document.querySelector("footer");
  const title = document.querySelector(".center-title");
  const emailIcon = document.querySelector(".email-icon");
  const form = document.getElementById("contact-form");
  const modal = document.getElementById("success-modal");
  const goHomeBtn = document.getElementById("go-home-btn");
  const modalCloseBtn = document.getElementById("modal-close-button");
  
	function goHome() {
    container.innerHTML = "";
    container.classList.add("hidden");
    mainContent.classList.remove("hidden");

    body.classList.remove("white-theme");
    if (navbar) navbar.classList.remove("white-theme");
    if (footer) footer.classList.remove("white-theme");
  }

  if (logo) {
    logo.addEventListener("click", goHome);
  }

  if (title) {
    title.addEventListener("click", goHome);
    title.style.cursor = "pointer";
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
  
 if (about) {
  about.addEventListener("click", function () {
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
  if (emailIcon) {
  emailIcon.addEventListener("click", function () {
    fetch("contact.html")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load page");
        return res.text();
      })
      .then(html => {
  mainContent.classList.add("hidden");
  container.classList.remove("hidden");
  container.innerHTML = html + `<button id="back-button" class="floating-back-btn">&lt;</button>`;
  attachBackButtonListener();
  body.classList.add("white-theme");
  navbar?.classList.add("white-theme");
  footer?.classList.add("white-theme");

  // ✅ Wait for DOM to update
  setTimeout(() => {
    const form = document.getElementById("contact-form");
    const modal = document.getElementById("success-modal");
    const closeBtn = document.getElementById("modal-close-button");

    if (form && modal && closeBtn) {
      modal.classList.add("hidden"); // ensure hidden

      form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(() => {
      modal.classList.remove("hidden"); // remove hidden
      modal.classList.add("show");      // add show
      form.reset();
    })
    .catch(() => {
      alert("Oops! Something went wrong.");
    });
});

      closeBtn.addEventListener("click", function () {
  container.innerHTML = ""; // clear contact page
  container.classList.add("hidden"); // hide container
  mainContent.classList.remove("hidden"); // show main content

  // ✅ Remove white-theme classes like back button
  body.classList.remove("white-theme");
  if (navbar) navbar.classList.remove("white-theme");
  if (footer) footer.classList.remove("white-theme");

  modal.classList.remove("show"); // hide modal
});
    } else {
      console.warn("Modal, form or closeBtn not found");
    }
  }, 0); // ← delays to next render cycle
})
      .catch(err => {
        container.innerHTML = "<p>Failed to load page.</p>";
        console.error(err);
      });
  });
}

  container.classList.add("hidden");
  
  
});
