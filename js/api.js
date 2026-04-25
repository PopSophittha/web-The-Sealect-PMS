const API_URL = "https://script.google.com/macros/s/AKfycbxL9_kdBZVZl4lV9JRgctckfj7EZ6FALi1zE9hWa0-JoWROg1zL15AfRCgGgGFFCTnc/exec";

async function apiGet(action, params = {}) {
  const url = new URL(API_URL);
  url.searchParams.set("action", action);

  Object.keys(params).forEach(k => {
    url.searchParams.set(k, params[k]);
  });

  const res = await fetch(url);
  return res.json();
}

async function apiPost(action, payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ action, payload })
  });
  return res.json();
}

async function safeApi(action, data=null) {
  showLoading();

  try {
    let res;

    if (data) {
      res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ action, data })
      });
    } else {
      res = await fetch(`${API_URL}?action=${action}`);
    }

    return await res.json();

  } catch (e) {
    alert("API error");
    console.error(e);
  } finally {
    hideLoading();
  }
}
