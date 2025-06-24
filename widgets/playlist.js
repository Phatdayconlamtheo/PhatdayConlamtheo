(function () {
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "60px";
  container.style.left = "10px";
  container.style.background = "#fff";
  container.style.padding = "10px";
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
  container.style.zIndex = 999;

  container.innerHTML = \`
    <strong>🎵 Tâm Pháp:</strong><br>
    <select id="track-select">
      <option value="kinh-sang.mp3">Kinh Thức Tỉnh</option>
      <option value="kinh-trua.mp3">Kinh Hơi Thở</option>
      <option value="kinh-toi.mp3">Kinh Từ Bi</option>
    </select>
    <br><audio id="track-player" controls style="margin-top:5px;width:100%;"></audio>
  \`;

  document.body.appendChild(container);

  const player = document.getElementById("track-player");
  const select = document.getElementById("track-select");

  select.onchange = () => {
    player.src = select.value;
    player.play();
  };
})();