document.addEventListener("DOMContentLoaded", async () => {

  try {

    // =========================
    // LOAD HEADER
    // =========================
    const headerContainer =
      document.getElementById("header-container");

    if (headerContainer) {

      const headerRes =
        await fetch("./includes/header.html");

      const headerData =
        await headerRes.text();

      headerContainer.innerHTML = headerData;

    }

    // =========================
    // LOAD FOOTER
    // =========================
    const footerContainer =
      document.getElementById("footer-container");

    if (footerContainer) {

      const footerRes =
        await fetch("./includes/footer.html");

      const footerData =
        await footerRes.text();

      footerContainer.innerHTML = footerData;

    }

    // =========================
    // INIT ALL SCRIPTS
    // =========================
    initScripts();

  }

  catch (error) {

    console.error("Header/Footer load error:", error);

  }

});


// =========================
// INIT SCRIPTS
// =========================
function initScripts() {

  // =========================
  // MOBILE MENU
  // =========================
  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", (e) => {

      e.stopPropagation();

      navLinks.classList.toggle("active");

    });

    document.addEventListener("click", (e) => {

      const isInside =
        navLinks.contains(e.target);

      const isToggle =
        menuToggle.contains(e.target);

      if (!isInside && !isToggle) {

        navLinks.classList.remove("active");

      }

    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("active");

      });

    });

  }
// =========================
// GLOBAL BREADCRUMB SYSTEM
// =========================
function buildBreadcrumb() {

  const breadcrumb = document.getElementById("globalBreadcrumb");
  if (!breadcrumb) return;

  const path = window.location.pathname.split("/").filter(Boolean);

  const file = path[path.length - 1] || "index.html";

  let html = `
    <li class="breadcrumb-item">
      <a href="index.html">Home</a>
    </li>
  `;

  // BLOG DETAILS SPECIAL HANDLING
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (file.includes("blog-details") && slug && typeof blogPosts !== "undefined") {

    const post = blogPosts.find(p => p.slug === slug);

    html += `
      <li class="breadcrumb-item">
        <a href="blog.html">Blog</a>
      </li>
    `;

    if (post) {

      html += `
        <li class="breadcrumb-item">
          <a href="blog.html?category=${encodeURIComponent(post.category)}">
            ${post.category}
          </a>
        </li>

        <li class="breadcrumb-item active">
          ${post.title}
        </li>
      `;

    }

  } else {

    // NORMAL PAGE BREADCRUMB
    let clean = file
      .replace(".html", "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, l => l.toUpperCase());

    if (file !== "index.html") {

      html += `
        <li class="breadcrumb-item active">
          ${clean}
        </li>
      `;

    }

  }

  breadcrumb.innerHTML = html;
}

  // =========================
// SCROLL TO TOP BUTTON
// =========================
const goTopBtn = document.getElementById("goTopBtn");

if (goTopBtn) {

  window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
      goTopBtn.classList.add("show");
    } else {
      goTopBtn.classList.remove("show");
    }

  });

  goTopBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

}
buildBreadcrumb();
}