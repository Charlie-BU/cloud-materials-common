import React, { useEffect, useMemo, useState } from 'react';
import * as IconBox from '@cloud-materials/common/ve-o-iconbox';

const PAGE_SIZE = 72;
const AI_SEARCH_ENDPOINT = import.meta.env.VITE_AI_ICON_SEARCH_ENDPOINT;
const iconEntries = Object.entries(IconBox)
  .filter(([name, Icon]) => name.startsWith('Icon') && typeof Icon === 'object')
  .sort(([left], [right]) => left.localeCompare(right));

type IconEntry = [string, React.ComponentType<{ className?: string }>];

type AiSearchResult = {
  iconNames: string[];
  reason: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiSearchResult | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  const keywordMatchedIcons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return iconEntries as IconEntry[];
    return iconEntries.filter(([name]) => name.toLowerCase().includes(normalizedQuery)) as IconEntry[];
  }, [query]);

  const filteredIcons = useMemo(() => {
    if (!aiResult) return keywordMatchedIcons;
    const keywordNames = new Set(keywordMatchedIcons.map(([name]) => name));
    const aiOnlyIcons = iconEntries.filter(([name]) => aiResult.iconNames.includes(name) && !keywordNames.has(name));
    return [...keywordMatchedIcons, ...aiOnlyIcons];
  }, [aiResult, keywordMatchedIcons]);

  const pageCount = Math.max(1, Math.ceil(filteredIcons.length / PAGE_SIZE));
  const visibleIcons = filteredIcons.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
    setAiResult(null);
  }, [query]);

  useEffect(() => {
    const searchQuery = query.trim();
    if (!searchQuery || !AI_SEARCH_ENDPOINT) return undefined;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsAiSearching(true);
      try {
        const response = await fetch(AI_SEARCH_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            query: searchQuery,
            iconNames: iconEntries.map(([name]) => name),
          }),
        });
        const payload = (await response.json()) as Partial<AiSearchResult> & { error?: string };
        if (!response.ok) throw new Error(payload.error || 'AI 图标搜索暂时不可用。');

        const availableNames = new Set(iconEntries.map(([name]) => name));
        const iconNames = (payload.iconNames || []).filter(name => availableNames.has(name));
        setAiResult({ iconNames, reason: payload.reason || 'AI 已按语义筛选图标。' });
      } catch {
        if (!controller.signal.aborted) {
          // AI 是关键词搜索的增强能力，失败时保留原始关键词结果，不打断用户操作。
          setAiResult(null);
        }
      } finally {
        if (!controller.signal.aborted) setIsAiSearching(false);
      }
    }, 650);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    if (!copiedName) return undefined;
    const timeout = window.setTimeout(() => setCopiedName(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [copiedName]);

  const handleCopy = async (name: string) => {
    await copyText(`import { ${name} } from '@cloud-materials/common/ve-o-iconbox';`);
    setCopiedName(name);
  };

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">@cloud-materials/common</p>
        <h1>Icon Gallery</h1>
        <p className="intro">以下 icon 需要从 <code>ve-o-iconbox</code> 消费。</p>
      </header>

      <section className="toolbar" aria-label="图标筛选">
        <label className="search-label" htmlFor="icon-search">
          <span className="search-title">
            搜索图标
            {isAiSearching && <span className="ai-loading" role="status"><i />AI 匹配中</span>}
          </span>
          <input
            id="icon-search"
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="例如：Folder、Cloud、Arrow"
            autoComplete="off"
          />
        </label>
        <div className="toolbar-actions">
          <p className="result-count">显示 {filteredIcons.length} / {iconEntries.length} 个图标</p>
        </div>
      </section>

      {aiResult && <p className="ai-result">AI 推荐：{aiResult.reason}</p>}

      <section className="icon-grid" aria-live="polite">
        {visibleIcons.map(([name, Icon]) => (
          <button className="icon-card" key={name} onClick={() => handleCopy(name)} title={`复制 ${name} 的导入语句`}>
            <Icon className="icon-preview" />
            <span className="icon-name">{name}</span>
            <span className="copy-hint">点击复制导入语句</span>
          </button>
        ))}
      </section>

      {!visibleIcons.length && <p className="empty-state">没有匹配的图标。</p>}

      {pageCount > 1 && (
        <nav className="pagination" aria-label="图标分页">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>上一页</button>
          <span>第 {page} / {pageCount} 页</span>
          <button disabled={page === pageCount} onClick={() => setPage(page + 1)}>下一页</button>
        </nav>
      )}

      {copiedName && <div className="toast" role="status">已复制 {copiedName} 的导入语句</div>}
    </main>
  );
}
