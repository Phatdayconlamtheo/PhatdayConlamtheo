function updateClock() {
  const now = new Date();
  const el = document.getElementById("clock-widget");
  const time = now.toLocaleTimeString("vi-VN");
  const date = now.toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  el.innerText = `🕒 ${time} – ${date}`;
  const weatherBox = document.createElement("div");
  weatherBox.id = "weather-widget";
  weatherBox.style.position = "fixed";
  weatherBox.style.top = "380px";
  weatherBox.style.left = "1500px";
  weatherBox.style.right = "0";
  document.body.appendChild(weatherBox);
}
setInterval(updateClock, 1000);
updateClock();