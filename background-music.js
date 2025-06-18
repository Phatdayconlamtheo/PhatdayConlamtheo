const music = document.getElementById("bg-music");
music.volume = 0.1;

document.getElementById("toggle-music").addEventListener("change", function () {
  if (this.checked) {
    music.play();
  } else {
    music.pause();
  }
});
!UPDATE;
const music = document.getElementById("bg-music");
music.volume = 0.1;

// Tự động dừng nhạc nếu video bật tiếng
const video = document.getElementById("my-video");
const observer = new MutationObserver(() => {
  if (!video.muted) music.pause();
  else if (document.getElementById("toggle-music").checked) music.play();
});
observer.observe(video, { attributes: true, attributeFilter: ["muted"] });

// Toggle thủ công
document.getElementById("toggle-music").addEventListener("change", function () {
  if (this.checked && video.muted) music.play();
  else music.pause();
});
