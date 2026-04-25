const API_URL = "https://script.google.com/macros/s/AKfycbzWR9PT0Sc4yyBjVxmj13tIbCKsoSILLZyTb7Z0eSYd-mLP9H_ubkAcZMTT2oO3L_PU/exec";

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
