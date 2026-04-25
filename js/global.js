let loadingCount = 0;

function createLoading() {
  let el = document.getElementById("global-loading");

  if (!el) {
    el = document.createElement("div");
    el.id = "global-loading";

    el.innerHTML = `
      <div class="loading-backdrop"></div>
      <div class="loading-content">
        <div class="spinner"></div>
      </div>
    `;

    document.body.appendChild(el);
  }

  return el;
}

function showLoading() {
  loadingCount++;

  const el = createLoading();
  el.style.display = "flex";   // 🔥 บังคับโชว์ตรงนี้
}

function hideLoading() {
  loadingCount--;

  if (loadingCount > 0) return;

  const el = document.getElementById("global-loading");
  if (el) el.style.display = "none";
}
