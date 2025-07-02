
// TTS demo logic
const ttsContainer = document.getElementById("tts-container");
const ttsBtn = document.getElementById("tts-toggle");
const synth = window.speechSynthesis;

const text = `Ai giữ được tâm thanh, người ấy đã bước vào cõi Phật. Hãy lắng nghe trong chánh niệm.`;
let words = text.split(" ");
let currentIndex = 0;
let speaking = false;

words.forEach(word => {
  const span = document.createElement("span");
  span.textContent = word + " ";
  ttsContainer.appendChild(span);
});

function speakNext() {
  if (currentIndex >= words.length) return;
  const utter = new SpeechSynthesisUtterance(words[currentIndex]);
  utter.onstart = () => highlight(words[currentIndex]);
  utter.onend = () => {
    currentIndex++;
    speakNext();
  };
  synth.speak(utter);
}

function highlight(word) {
  const spans = ttsContainer.querySelectorAll("span");
  spans.forEach(span => span.classList.remove("active"));
  spans[currentIndex].classList.add("active");
}

ttsBtn.onclick = () => {
  if (!speaking) {
    speaking = true;
    currentIndex = 0;
    speakNext();
  } else {
    synth.cancel();
    speaking = false;
  }
};
