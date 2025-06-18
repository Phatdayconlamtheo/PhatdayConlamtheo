let srtEntries = [];
let srtIndex = 1;
let currentVoice, currentRate;
let voices = [];

function getTimestamp(ms) {
  const sec = Math.floor(ms / 1000);
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  const msStr = String(ms % 1000).padStart(3, "0");
  return `${h}:${m}:${s},${msStr}`;
}

function populateVoices() {
  voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = "";
  voices.forEach((v, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${v.name} (${v.lang})`;
    voiceSelect.appendChild(option);
  });
}
window.speechSynthesis.onvoiceschanged = populateVoices;

function autoSelectVNVoice(gender) {
  const vnVoices = voices.filter((v) => v.lang.includes("vi"));
  const femaleKeywords = ["female", "nữ", "Google Tiếng Việt"];
  const maleKeywords = ["male", "nam"];
  let selected = null;

  if (gender === "female") {
    selected = vnVoices.find((v) =>
      femaleKeywords.some((k) => v.name.toLowerCase().includes(k.toLowerCase()))
    );
  } else {
    selected = vnVoices.find((v) =>
      maleKeywords.some((k) => v.name.toLowerCase().includes(k.toLowerCase()))
    );
  }

  const voiceSelect = document.getElementById("voiceSelect");
  if (selected) {
    const index = voices.indexOf(selected);
    voiceSelect.selectedIndex = index;
    document.getElementById("log").innerText =
      "✅ Đã chọn giọng tiếng Việt: " + selected.name;
  } else {
    alert("Không tìm thấy giọng " + gender + " tiếng Việt.");
  }
}

document.getElementById("rate").addEventListener("input", () => {
  document.getElementById("rateVal").textContent =
    parseFloat(document.getElementById("rate").value).toFixed(1) + "x";
});

function splitSentences(text) {
  return text.match(/[^.!?\\n]+[.!?\\n]?/g) || [];
}

function speakWithMusic(sentence, index, sentences) {
  const utter = new SpeechSynthesisUtterance(sentence);
  utter.voice = currentVoice;
  utter.rate = currentRate;
  const start = performance.now();
  utter.onstart = () => {
    window.srtStartTime = start;
  };
  utter.onend = () => {
    const end = performance.now();
    srtEntries.push({
      index: srtIndex++,
      start: getTimestamp(window.srtStartTime),
      end: getTimestamp(end),
      text: sentence.trim(),
    });
    if (index + 1 < sentences.length) {
      speakWithMusic(sentences[index + 1], index + 1, sentences);
    } else {
      document.getElementById("log").innerText =
        "✅ Hoàn tất đọc và tạo phụ đề.";
    }
  };
  speechSynthesis.speak(utter);
}

function startWithMusic() {
  const text = document.getElementById("text").value;
  const file = document.getElementById("bgMusic").files[0];
  if (!text.trim()) return;
  if (!file) {
    alert("Vui lòng chọn nhạc nền.");
    return;
  }

  const audioURL = URL.createObjectURL(file);
  const bgAudio = new Audio(audioURL);
  bgAudio.volume = 0.3;
  bgAudio.play();

  const sentences = splitSentences(text);
  srtEntries = [];
  srtIndex = 1;
  const voiceIndex =
    parseInt(document.getElementById("voiceSelect").value) || 0;
  currentVoice =
    speechSynthesis.getVoices()[voiceIndex] || speechSynthesis.getVoices()[0];
  currentRate = parseFloat(document.getElementById("rate").value) || 1.0;
  speakWithMusic(sentences[0], 0, sentences);
}

function downloadSRT() {
  const srtText = srtEntries
    .map((e) => `${e.index}\\n${e.start} --> ${e.end}\\n${e.text}\\n`)
    .join("\\n");
  const blob = new Blob([srtText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subtitles.srt";
  a.click();
}

function exportZIP() {
  const text = document.getElementById("text").value;
  const srtText = srtEntries
    .map((e) => `${e.index}\\n${e.start} --> ${e.end}\\n${e.text}\\n`)
    .join("\\n");
  const zip = new JSZip();
  zip.file("script.txt", text);
  zip.file("subtitles.srt", srtText);
  zip.generateAsync({ type: "blob" }).then((content) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "TTS_Project_V9.3.zip";
    a.click();
  });
}
