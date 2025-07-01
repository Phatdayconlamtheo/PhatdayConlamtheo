window.addEventListener('DOMContentLoaded', () => {
  const players = {};
  let musicPlaying = false;
  const backgroundMusic = document.getElementById('background-music');
  const musicBtn = document.getElementById('music-toggle');

  window.onYouTubeIframeAPIReady = () => {
    document.querySelectorAll('.video-block, .video-full-block').forEach(block => {
      const playerId = block.dataset.playerId;
      const videoId = block.dataset.videoId;
      const iframe = block.querySelector('iframe');
      const button = block.querySelector('.mute-toggle');

      iframe.id = playerId;
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1`;

      players[playerId] = new YT.Player(playerId, {
        events: {
          onReady: () => setupPlayer(playerId, iframe, button)
        }
      });
    });
  };

  function setupPlayer(playerId, iframe, button) {
    const player = players[playerId];
    const key = `muteState_${playerId}`;
    const saved = localStorage.getItem(key);

    const applyMuteState = (isMuted) => {
      if (isMuted) {
        player.mute();
        button.textContent = '🔇 Tắt tiếng';
        localStorage.setItem(key, 'muted');
      } else {
        Object.entries(players).forEach(([id, p]) => {
          if (id !== playerId) {
            p.mute();
            localStorage.setItem(`muteState_${id}`, 'muted');
            const btn = document.querySelector(`#${id}`).parentElement.querySelector('.mute-toggle');
            btn.textContent = '🔇 Tắt tiếng';
          }
        });
        if (backgroundMusic) {
          backgroundMusic.pause();
          musicPlaying = false;
          musicBtn.textContent = '🎵 Bật nhạc nền';
        }
        player.unMute();
        button.textContent = '🔊 Đang phát tiếng';
        localStorage.setItem(key, 'unmuted');
      }
    };

    applyMuteState(saved !== 'unmuted');

    button.addEventListener('click', () => {
      const isMuted = player.isMuted();
      applyMuteState(!isMuted);
    });
  }

  musicBtn.addEventListener('click', () => {
    if (!musicPlaying) {
      if (backgroundMusic) {
        backgroundMusic.play();
        musicBtn.textContent = '⏸️ Tắt nhạc nền';
        musicPlaying = true;
      }

      Object.entries(players).forEach(([id, player]) => {
        player.mute();
        localStorage.setItem(`muteState_${id}`, 'muted');
        const btn = document.querySelector(`#${id}`).parentElement.querySelector('.mute-toggle');
        btn.textContent = '🔇 Tắt tiếng';
      });
    } else {
      if (backgroundMusic) {
        backgroundMusic.pause();
        musicBtn.textContent = '🎵 Bật nhạc nền';
        musicPlaying = false;
      }
    }
  });
});
