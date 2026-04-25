const API_URL = "https://script.google.com/macros/s/AKfycbwkSkVH7ApglWdUGVC2QSFgnhZIx5xKjCB3vsi8UGIPYZatdWtE-97tZl1M3iIzMO_Y/exec";

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
