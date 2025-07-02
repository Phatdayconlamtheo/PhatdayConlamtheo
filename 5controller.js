const players = {};
let currentTrack = 0;
let isShuffle = false;
let musicPlaying = false;
let playlist = [];

const music = document.getElementById("background-music");
const trackName = document.getElementById("current-track-name");
const trackImage = document.getElementById("track-image");
const musicBtn = document.getElementById("music-toggle");

async function loadPlaylist() {
  const res = await fetch("music/playlist.json");
  playlist = await res.json();
  setTrack(0);
}

function setTrack(index) {
  currentTrack = index;
  const track = playlist[index];
  music.src = track.file;
  trackName.textContent = "🎵 Đang phát: " + track.title;
  trackImage.src = track.image || "images/default.jpg";
  if (musicPlaying) music.play();
}

document.getElementById("next-track").onclick = () => {
  const next = isShuffle ? Math.floor(Math.random() * playlist.length) : (currentTrack + 1) % playlist.length;
  setTrack(next);
};

document.getElementById("toggle-shuffle").onclick = function () {
  isShuffle = !isShuffle;
  this.textContent = `🔀 Ngẫu nhiên: ${isShuffle ? "Bật" : "Tắt"}`;
};

musicBtn.onclick = () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = "🎵 Bật nhạc nền";
  } else {
    Object.values(players).forEach(p => p.mute());
    music.play();
    musicPlaying = true;
    musicBtn.textContent = "⏸️ Tắt nhạc nền";
  }
};

document.getElementById("mute-all").onclick = () => {
  Object.values(players).forEach(p => p.mute());
  music.pause();
  musicPlaying = false;
  musicBtn.textContent = "🎵 Bật nhạc nền";
};

window.onYouTubeIframeAPIReady = () => {
  document.querySelectorAll('.video-block, .video-full-block').forEach(block => {
    const pid = block.dataset.playerId;
    const vid = block.dataset.videoId;
    const iframe = block.querySelector('iframe');
    const btn = block.querySelector('.mute-toggle');

    iframe.id = pid;
    iframe.src = `https://www.youtube.com/embed/${vid}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${vid}&controls=0`;

    players[pid] = new YT.Player(pid, {
      events: {
        onReady: () => {
          btn.onclick = () => {
            if (players[pid].isMuted()) {
              Object.entries(players).forEach(([id, p]) => {
                p.mute();
                const el = document.querySelector(`#${id}`).parentElement;
                el.classList.remove('highlighted');
              });
              players[pid].unMute();
              block.classList.add("highlighted");
              music.pause();
              musicPlaying = false;
              musicBtn.textContent = "🎵 Bật nhạc nền";
            } else {
              players[pid].mute();
              block.classList.remove("highlighted");
            }
          };
        }
      }
    });
  });
};

document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

loadPlaylist();