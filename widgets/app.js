function goTo(section) {
  const main = document.getElementById("main-content");
  main.innerHTML = `<iframe src="${section}/index.html" style="width:100%;height:600px;border:none;"></iframe>`;
}