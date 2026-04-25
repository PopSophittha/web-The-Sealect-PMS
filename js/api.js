const API_URL = "https://script.google.com/macros/s/AKfycbxsHCaO0rJUv-xQobPgUX8J5Sk8eShrHpyXo748fodd2wmGphgXGTDF3yqtbJ3ztpvH/exec";

// ===== GET =====
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      url.searchParams.set(k, v);
    }
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
      ...data
    })
  });

  return res.json();
}

// ===== SAFE API =====
async function safeApi(action, params = {}) {
  showLoading();

  try {
    // 🔥 ใช้ GET เหมือน getAvailableRooms ทุกตัว
    const res = await apiGet(action, params);

    // 🔥 normalize response กันพัง
    const data = Array.isArray(res) ? res[0] : res;

    if (!data || data.error) {
      console.warn("API error:", data);
      return null;
    }

    return data;

  } catch (e) {
    console.error(e);
    alert("❌ API error");
    return null;

  } finally {
    hideLoading();
  }
}
