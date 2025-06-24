(function () {
  const btn = document.createElement("button");
  btn.innerText = "📷 Chia sẻ niềm an lạc";
  btn.style.position = "absolute";
  btn.style.bottom = "55px";
  btn.style.right = "0px";
  btn.style.zIndex = 20;
  btn.style.padding = "8px 12px";
  btn.style.background = "transparent";
  btn.style.color = "RED";
  btn.style.borderRadius = "8px";
  btn.style.border = "AUTO";
  btn.style.cursor = "pointer";
  document.body.appendChild(btn);

  btn.onclick = async () => {
    const html2canvasURL =
      "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    if (!window.html2canvas) {
      const script = document.createElement("script");
      script.src = html2canvasURL;
      script.onload = capture;
      document.body.appendChild(script);
    } else {
      capture();
    }

    function capture() {
      html2canvas(document.body).then((canvas) => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "tam-an.png";
        a.click();
      });
    }
  };
})();
