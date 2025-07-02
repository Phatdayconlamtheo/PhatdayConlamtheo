const players = {};
let fadeSpeed = 200;
let musicPlaying = false;
let currentTrack = 0;
let isShuffling = false;
let music = document.getElementById("background-music");
let toast = document.getElementById("toast");

// 🎵 Danh sách bài hát
const playlist = [
  { name: "Thiền Tịnh Âm 1", file: "music/track1.mp3", image: "images/1.jpg" },
  { name: "Tịnh Độ Ca", file: "music/track2.mp3", image: "images/2.jpg" },
  { name: "Niệm Phật", file: "music/track3.mp3", image: "images/3.jpg" }
];

// ✅ Hiện tên bài hát
function updateTrackDisplay() {
  const track = playlist[currentTrack];
  document.getElementById("current-track-name").textContent = `🎵 Đang phát: ${track.name}`;
  document.getElementById("track-image").src = track.image;
  document.getElementById("mini-track").textContent = `🎶 ${track.name}`;
  music.src = track.file;
  if (musicPlaying) music.play();
}

document.getElementById("next-track").onclick = () => {
  if (isShuffling) {
    currentTrack = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrack = (currentTrack + 1) % playlist.length;
  }
  updateTrackDisplay();
};

document.getElementById("toggle-shuffle").onclick = () => {
  isShuffling = !isShuffling;
  document.getElementById("toggle-shuffle").textContent = isShuffling ? "🔀 Ngẫu nhiên: Bật" : "🔀 Ngẫu nhiên: Tắt";
};

document.getElementById("music-toggle").onclick = () => {
  if (!musicPlaying) {
    showToast("🎵 Đang bật nhạc nền");
    musicPlaying = true;
    updateTrackDisplay();
    music.play();
    muteAllVideos();
  } else {
    showToast("⏸️ Tắt nhạc nền");
    music.pause();
    musicPlaying = false;
  }
};

document.getElementById("mute-all").onclick = () => {
  showToast("🛑 Tắt tất cả âm thanh");
  music.pause();
  musicPlaying = false;
  muteAllVideos();
};

document.getElementById("toggle-theme").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// 🍞 Toast thông báo
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// 🔇 Tắt tiếng tất cả video
function muteAllVideos() {
  Object.values(players).forEach(player => {
    safeMute(player);
  });
}

// ✅ Logic smart mute
function safeMute(player) {
  if (!player.isMuted()) player.mute();
  const iframe = player.getIframe();
  iframe.parentElement.classList.remove("highlighted");
  localStorage.setItem(`muteState_${iframe.id}`, "muted");
}

function safeUnmute(player) {
  muteAllVideos();
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
  }
  player.unMute();
  const iframe = player.getIframe();
  iframe.parentElement.classList.add("highlighted");
  localStorage.setItem(`muteState_${iframe.id}`, "unmuted");
  showToast("🔊 Chỉ một âm thanh được phát");
}

// 🎬 Load YouTube API
function onYouTubeIframeAPIReady() {
  document.querySelectorAll("[data-player-id]").forEach(block => {
    const playerId = block.dataset.playerId;
    const videoId = block.dataset.videoId;
    const iframe = block.querySelector("iframe");
    const btn = block.querySelector(".mute-toggle");

    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1`;

    players[playerId] = new YT.Player(playerId, {
      events: {
        onReady: () => {
          const player = players[playerId];
          const saved = localStorage.getItem(`muteState_${playerId}`);
          if (saved === "unmuted") {
            safeUnmute(player);
          } else {
            safeMute(player);
          }

          btn.onclick = () => {
            if (player.isMuted()) {
              safeUnmute(player);
            } else {
              safeMute(player);
            }
          };
        }
      }
    });
  });
}
