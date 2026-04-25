const API_URL = "https://script.google.com/macros/s/AKfycbxsHCaO0rJUv-xQobPgUX8J5Sk8eShrHpyXo748fodd2wmGphgXGTDF3yqtbJ3ztpvH/exec";

// ===== GET =====
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  Object.keys(params).forEach(k => {
    url.searchParams.set(k, params[k]);
  });

  const res = await fetch(url);
  return res.json();
}

// ===== POST =====
async function apiPost(action, data = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action,
      ...data   // 🔥 flatten
    })
  });

  return res.json();
}

// ===== SAFE API =====
async function safeApi(action, params = null) {
  showLoading();

  try {
    let result;

    if (params) {
      // ถ้ามี params → ใช้ GET
      result = await apiGet(action, params);
    } else {
      result = await apiGet(action);
    }

    return result;

  } catch (e) {
    console.error(e);
    alert("❌ API error");
  } finally {
    hideLoading();
  }
}
