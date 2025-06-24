(function () {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.altKey && e.key === "p") {
      const box = document.createElement("div");
      box.innerHTML = \`
        <div style='background:#fff;padding:20px;position:fixed;top:20%;left:50%;transform:translateX(-50%);
                     box-shadow:0 0 15px rgba(0,0,0,0.3);z-index:10000;border-radius:10px;width:300px;'>
          <h3>🔐 Admin Tĩnh Tâm</h3>
          <p><b>1.</b> Tải video mới nền</p>
          <p><b>2.</b> Nhập lời Phật dạy hôm nay</p>
          <p><i>(Tính năng nâng cấp sau...)</i></p>
          <button onclick="this.parentElement.parentElement.remove()">Đóng</button>
        </div>\`;
      document.body.appendChild(box);
    }
  });
})();