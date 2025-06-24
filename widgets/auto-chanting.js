(function () {
  const hours = new Date().getHours();
  const chants = {
    5: { file: "kinh-sang.mp3", label: "Kinh Thức Tỉnh" },
    12: { file: "kinh-trua.mp3", label: "Kinh Hơi Thở An Tịnh" },
    20: { file: "kinh-toi.mp3", label: "Kinh Từ Bi" }
  };
  if (chants[hours]) {
    const player = document.createElement("audio");
    player.src = chants[hours].file;
    player.autoplay = true;
    player.volume = 0.9;
    document.body.appendChild(player);
    const label = document.createElement("div");
    label.innerText = "📿 Đang tụng: " + chants[hours].label;
    label.style.position = "fixed";
    label.style.top = "50px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.background = "#f8f8f8";
    label.style.padding = "10px 20px";
    label.style.borderRadius = "8px";
    label.style.zIndex = 1000;
    label.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    document.body.appendChild(label);
  }
})();