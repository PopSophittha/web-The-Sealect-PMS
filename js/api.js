const API_URL = "https://script.google.com/macros/s/AKfycbyKRSbCLvhgN08FEPx1tu7Z1i53PvEz1FLtu--eKqAqlFaA2_9XIWTetr2bv54v5Yu6/exec";

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
