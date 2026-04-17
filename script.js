// Configuration: List of data files to fetch
const dataFiles = {
  bio: "data/bio.json",
  projects: "data/projects.json",
  future: "data/future.json",
};

// 1. Fetch and Load Data
async function loadContent() {
  try {
    const [bio, projects, future] = await Promise.all([
      fetch(dataFiles.bio).then((res) => res.json()),
      fetch(dataFiles.projects).then((res) => res.json()),
      fetch(dataFiles.future).then((res) => res.json()),
    ]);

    renderBio(bio);
    renderProjects(projects);
    renderFuture(future);

    // Initialize animations AFTER content is loaded
    initScrollAnimations();
  } catch (err) {
    console.error("Error loading JSON data:", err);
  }
}

// 2. Render Functions
function renderBio(data) {
  document.getElementById("user-name").textContent = data.name.toUpperCase();
  const container = document.getElementById("profile-container");
  container.innerHTML = `<img src="${data.profilePic}" alt="${data.name}" class="profile-img">`;
}

function renderProjects(data) {
  const container = document.getElementById("projects-container");
  container.innerHTML = data
    .map(
      (project) => `
        <div class="card project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">${project.tech.map((t) => `<span>${t}</span>`).join("")}</div>
        </div>
    `,
    )
    .join("");
}

function renderFuture(data) {
  const container = document.getElementById("future-container");
  container.innerHTML = `<ul>${data.map((item) => `<li><strong>${item.goal}</strong> — ${item.status}</li>`).join("")}</ul>`;
}

// 3. Scroll Reveal Engine
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".reveal-left, .reveal-right, .reveal-fade")
    .forEach((el) => {
      observer.observe(el);
    });
}

// 4. Theme Toggle Logic
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
});

// Run
window.addEventListener("DOMContentLoaded", loadContent);