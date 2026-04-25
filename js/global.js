// ===== LOADING =====
let loadingCount = 0;

function createLoading() {
  let el = document.getElementById("global-loading");

  if (!el) {
    el = document.createElement("div");
    el.id = "global-loading";

    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.display = "none";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.background = "rgba(0,0,0,0.5)";
    el.style.zIndex = "999999";

    el.innerHTML = `
      <div style="
        width:60px;
        height:60px;
        border:6px solid #ddd;
        border-top:6px solid #4a7bd0;
        border-radius:50%;
        animation: spin 0.8s linear infinite;
      "></div>
    `;

    document.body.appendChild(el);
  }

  return el;
}

function showLoading() {
  loadingCount++;
  const el = createLoading();
  el.style.display = "flex";
}

function hideLoading() {
  loadingCount--;

  if (loadingCount <= 0) {
    loadingCount = 0;
    const el = document.getElementById("global-loading");
    if (el) el.style.display = "none";
  }
}
