// news-ticker.js
(function () {
  const newsBox = document.createElement("div");
  newsBox.id = "news-ticker";
  newsBox.style.position = "fixed";
  newsBox.style.bottom = "0";
  newsBox.style.left = "0";
  newsBox.style.right = "0";
  document.body.appendChild(newsBox);

  newsBox.innerHTML = `<marquee behavior="scroll" direction="left" id="news-content">Đang tải tin tức...</marquee>`;

  async function fetchNews() {
    const rssUrl = "https://vnexpress.net/rss/tin-moi-nhat.rss";
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rssUrl)
    );
    const data = await response.json();
    if (data.status === "ok") {
      const titles = data.items
        .slice(0, 5)
        .map((item) => item.title)
        .join(" ❖ ");
      document.getElementById("news-content").innerText = titles;
    } else {
      document.getElementById("news-content").innerText =
        "Không thể tải tin tức.";
    }
  }

  fetchNews();
})();
// news-ticker.js
(function () {
  const newsBox = document.createElement("div");
  newsBox.id = "news-ticker";
  newsBox.style.position = "absolute"; // hoặc fixed nếu không dùng trên video
  newsBox.style.bottom = "0";
  newsBox.style.left = "0";
  newsBox.style.right = "0";
  newsBox.innerHTML = `
    <marquee behavior="scroll" direction="left" id="news-content">Đang tải tin tức...</marquee>
    <button id="toggle-news" style="position:absolute; right:10px; top:5px;">❌</button>
  `;
  document.body.appendChild(newsBox);

  async function fetchNews() {
    const rssUrl = "https://vnexpress.net/rss/tin-moi-nhat.rss";
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rssUrl)
    );
    const data = await response.json();
    if (data.status === "ok") {
      const titles = data.items
        .slice(0, 5)
        .map((item) => item.title)
        .join(" ❖ ");
      document.getElementById("news-content").innerText = titles;
    } else {
      document.getElementById("news-content").innerText =
        "Không thể tải tin tức.";
    }
  }

  fetchNews();

  document.getElementById("toggle-news").onclick = function () {
    newsBox.style.display = "none";
  };
})();
// news-ticker.js
(function () {
  const tickerId = "news-ticker";
  const toggleKey = "news-ticker-visible";
  const isVisible = localStorage.getItem(toggleKey) !== "false";

  const box = document.createElement("div");
  box.id = tickerId;
  box.style.position = "absolute";
  box.style.bottom = "0";
  box.style.left = "0";
  box.style.right = "0";
  box.style.background = "rgba(0,0,0,0.8)";
  box.style.color = "#fff";
  box.style.padding = "6px 8px";
  box.style.fontSize = "16px";
  box.style.zIndex = 9999;
  box.innerHTML = `
    <marquee id="news-content">Đang tải tin tức...</marquee>
    <button id="news-close" style="position:absolute;top:4px;right:10px;">❌</button>
  `;

  const toggleBtn = document.createElement("button");
  toggleBtn.id = "news-toggle";
  toggleBtn.innerText = "📰";
  toggleBtn.title = "Hiện tin tức";
  toggleBtn.style.position = "absolute";
  toggleBtn.style.bottom = "10px";
  toggleBtn.style.right = "10px";
  toggleBtn.style.zIndex = 9998;
  toggleBtn.style.display = isVisible ? "none" : "block";

  if (isVisible) document.body.appendChild(box);
  document.body.appendChild(toggleBtn);

  async function fetchNews() {
    const rssUrl = "https://vnexpress.net/rss/tin-moi-nhat.rss";
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rssUrl)
    );
    const data = await res.json();
    if (data.status === "ok") {
      const titles = data.items
        .slice(0, 5)
        .map((item) => item.title)
        .join(" ❖ ");
      document.getElementById("news-content").innerText = titles;
    } else {
      document.getElementById("news-content").innerText = "Không thể tải tin.";
    }
  }

  fetchNews();

  document.addEventListener("click", (e) => {
    if (e.target.id === "news-close") {
      localStorage.setItem(toggleKey, "false");
      box.remove();
      toggleBtn.style.display = "block";
    }

    if (e.target.id === "news-toggle") {
      localStorage.setItem(toggleKey, "true");
      document.body.appendChild(box);
      toggleBtn.style.display = "none";
    }
  });
})();
// news-ticker.js
