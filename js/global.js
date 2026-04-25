// ===== LOADING =====
let loadingCount = 0;

function createLoading() {
  let el = document.getElementById("global-loading");

  if (!el) {
    el = document.createElement("div");
    el.id = "global-loading";

    // 🔥 ใส่ style ตรงนี้เลย (กัน CSS พัง)
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

  // 🔥 บังคับ style ตรงนี้เลย
  el.style.display = "flex";
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.zIndex = "999999";

  // backdrop
  const bg = el.querySelector(".loading-backdrop");
  bg.style.position = "absolute";
  bg.style.width = "100%";
  bg.style.height = "100%";
  bg.style.background = "rgba(0,0,0,0.5)";

  // spinner
  const sp = el.querySelector(".spinner");
  sp.style.width = "60px";
  sp.style.height = "60px";
  sp.style.border = "6px solid #ddd";
  sp.style.borderTop = "6px solid #4a7bd0";
  sp.style.borderRadius = "50%";
  sp.style.animation = "spin 0.8s linear infinite";
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
