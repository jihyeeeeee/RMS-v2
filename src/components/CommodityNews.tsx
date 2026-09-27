import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  id: string;
  publisher: string;
  title: string;
  summary: string;
  publishedAt: string;
  articleUrl: string;
  category?: string;
  affectedRegion?: string;
}

const formatPublicationDate = (value?: string) => {
  if (!value) return '발행일 미확인';
  const normalized = value.trim();
  if (/^\d{4}-\d{2}$/.test(normalized)) return normalized.replace('-', '.');
  const parsed = new Date(normalized);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  }
  return normalized;
};

export const CommodityNews: React.FC<{ commodityId: string }> = ({ commodityId }) => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketIntelligence = async () => {
      setIsLoading(true);
      if (isMounted) setArticles([]);

      try {
        const res = await fetch(`/api/market-intelligence?commodity=${commodityId}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (json.success && Array.isArray(json.articles)) {
          const seen = new Set<string>();
          const mapped: NewsItem[] = json.articles
            .filter((art: any) => art && (art.original_url || art.articleUrl) && (art.title_kr || art.title))
            .map((art: any, idx: number) => ({
              id: `mi-${commodityId}-${idx}`,
              publisher: art.source || art.publisher || '공식 소스',
              title: art.title_kr || art.title,
              summary: art.summary_kr || art.summary || '',
              publishedAt: formatPublicationDate(art.publication_date || art.publishedAt),
              articleUrl: art.original_url || art.articleUrl,
              category: art.category,
              affectedRegion: art.affected_region || art.affectedRegion,
            }))
            .filter((art: NewsItem) => {
              const key = `${art.articleUrl}::${art.title}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            })
            .slice(0, 6);

          if (isMounted) setArticles(mapped);
        }
      } catch (err) {
        console.warn('[CommodityNews] Live market intelligence fetch notice:', err);
        // No fabricated/static fallback. Keep the last rendered verified items only within this mount.
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMarketIntelligence();
    return () => {
      isMounted = false;
    };
  }, [commodityId]);

  const getCommodityQueryName = (id: string): string => {
    const map: Record<string, string> = {
      wheat: '소맥 밀',
      corn: '옥수수',
      soybean: '대두 콩',
      'soybean-oil': '대두유 콩기름',
      'palm-oil': '팜유',
      sugar: '원당 설탕',
      'potato-starch': '감자전분',
      'tapioca-starch': '타피오카전분 카사바',
    };
    return map[id] || id;
  };

  const globalSearchUrl = `https://news.google.com/search?q=${encodeURIComponent(getCommodityQueryName(commodityId) + ' 곡물 시장 동향 전쟁 무역 기상')}&hl=ko&gl=KR&ceid=KR:ko`;

  return (
    <div className="mt-6 bg-white rounded-xl border border-slate-200 p-5 shadow-sm pdf-section-card min-h-[220px] print:mt-8 print:pt-4 break-inside-avoid print:break-inside-avoid">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Newspaper className="w-5 h-5 text-slate-700 shrink-0" />
          <h3 className="text-base font-bold text-slate-900 break-keep">
            주요 이슈 및 시장 동향 (Market Intelligence)
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {isLoading && (
            <span className="text-xs text-indigo-600 font-medium animate-pulse shrink-0">
              최신 공식자료 검색 중...
            </span>
          )}
          <a
            href={globalSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
          >
            <span>구글 뉴스 전체보기</span>
            <span aria-hidden="true" className="text-[10px]">↗</span>
          </a>
        </div>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {articles.map((item) => {
            const isGoogleNews = item.articleUrl?.includes('news.google.com');
            const googleNewsSearchUrl = isGoogleNews
              ? item.articleUrl
              : `https://news.google.com/search?q=${encodeURIComponent(item.title + ' 뉴스')}&hl=ko&gl=KR&ceid=KR:ko`;

            return (
              <article
                key={item.id}
                onClick={() => window.open(item.articleUrl, '_blank', 'noopener,noreferrer')}
                className="p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-sans font-medium rounded border border-slate-200 min-w-0 break-keep">
                        {item.publisher}
                      </span>
                      {item.category && (
                        <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[10px] font-medium rounded border border-indigo-100 shrink-0">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans shrink-0">
                      {item.publishedAt}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-indigo-600 transition-colors break-keep">
                    <a
                      href={item.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline inline-flex items-start gap-1"
                    >
                      {item.title}
                      <span aria-hidden="true" className="text-[11px] mt-0.5 shrink-0">↗</span>
                    </a>
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5 break-keep line-clamp-2">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 truncate max-w-[50%]">
                    {item.affectedRegion ? `영향 지역: ${item.affectedRegion}` : ''}
                  </span>
                  <a
                    href={googleNewsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 hover:underline ml-auto"
                  >
                    <span>구글 뉴스 검색</span>
                    <span aria-hidden="true" className="text-[10px]">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="min-h-[120px] flex items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
          <p className="text-xs text-slate-500">
            {isLoading ? '검증된 최신 이슈를 불러오는 중입니다.' : '현재 표시할 수 있는 검증된 최신 이슈가 없습니다.'}
          </p>
        </div>
      )}
    </div>
  );
};
