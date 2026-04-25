// ===== GLOBAL STATE =====
let isLoading = false;

// ===== LOADING =====
function showLoading() {
  if (isLoading) return;
  isLoading = true;

  let el = document.getElementById("global-loading");
  if (!el) {
    el = document.createElement("div");
    el.id = "global-loading";
    el.innerHTML = `
      <div class="loading-box">
        <div class="spinner"></div>
        <div>Loading...</div>
      </div>
    `;
    document.body.appendChild(el);
  }

  el.style.display = "flex";
}

function hideLoading() {
  isLoading = false;
  const el = document.getElementById("global-loading");
  if (el) el.style.display = "none";
}

// ===== BUTTON LOCK =====
function lockButton(btn) {
  if (!btn) return;
  btn.disabled = true;
  btn.dataset.originalText = btn.innerText;
  btn.innerText = "Loading...";
}

function unlockButton(btn) {
  if (!btn) return;
  btn.disabled = false;
  btn.innerText = btn.dataset.originalText || "Submit";
}

// ===== SAFE API CALL =====
async function safeApi(action, payload = null, btn = null) {
  try {
    showLoading();
    lockButton(btn);

    let result;

    if (payload) {
      result = await apiPost(action, payload);
    } else {
      result = await apiGet(action);
    }

    return result;

  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาด");
  } finally {
    hideLoading();
    unlockButton(btn);
  }
}
