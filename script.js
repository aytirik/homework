const authScreen = document.getElementById("authScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const welcomeName = document.getElementById("welcomeName");
const routeEyebrow = document.getElementById("routeEyebrow");
const themeToggleLabel = document.getElementById("themeToggleLabel");
const themeToggleIcon = document.getElementById("themeToggleIcon");
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");
const switchLinks = document.querySelectorAll(".switch-link");
const routeLinks = document.querySelectorAll(".route-link");
const routeViews = document.querySelectorAll(".route-view");
const body = document.body;

const routeMeta = {
  dashboard: "Today's growth pulse",
  campaigns: "Campaign orchestration",
  "lead-funnel": "Funnel performance",
  regions: "Regional pulse",
  social: "Creative radar",
  reports: "Executive reporting",
};

function activateForm(targetId) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.target === targetId));
  forms.forEach((form) => form.classList.toggle("active", form.id === targetId));
}

function setTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("dashboard-theme", theme);
  themeToggleLabel.textContent = theme === "dark" ? "Light" : "Dark";
  themeToggleIcon.textContent = theme === "dark" ? "☀" : "☾";
}

function applyRoute(routeName) {
  const route = routeMeta[routeName] ? routeName : "dashboard";
  routeViews.forEach((view) => view.classList.toggle("active", view.dataset.route === route));
  routeLinks.forEach((link) => {
    const target = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", target === route);
  });
  routeEyebrow.textContent = routeMeta[route];
}

function enterDashboard(userLabel) {
  welcomeName.textContent = userLabel || "Marketing Specialist";
  localStorage.setItem("dashboard-user", welcomeName.textContent);
  authScreen.classList.remove("active");
  dashboardScreen.classList.add("active");
  if (!window.location.hash || window.location.hash === "#login" || window.location.hash === "#signup") {
    window.location.hash = "#dashboard";
  } else {
    applyRoute(window.location.hash.replace("#", ""));
  }
}

function handleHashRoute() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "login") {
    dashboardScreen.classList.remove("active");
    authScreen.classList.add("active");
    activateForm("loginForm");
    return;
  }
  if (hash === "signup") {
    dashboardScreen.classList.remove("active");
    authScreen.classList.add("active");
    activateForm("signupForm");
    return;
  }
  if (routeMeta[hash]) {
    authScreen.classList.remove("active");
    dashboardScreen.classList.add("active");
    applyRoute(hash);
  }
}

tabs.forEach((tab) => tab.addEventListener("click", () => activateForm(tab.dataset.target)));
switchLinks.forEach((button) =>
  button.addEventListener("click", () => {
    activateForm(button.dataset.target);
    window.location.hash = button.dataset.target === "signupForm" ? "#signup" : "#login";
  }),
);

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const userName = email.split("@")[0].replace(/[._-]/g, " ");
  const formatted = userName
    ? userName.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Marketing Specialist";
  enterDashboard(formatted);
});

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();

  document.getElementById("loginEmail").value = email;
  document.getElementById("loginPassword").value = "demo-password";
  activateForm("loginForm");
  enterDashboard(name || "Marketing Specialist");
});

document.getElementById("guestLogin").addEventListener("click", () => {
  enterDashboard("Guest Preview");
});

document.getElementById("themeToggle").addEventListener("click", () => {
  setTheme(body.dataset.theme === "dark" ? "light" : "dark");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  dashboardScreen.classList.remove("active");
  authScreen.classList.add("active");
  window.location.hash = "#login";
});

window.addEventListener("hashchange", handleHashRoute);

const savedTheme = localStorage.getItem("dashboard-theme") || "dark";
const savedUser = localStorage.getItem("dashboard-user");
setTheme(savedTheme);

if (savedUser) {
  welcomeName.textContent = savedUser;
}

if (!window.location.hash) {
  window.location.hash = "#login";
} else {
  handleHashRoute();
}
