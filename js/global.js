let loadingCount = 0;

function createLoading() {
  if (document.getElementById("global-loading")) return;

  const el = document.createElement("div");
  el.id = "global-loading";

  el.innerHTML = `
    <div class="loading-backdrop"></div>
    <div class="loading-content">
      <div class="spinner"></div>
    </div>
  `;

  document.body.appendChild(el);
}

function showLoading() {
  loadingCount++;
  createLoading();

  const el = document.getElementById("global-loading");
  el.style.display = "flex";
}

function hideLoading() {
  loadingCount--;
  if (loadingCount > 0) return;

  const el = document.getElementById("global-loading");
  if (el) el.style.display = "none";
}

async function safeApi(action, payload = null) {
  try {
    showLoading();

    let result;
    if (payload) {
      result = await apiPost(action, payload);
    } else {
      result = await apiGet(action);
    }

    return result;

  } catch (err) {
    console.error(err);
    alert("❌ เกิดข้อผิดพลาด");
  } finally {
    hideLoading();
  }
}
