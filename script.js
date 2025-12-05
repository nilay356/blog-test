// mobile toggle and active nav highlighting
document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
      MOBILE MENU
  --------------------------------*/
  const toggle = document.querySelectorAll(".mobile-toggle");
  toggle.forEach((t) => {
    t.addEventListener("click", () => {
      const nav = t.nextElementSibling || document.querySelector(".nav");
      if (!nav) return;
      nav.classList.toggle("open");
      nav.style.display = nav.style.display === "flex" ? "" : "flex";
      nav.style.flexDirection = "column";
      nav.style.gap = "8px";
      nav.style.padding = "12px";
      nav.style.background = "rgba(0,0,0,0.7)";
      nav.style.position = "absolute";
      nav.style.right = "18px";
      nav.style.top = "64px";
      nav.style.borderRadius = "8px";
    });
  });

  /* -------------------------------
      ACTIVE NAV LINK
  --------------------------------*/
  const links = document.querySelectorAll(".nav-link");
  links.forEach((a) => {
    if (
      location.pathname.endsWith(a.getAttribute("href")) ||
      (location.pathname === "/" && a.getAttribute("href").includes("index"))
    ) {
      a.classList.add("active");
    }
  });

  /* -------------------------------
      CONTACT FORM HANDLER
  --------------------------------*/
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        school: form.school.value,
        message: form.message.value,
      };

      const res = await fetch("https://blog-s96a.onrender.com/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // SUCCESS POPUP ANIMATION
      if (data.success) {
        const pop = document.getElementById("successPopup");
        pop.innerHTML = "✔ Message sent successfully!";
        pop.classList.add("show");

        setTimeout(() => pop.classList.remove("show"), 3000);

        form.reset();
      } else {
        alert("Error sending message.");
      }
    });
  }
});

/* -------------------------------
    AUTO-HIDE NAVBAR ON SCROLL
--------------------------------*/
let lastScrollY = window.scrollY;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY && window.scrollY > 60) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScrollY = window.scrollY;
});
