const body = document.body;
const page = body.dataset.page;
const themeToggleLabel = document.getElementById("themeToggleLabel");
const themeToggleIcon = document.getElementById("themeToggleIcon");
const welcomeName = document.getElementById("welcomeName");

function setTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem("dashboard-theme", theme);

  if (themeToggleLabel && themeToggleIcon) {
    themeToggleLabel.textContent = theme === "dark" ? "Light" : "Dark";
    themeToggleIcon.textContent = theme === "dark" ? "☀" : "☾";
  }
}

function enterDashboard(userLabel) {
  localStorage.setItem("dashboard-user", userLabel || "Marketing Specialist");
  window.location.href = "dashboard.html";
}

const savedTheme = localStorage.getItem("dashboard-theme") || "dark";
setTheme(savedTheme);

if (page === "login") {
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const userName = email.split("@")[0].replace(/[._-]/g, " ");
    const formatted = userName
      ? userName.replace(/\b\w/g, (char) => char.toUpperCase())
      : "Marketing Specialist";
    enterDashboard(formatted);
  });

  document.getElementById("guestLogin").addEventListener("click", () => {
    enterDashboard("Guest Preview");
  });
}

if (page === "signup") {
  document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    enterDashboard(name || "Marketing Specialist");
  });
}

if (page === "dashboard") {
  const savedUser = localStorage.getItem("dashboard-user");
  if (welcomeName && savedUser) {
    welcomeName.textContent = savedUser;
  }

  document.getElementById("themeToggle").addEventListener("click", () => {
    setTheme(body.dataset.theme === "dark" ? "light" : "dark");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
