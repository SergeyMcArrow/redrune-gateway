export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = "https://redrune-market.yxu-npocum.workers.dev" + url.pathname + url.search;

  const headers = new Headers(req.headers);
  headers.set("Host", "redrune-market.yxu-npocum.workers.dev");
  headers.set("X-Forwarded-Host", url.host);

  const init = {
    method: req.method,
    headers: headers,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = await req.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
