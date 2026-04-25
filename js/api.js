const API_URL = "https://script.google.com/macros/s/AKfycbzJ7VIlnNgnAINLqBRGDYe7X1I7gzwrjN7oumTjZGRGg9GLKCbl3XZW6I2xEKy0TRQ1/exec";

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  console.log("🌐 GET:", url.toString());
  const data = await fetchJson(url);
  console.log("📦 RAW:", data);
  return data;
}

async function apiPost(action, data = {}) {
  console.log("🌐 POST:", action, data);
  const res = await fetchJson(API_URL, {
    method: "POST",
    body: JSON.stringify({ action, ...data })
  });
  console.log("📦 RAW:", res);
  return res;
}

async function apiOne(action, params = {}) {
  showLoading();
  try {
    const res = await apiGet(action, params);
    if (!res) throw new Error("Empty response");
    if (res.error) throw new Error(res.error);
    return res;
  } catch (e) {
    console.error(e);
    alert(e.message);
    return null;
  } finally {
    hideLoading();
  }
}

async function apiList(action, params = {}) {
  showLoading();
  try {
    const res = await apiGet(action, params);
    if (!Array.isArray(res)) throw new Error("Expected array");
    return res;
  } catch (e) {
    console.error(e);
    alert(e.message);
    return [];
  } finally {
    hideLoading();
  }
}
