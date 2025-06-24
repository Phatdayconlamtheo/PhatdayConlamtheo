(async function () {
  const el = document.getElementById("weather-widget");
  el.innerText = "🌤️ Đang tải thời tiết...";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      const w = data.current_weather;
      const status = w.weathercode === 0 ? "Trời quang" : "Mây/mưa";
      el.innerText = `🌡 ${w.temperature}°C – ${status}`;
    }, () => {
      el.innerText = "❗ Không thể lấy thời tiết";
    });
  } else {
    el.innerText = "⚠️ Trình duyệt không hỗ trợ định vị";
  }
})();