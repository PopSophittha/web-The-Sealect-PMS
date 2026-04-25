const API_URL = "YOUR_SCRIPT_WEB_APP_URL";

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
