const players = {};
let musicPlaying = false;
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-toggle');
const muteAllBtn = document.getElementById('mute-all');
const statusMsg = document.getElementById('status-msg');
const currentTrack = document.getElementById('current-track-name');
const trackImg = document.getElementById('track-image');
const nextBtn = document.getElementById('next-track');
const shuffleBtn = document.getElementById('toggle-shuffle');

let playlist = [
  { name: "Suối nguồn tĩnh lặng", file: "music/1.mp3", image: "images/1.jpg" },
  { name: "Trầm hương lan tỏa", file: "music/2.mp3", image: "images/2.jpg" },
  { name: "Sen nở bên hồ", file: "music/3.mp3", image: "images/3.jpg" },
  { name: "Mây trôi nhè nhẹ", file: "music/4.mp3", image: "images/4.jpg" },
  { name: "Nắng chiều tịnh độ", file: "music/5.mp3", image: "images/5.jpg" },
  { name: "Bình minh trên núi", file: "music/6.mp3", image: "images/6.jpg" },
  { name: "Dòng sông an lạc", file: "music/7.mp3", image: "images/7.jpg" },
  { name: "Tiếng chuông chùa xa", file: "music/8.mp3", image: "images/8.jpg" },
  { name: "Tĩnh tâm nơi cửa Phật", file: "music/9.mp3", image: "images/9.jpg" },
  { name: "Thiền định thanh cao", file: "music/10.mp3", image: "images/10.jpg" }
];

let currentTrackIndex = 0;
let isShuffle = false;

function loadTrack(index) {
  const track = playlist[index];
  music.src = track.file;
  currentTrack.textContent = `🎵 Đang phát: ${track.name}`;
  trackImg.src = track.image;
}

function playTrack(index) {
  currentTrackIndex = index;
  loadTrack(index);
  music.play();
  musicPlaying = true;
  musicBtn.textContent = '⏸️ Tắt nhạc nền';
}

function nextTrack() {
  if (isShuffle) {
    currentTrackIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  }
  playTrack(currentTrackIndex);
}

music.addEventListener('ended', nextTrack);

musicBtn.addEventListener('click', () => {
  if (!musicPlaying) {
    playTrack(currentTrackIndex);
    Object.entries(players).forEach(([id, p]) => {
      safeMute(p);
      localStorage.setItem(`muteState_${id}`, 'muted');
      document.querySelector(`#${id}`).parentElement.querySelector('.mute-toggle').textContent = '🔇 Tắt tiếng';
      document.querySelector(`#${id}`).parentElement.classList.remove('active-video');
    });
    statusMsg.textContent = '🎧 Chỉ một âm thanh được phép tại một thời điểm';
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.textContent = '🎵 Bật nhạc nền';
    statusMsg.textContent = '';
  }
});

nextBtn.addEventListener('click', nextTrack);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.textContent = `🔀 Ngẫu nhiên: ${isShuffle ? 'Bật' : 'Tắt'}`;
});

muteAllBtn.addEventListener('click', () => {
  music.pause();
  musicPlaying = false;
  musicBtn.textContent = '🎵 Bật nhạc nền';
  Object.entries(players).forEach(([id, p]) => {
    safeMute(p);
    localStorage.setItem(`muteState_${id}`, 'muted');
    document.querySelector(`#${id}`).parentElement.querySelector('.mute-toggle').textContent = '🔇 Tắt tiếng';
    document.querySelector(`#${id}`).parentElement.classList.remove('active-video');
  });
  statusMsg.textContent = '';
});

// Đảm bảo mute hoạt động đúng lúc player đã ready
function safeMute(player) {
  const tryMute = setInterval(() => {
    if (player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.mute();
      clearInterval(tryMute);
    }
  }, 100);
}

function safeUnmute(player) {
  const tryUnmute = setInterval(() => {
    if (player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.unMute();
      clearInterval(tryUnmute);
    }
  }, 100);
}

// Khởi tạo iframe API
function onYouTubeIframeAPIReady() {
  document.querySelectorAll('.video-block').forEach(block => {
    const playerId = block.dataset.playerId;
    const videoId = block.dataset.videoId;
    const iframe = block.querySelector('iframe');
    const button = block.querySelector('.mute-toggle');

    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1`;

    const player = new YT.Player(playerId, {
      events: {
        onReady: (event) => {
          players[playerId] = event.target;
          const saved = localStorage.getItem(`muteState_${playerId}`);
          if (saved === 'unmuted') {
            safeUnmute(event.target);
            button.textContent = '🔊 Đang phát tiếng';
            block.classList.add('active-video');
          } else {
            safeMute(event.target);
            button.textContent = '🔇 Tắt tiếng';
            block.classList.remove('active-video');
          }

          button.addEventListener('click', () => {
            if (event.target.isMuted()) {
              music.pause();
              musicPlaying = false;
              musicBtn.textContent = '🎵 Bật nhạc nền';

              Object.entries(players).forEach(([id, p]) => {
                if (id !== playerId) {
                  safeMute(p);
                  localStorage.setItem(`muteState_${id}`, 'muted');
                  document.querySelector(`#${id}`).parentElement.querySelector('.mute-toggle').textContent = '🔇 Tắt tiếng';
                  document.querySelector(`#${id}`).parentElement.classList.remove('active-video');
                }
              });

              safeUnmute(event.target);
              localStorage.setItem(`muteState_${playerId}`, 'unmuted');
              button.textContent = '🔊 Đang phát tiếng';
              block.classList.add('active-video');
              statusMsg.textContent = '🎧 Chỉ một âm thanh được phép tại một thời điểm';
            } else {
              safeMute(event.target);
              localStorage.setItem(`muteState_${playerId}`, 'muted');
              button.textContent = '🔇 Tắt tiếng';
              block.classList.remove('active-video');
              statusMsg.textContent = '';
            }
          });
        }
      }
    });
  });
}
