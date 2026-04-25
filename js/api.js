const API_URL = "https://script.google.com/macros/s/AKfycbzUK9WVOwQxt9JdNXEoGRDnjF0JWxl4C_yVYol5sTKxJRd6bS3wqR3gjJCIC-p8gyM/exec";

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
