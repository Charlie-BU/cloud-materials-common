const PRODUCTION_ORIGINS = new Set(['https://charlie-bu.github.io']);

const SYSTEM_PROMPT = `You are an icon-search assistant for a React icon library.
Select icons that best express the user's intent from the supplied icon-name catalog.
Return JSON only, with exactly this shape:
{"iconNames":["IconExample"],"reason":"a short Chinese explanation"}
Rules:
- Select 1 to 12 names only from the catalog, with no invented names.
- Prefer semantically precise icons; include alternatives only when they are genuinely useful.
- The user may write Chinese or English.
- Do not return Markdown, code fences, or any extra keys.`;

function isLocalDevelopmentOrigin(origin) {
  try {
    const originUrl = new URL(origin);
    return originUrl.protocol === 'http:'
      && (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1');
  } catch {
    return false;
  }
}

function corsHeaders(origin) {
  const isLocalDevelopment = isLocalDevelopmentOrigin(origin);
  const allowedOrigin = PRODUCTION_ORIGINS.has(origin) || isLocalDevelopment ? origin : 'https://charlie-bu.github.io';

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function parseModelJson(content) {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('模型未返回 JSON。');
  return JSON.parse(match[0]);
}

export default {
  async fetch(request, env) {
    const headers = corsHeaders(request.headers.get('Origin') || '');
    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405, headers);
    if (!env.ARK_API_KEY) return json({ error: 'AI 服务尚未配置 ARK_API_KEY。' }, 503, headers);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: '请求必须是 JSON。' }, 400, headers);
    }

    const query = typeof body.query === 'string' ? body.query.trim() : '';
    const iconNames = Array.isArray(body.iconNames)
      ? body.iconNames.filter(name => typeof name === 'string' && /^Icon[A-Za-z0-9]+$/.test(name))
      : [];
    if (!query || query.length > 300 || !iconNames.length || iconNames.length > 2000) {
      return json({ error: '搜索内容或图标目录无效。' }, 400, headers);
    }

    const catalog = iconNames.join(', ');
    const arkResponse = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.ARK_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.ARK_MODEL || 'deepseek-v4-flash-ga-260731',
        temperature: 0.1,
        max_tokens: 350,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `用户需求：${query}\n\n可选图标目录：${catalog}` },
        ],
      }),
    });

    if (!arkResponse.ok) {
      return json({ error: '火山方舟请求失败，请稍后重试。' }, 502, headers);
    }

    try {
      const arkPayload = await arkResponse.json();
      const result = parseModelJson(arkPayload.choices?.[0]?.message?.content || '');
      const allowedNames = new Set(iconNames);
      const uniqueNames = [...new Set(result.iconNames || [])]
        .filter(name => typeof name === 'string' && allowedNames.has(name))
        .slice(0, 12);
      return json({
        iconNames: uniqueNames,
        reason: typeof result.reason === 'string' ? result.reason.slice(0, 160) : 'AI 已按语义筛选图标。',
      }, 200, headers);
    } catch {
      return json({ error: 'AI 返回内容无法解析，请重试。' }, 502, headers);
    }
  },
};
