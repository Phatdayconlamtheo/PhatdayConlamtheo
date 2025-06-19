// weather-widget.js
(function () {
  const weatherBox = document.createElement("div");
  weatherBox.id = "weather-widget";
  weatherBox.style.position = "fixed";
  weatherBox.style.top = "0";
  weatherBox.style.left = "0";
  weatherBox.style.right = "0";
  document.body.appendChild(weatherBox);

  weatherBox.innerHTML = `<span id="weather-info">Đang tải thông tin thời tiết...</span>`;

  async function getWeather(lat, lon) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await res.json();
    const weather = data.current_weather;
    const status =
      weather.weathercode === 0 ? "Trời quang" : "Thời tiết thay đổi";
    document.getElementById(
      "weather-info"
    ).innerText = `Thời tiết hiện tại: ${weather.temperature}°C - ${status}`;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
      () =>
        (document.getElementById("weather-info").innerText =
          "Không thể lấy vị trí thời tiết.")
    );
  } else {
    document.getElementById("weather-info").innerText =
      "Trình duyệt không hỗ trợ định vị.";
  }
})();
// weather-widget.js
(function () {
  const weatherBox = document.createElement("div");
  weatherBox.id = "weather-widget";
  weatherBox.style.position = "absolute"; // nếu dùng trên video thì đổi thành absolute
  weatherBox.style.top = "10px";
  weatherBox.style.right = "10px";
  weatherBox.innerHTML = `
    <span id="weather-info">Đang tải thời tiết...</span>
    <button id="toggle-weather" style="margin-left:10px;">❌</button>
  `;
  document.body.appendChild(weatherBox);

  async function getWeather(lat, lon) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await res.json();
    const weather = data.current_weather;
    const status = weather.weathercode === 0 ? "Trời quang" : "Trời nhiều mây";
    document.getElementById(
      "weather-info"
    ).innerText = `🌤 ${weather.temperature}°C - ${status}`;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
      () =>
        (document.getElementById("weather-info").innerText =
          "Không thể lấy vị trí thời tiết.")
    );
  } else {
    document.getElementById("weather-info").innerText =
      "Trình duyệt không hỗ trợ định vị.";
  }

  document.getElementById("toggle-weather").onclick = function () {
    weatherBox.style.display = "none";
  };
})();

// weather-widget.js
(function () {
  const weatherId = "weather-widget";
  const toggleKey = "weather-widget-visible";
  const isVisible = localStorage.getItem(toggleKey) !== "false";

  const container = document.createElement("div");
  container.id = weatherId;
  container.style.position = "absolute";
  container.style.top = "10px";
  container.style.right = "10px";
  container.style.padding = "8px 12px";
  container.style.background = "rgba(255,255,255,0.9)";
  container.style.borderRadius = "10px";
  container.style.fontSize = "14px";
  container.style.zIndex = 10000;
  container.innerHTML = `
    <span id="weather-info">Đang tải thời tiết...</span>
    <button id="weather-close" title="Ẩn">❌</button>
  `;

  const toggleButton = document.createElement("button");
  toggleButton.id = "weather-toggle";
  toggleButton.innerText = "🌤️";
  toggleButton.title = "Hiện thời tiết";
  toggleButton.style.position = "absolute";
  toggleButton.style.top = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.zIndex = 9999;
  toggleButton.style.display = isVisible ? "none" : "block";

  if (isVisible) document.body.appendChild(container);
  document.body.appendChild(toggleButton);

  async function getWeather(lat, lon) {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const data = await res.json();
    const weather = data.current_weather;
    const status = weather.weathercode === 0 ? "Trời quang" : "Nhiều mây";
    document.getElementById(
      "weather-info"
    ).innerText = `🌡 ${weather.temperature}°C – ${status}`;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => getWeather(pos.coords.latitude, pos.coords.longitude),
      () =>
        (document.getElementById("weather-info").innerText =
          "Không thể lấy thời tiết.")
    );
  } else {
    document.getElementById("weather-info").innerText =
      "Trình duyệt không hỗ trợ định vị.";
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "weather-close") {
      localStorage.setItem(toggleKey, "false");
      container.remove();
      toggleButton.style.display = "block";
    }

    if (e.target.id === "weather-toggle") {
      localStorage.setItem(toggleKey, "true");
      document.body.appendChild(container);
      toggleButton.style.display = "none";
    }
  });
})();
// weather-widget.js
