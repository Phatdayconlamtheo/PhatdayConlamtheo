(async function () {
  const el = document.getElementById("news-ticker");
  el.innerHTML = "📰 Đang tải tin tức...";

  const url = "https://vnexpress.net/rss/tin-moi-nhat.rss";
  const api =
    "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(url);

  try {
    const res = await fetch(api);
    const data = await res.json();
    if (data.status === "ok") {
      const titles = data.items
        .slice(0, 7)
        .map((i) => i.title)
        .join(" ❖ ");
      el.innerHTML = `<marquee>${titles}</marquee>`;
    } else {
      el.innerText = "❌ Không thể tải tin tức.";
    }
  } catch (e) {
    el.innerText = "🛑 Lỗi kết nối đến nguồn tin.";
  }
})();
