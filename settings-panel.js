const panel = document.getElementById("settings-panel");
document.getElementById("toggle-settings").addEventListener("click", () => {
  panel.classList.toggle("hidden");
});

// Toggle visibility
["weather", "news", "clock"].forEach((widget) => {
  const checkbox = document.getElementById(`toggle-${widget}`);
  checkbox.addEventListener("change", () => {
    const el = document.getElementById(`${widget}-widget`);
    if (checkbox.checked) el.style.display = "block";
    else el.style.display = "none";
  });
});

// Music toggle đã xử lý trong background-music.js

// Dark mode toggle
document.getElementById("toggle-dark").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
});
!updateClock;
const toggleDark = document.getElementById("toggle-dark");

// Tự động dark mode theo giờ
function autoDarkMode() {
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  document.body.classList.toggle("dark-mode", isNight);
}
if (toggleDark.checked) {
  autoDarkMode();
  setInterval(autoDarkMode, 10 * 60 * 1000); // Kiểm tra mỗi 10 phút
}
!updateClock;
const darkSelect = document.getElementById("dark-mode-select");

function applyDarkModeSetting(mode) {
  if (mode === "dark") document.body.classList.add("dark-mode");
  else if (mode === "light") document.body.classList.remove("dark-mode");
  else {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    document.body.classList.toggle("dark-mode", isNight);
  }
}

darkSelect.addEventListener("change", () => {
  const mode = darkSelect.value;
  localStorage.setItem("dark-mode-setting", mode);
  applyDarkModeSetting(mode);
});

// Load lại cài đặt khi mở web
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("dark-mode-setting") || "auto";
  darkSelect.value = saved;
  applyDarkModeSetting(saved);
});
