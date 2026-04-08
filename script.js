const authScreen = document.getElementById("authScreen");
const dashboardScreen = document.getElementById("dashboardScreen");
const welcomeName = document.getElementById("welcomeName");
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".form");
const switchLinks = document.querySelectorAll(".switch-link");

function activateForm(targetId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.target === targetId);
  });

  forms.forEach((form) => {
    form.classList.toggle("active", form.id === targetId);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => activateForm(tab.dataset.target));
});

switchLinks.forEach((button) => {
  button.addEventListener("click", () => activateForm(button.dataset.target));
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const userName = email.split("@")[0].replace(/[._-]/g, " ");
  welcomeName.textContent = userName
    ? userName.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Marketing Specialist";

  authScreen.classList.remove("active");
  dashboardScreen.classList.add("active");
});

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();

  document.getElementById("loginEmail").value = email;
  document.getElementById("loginPassword").value = "demo-password";
  welcomeName.textContent = name || "Marketing Specialist";

  activateForm("loginForm");
  authScreen.classList.remove("active");
  dashboardScreen.classList.add("active");
});
