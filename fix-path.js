// fix-path.js
document.querySelectorAll('script[src^="/"]').forEach((el) => {
  el.src = "." + el.getAttribute("src"); // thêm dấu chấm trước
});
