(function () {
  let timer = setTimeout(alertUser, 15 * 60 * 1000);
  function reset() {
    clearTimeout(timer);
    timer = setTimeout(alertUser, 15 * 60 * 1000);
  }
  function alertUser() {
    const bell = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_9c8c6128d2.mp3");
    bell.play();
    alert("🔔 Bạn còn ở đó không? Hãy quay về với hơi thở...");
  }
  document.addEventListener("mousemove", reset);
  document.addEventListener("keypress", reset);
})();