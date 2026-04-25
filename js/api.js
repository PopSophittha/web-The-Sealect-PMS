const API_URL = "https://script.google.com/macros/s/AKfycbzJ7VIlnNgnAINLqBRGDYe7X1I7gzwrjN7oumTjZGRGg9GLKCbl3XZW6I2xEKy0TRQ1/exec";

// ===== GET =====
async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, v);
    }
  });

  console.log("FINAL URL:", url.toString());

  const res = await fetch(url);

  // 🔥 กัน API พังแบบไม่รู้ตัว
  if (!res.ok) {
    throw new Error("HTTP error " + res.status);
  }

  const json = await res.json();
  console.log("API RAW:", json);

  return json;
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
    const res = await apiGet(action, params);

    // 🔥 อย่ารีบ normalize → เช็คก่อน
    if (!res) {
      console.warn("❌ API empty response");
      return null;
    }

    if (res.error) {
      console.error("❌ API error:", res);
      return res; // 👈 สำคัญ: ส่งกลับไปให้หน้าเว็บเห็น
    }
    
    return res;

  } catch (e) {
    console.error("❌ FETCH ERROR:", e);
    alert("API error");
    return null;

  } finally {
    hideLoading();
  }
}
