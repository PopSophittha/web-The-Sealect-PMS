// ===== LOADING =====
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
  el.style.display = "flex";
}

function hideLoading() {
  loadingCount--;
  if (loadingCount > 0) return;

  const el = document.getElementById("global-loading");
  if (el) el.style.display = "none";
}

// ===== SAFE API =====
async function safeApi(action, payload = null) {
  const start = Date.now();

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
    throw err;

  } finally {
    const elapsed = Date.now() - start;

    const MIN_LOADING = 500; // 👈 อย่างน้อย 0.5 วิ

    if (elapsed < MIN_LOADING) {
      setTimeout(hideLoading, MIN_LOADING - elapsed);
    } else {
      hideLoading();
    }
  }
}
