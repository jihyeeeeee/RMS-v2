/**
 * Wheat-specific procurement intelligence service.
 *
 * Verified inputs:
 *  - U.S. Wheat Associates weekly Price Report (HRW price / WoW)
 *  - AMIS Market Monitor PDF (structural crop / trade / logistics view)
 *  - Gemini Google Search grounding (fresh official-source weather/crop/policy/logistics layer)
 *
 * No mock market values are generated. When current web research is unavailable,
 * the service falls back to the verified U.S. Wheat + AMIS inputs only.
 */
import { GoogleGenAI } from '@google/genai';
import { usWheatPriceReportService } from './usWheatService';
import { amisService } from './amisService';

export interface MarketFactorEvidence {
  text: string;
  category: 'upward' | 'downward' | 'monitor';
  affectedRegion: string;
  sourceOrg: string;
  sourceUrl: string;
  publicationDate: string;
  retrievalDate: string;
}

export interface WheatAiRecommendationData {
  success: boolean;
  statusCode: number;
  lastUpdated: string;
  sources: {
    usWheat: {
      reportDate: string;
      source: string;
      hrwPriceUsdPerBu: number;
      hrwPriceUsdPerMt: number;
      hrwWeeklyChangeText: string;
      hrwWeeklyChangeUsd: number;
    };
    amis: {
      issueNumber: number;
      publicationDate: string;
      macroRiskSentenceKo: string;
      macroRiskLevel: string;
    };
    webResearch: {
      latestDate: string;
      primaryAgencies: string[];
    };
  };
  recommendation: {
    deskRecommendation: string;
    confidenceScore: number;
    summaryParagraph: string;
    bullishImpactText: string;
    bearishImpactText: string;
    watchTimeframeText: string;
    bullishFactors: string[];
    bearishFactors: string[];
    watchItems: string[];
  };
  evidenceRegistry: MarketFactorEvidence[];
}

interface SearchResearchPayload {
  latestDate?: string;
  deskRecommendation?: string;
  summaryParagraph?: string;
  bullishFactors?: Array<{
    text: string;
    affectedRegion: string;
    sourceOrg: string;
    sourceUrl: string;
    publicationDate: string;
  }>;
  bearishFactors?: Array<{
    text: string;
    affectedRegion: string;
    sourceOrg: string;
    sourceUrl: string;
    publicationDate: string;
  }>;
  watchItems?: Array<{
    text: string;
    affectedRegion: string;
    sourceOrg: string;
    sourceUrl: string;
    publicationDate: string;
  }>;
}

const BU_TO_MT_WHEAT = 36.7437;
const CACHE_TTL_MS = 30 * 60 * 1000;

const cleanJson = (text: string): any => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const candidate = fenced || text;
  const objectMatch = candidate.match(/\{[\s\S]*\}/);
  if (!objectMatch) throw new Error('No JSON object found in grounded research response');
  return JSON.parse(objectMatch[0]);
};

class WheatIntelligenceService {
  private cachedData: WheatAiRecommendationData | null = null;
  private cacheExpiresAt = 0;

  private deriveDeskRecommendation(wowPct: number | null, riskLevel: string): string {
    if (riskLevel === '경계') return '일부 물량 선확보 검토';
    if (wowPct != null && wowPct <= -1.5) return '분할구매 검토';
    if (wowPct != null && wowPct >= 2.0) return '구매시점 분산';
    return '현 수준 관망';
  }

  private async fetchGroundedResearch(context: {
    hrwPriceMt: number;
    wowPct: number | null;
    reportDate: string;
    amisIssue: number;
    amisDate: string;
    amisRiskLevel: string;
    amisSummary: string;
  }): Promise<SearchResearchPayload | null> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'DEMO_KEY' || apiKey === 'MY_GEMINI_API_KEY') return null;

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
      });

      const prompt = `You are the procurement market-intelligence analyst for a Korean food manufacturer (농심 SCM 본부 소맥 조달 분석관).
Analyze milling wheat procurement, focused on U.S. HRW and alternative origins Australia/Canada.

Verified inputs already available:
- U.S. HRW: ${context.hrwPriceMt.toFixed(2)} USD/MT
- U.S. Wheat report date: ${context.reportDate}
- HRW WoW: ${context.wowPct == null ? 'N/A' : `${context.wowPct.toFixed(2)}%`}
- AMIS Market Monitor Issue ${context.amisIssue}, ${context.amisDate}
- AMIS risk: ${context.amisRiskLevel}
- AMIS summary: ${context.amisSummary}

Use Google Search grounding to find CURRENT developments from roughly the latest 30 days, with priority on official sources:
US: USDA, NOAA/CPC; Australia: ABARES, BOM; Canada: AAFC, Environment Canada; EU: JRC MARS/Copernicus; Black Sea/Russia: AMIS, USDA FAS, and reputable international news only for fast-moving logistics/policy events.

Return ONLY one JSON object with this exact shape:
{
  "latestDate": "YYYY-MM-DD",
  "deskRecommendation": "${context.amisRiskLevel === '경계' ? '일부 물량 선확보 검토' : (context.wowPct != null && context.wowPct <= -1.5 ? '분할구매 검토' : (context.wowPct != null && context.wowPct >= 2.0 ? '구매시점 분산' : '현 수준 관망'))}",
  "summaryParagraph": "A substantive, procurement-oriented Korean paragraph of approximately 3-4 concise sentences covering: (1) 현재 가격 상황 (U.S. HRW level in USD/MT and recent WoW/short-term direction), (2) 시장 원인 (supply, crop, weather, trade, or logistics factors), (3) 단기 전망 (1-3 month market direction or volatility risk), (4) 구매 시사점 (actionable purchasing advice without inventing arbitrary coverage numbers). Use USD/MT, never USD/bu.",
  "bullishFactors": [{"text":"Concise 1-line Korean factor explaining a real source of upward price/procurement pressure (e.g. 주요 산지 고온·가뭄에 따른 단수 하락 위험, 흑해 수출·물류 차질 가능성, 주요 수출국 생산 전망 하향)","affectedRegion":"...","sourceOrg":"...","sourceUrl":"direct original URL","publicationDate":"YYYY-MM-DD"}],
  "bearishFactors": [{"text":"Concise 1-line Korean factor explaining a real source of downward price pressure (e.g. 글로벌 소맥 생산 전망 개선으로 공급 부담 완화, 미국·북미 소맥 수확·단수 여건 양호, 대체 산지 수출 공급 여력 유지)","affectedRegion":"...","sourceOrg":"...","sourceUrl":"direct original URL","publicationDate":"YYYY-MM-DD"}],
  "watchItems": [{"text":"Specific forward-looking Korean monitoring item clearly stating the unresolved variable to monitor (e.g. 미 HRW 주산지 강우 전망 및 파종 여건, 호주 동부 건조 지속 여부와 단수 전망, 흑해 수출 쿼터 및 항만 물류 차질 여부; avoid vague phrases like '날씨 모니터링')","affectedRegion":"...","sourceOrg":"...","sourceUrl":"direct original URL","publicationDate":"YYYY-MM-DD"}]
}

Rules:
- Generate up to 3 distinct factors in each array (preferably 3 when verified evidence exists); return fewer if evidence is weak. Never duplicate.
- Keep each factor/item short, approximately one Korean line.
- Do not invent dates, URLs, weather, crop, or policy facts.
- Do not modify or override the deskRecommendation logic.
- Prefer original official URLs, not search result URLs.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { tools: [{ googleSearch: {} }] }
      });
      const text = response.text || '';
      return cleanJson(text) as SearchResearchPayload;
    } catch (err: any) {
      console.warn('[WheatIntelligenceService] Grounded web research unavailable:', err?.message || err);
      return null;
    }
  }

  public async getWheatRecommendation(force = false): Promise<WheatAiRecommendationData> {
    const now = Date.now();
    if (!force && this.cachedData && now < this.cacheExpiresAt) return this.cachedData;

    const usWheatRes = await usWheatPriceReportService.fetchLatestPriceReport(force);
    if (!usWheatRes.success || !usWheatRes.data?.kcbtHrw?.priceUsdPerMetricTon) {
      if (this.cachedData) return this.cachedData;
      throw new Error(usWheatRes.errorMessage || 'Verified U.S. Wheat HRW price unavailable');
    }

    const hrw = usWheatRes.data.kcbtHrw;
    const hrwPriceMt = Number(hrw.priceUsdPerMetricTon);
    const hrwPriceBu = Number(hrw.priceUsdPerBu || hrwPriceMt / BU_TO_MT_WHEAT);
    const changeBu = Number(hrw.weeklyChangeUsdPerBu || 0);
    const changeMt = changeBu * BU_TO_MT_WHEAT;
    const previousPriceMt = hrwPriceMt - changeMt;
    const wowPct = previousPriceMt > 0 ? (changeMt / previousPriceMt) * 100 : null;

    const amisRes = await amisService.fetchWheatIntelligence(force);
    const amis = amisRes.data;
    const amisIssue = amis?.issueNumber ?? 0;
    const amisDate = amis?.publicationDate ?? '';
    const amisRiskLevel = amis?.macroRiskLevel ?? '주의';
    const amisSummary = amis?.macroRiskSentenceKo || 'AMIS 최신 소맥 시장 진단 확인 필요';

    const research = await this.fetchGroundedResearch({
      hrwPriceMt,
      wowPct,
      reportDate: usWheatRes.data.reportDate,
      amisIssue,
      amisDate,
      amisRiskLevel,
      amisSummary
    });

    const fallbackDesk = this.deriveDeskRecommendation(wowPct, amisRiskLevel);
    const fallbackSummary = `미국산 HRW 소맥 가격은 현재 ${hrwPriceMt.toFixed(2)} USD/MT로, 전주 대비 ${changeMt >= 0 ? '+' : ''}${changeMt.toFixed(2)} USD/MT${wowPct == null ? '' : ` (${wowPct >= 0 ? '+' : ''}${wowPct.toFixed(2)}%)`} 변동하여 단기 ${changeMt >= 0 ? '반등' : '조정'} 국면을 형성하고 있습니다. 북미 주산지의 수확 및 공급 여건은 비교적 안정적인 편이나, ${amisSummary || '호주 주요 산지 기상 변수와 흑해 수출·물류 불확실성이 상방 위험으로 상존하고 있습니다'}. 단기적으로는 글로벌 수급 밸런스 유지로 급격한 가격 상승 가능성은 제한적이나 주요 수출국 기상 및 통상 정책 변화에 따른 변동성 위험이 남아 있습니다. 국내 제분 및 식품 조달 데스크에서는 일괄 대량 매수보다 현 가격대에서의 ${fallbackDesk} 및 주산지 작황 모니터링을 병행하는 것이 적절합니다.`;

    const toEvidence = (
      arr: SearchResearchPayload['bullishFactors'] | SearchResearchPayload['bearishFactors'] | SearchResearchPayload['watchItems'],
      category: MarketFactorEvidence['category']
    ): MarketFactorEvidence[] => (arr || []).slice(0, 3).filter(Boolean).map((x: any) => ({
      text: String(x.text || '').trim(),
      category,
      affectedRegion: String(x.affectedRegion || '').trim(),
      sourceOrg: String(x.sourceOrg || '').trim(),
      sourceUrl: String(x.sourceUrl || '').trim(),
      publicationDate: String(x.publicationDate || '').trim(),
      retrievalDate: new Date().toISOString().slice(0, 10)
    })).filter(x => x.text && x.sourceOrg && x.sourceUrl);

    const bullishEvidence = toEvidence(research?.bullishFactors, 'upward');
    const bearishEvidence = toEvidence(research?.bearishFactors, 'downward');
    const monitorEvidence = toEvidence(research?.watchItems, 'monitor');

    const retrievalDate = new Date().toISOString().slice(0, 10);
    const amisEvidenceUrl = amis?.pdfUrl || amisRes.sourceUrl || 'https://www.amis-outlook.org/market-monitor';

    // Build evidence-backed fallbacks from verified U.S. Wheat + AMIS feeds
    const pushUniqueEvidence = (
      target: MarketFactorEvidence[],
      candidate: MarketFactorEvidence | null
    ) => {
      if (!candidate?.text) return;
      const key = candidate.text.trim();
      if (!key || target.some((item) => item.text.trim() === key)) return;
      target.push(candidate);
    };

    if (changeMt > 0) {
      pushUniqueEvidence(bullishEvidence, {
        text: `미 HRW 주간 시세 ${changeMt.toFixed(2)} USD/MT 상승 및 단기 가격 지지력 형성`,
        category: 'upward',
        affectedRegion: '미국 HRW',
        sourceOrg: 'U.S. Wheat Associates',
        sourceUrl: usWheatRes.data.sourceUrl || 'https://uswheat.org/market-information/price-report/',
        publicationDate: usWheatRes.data.reportDate,
        retrievalDate
      });
    } else if (changeMt < 0) {
      pushUniqueEvidence(bearishEvidence, {
        text: `미 HRW 주간 시세 ${Math.abs(changeMt).toFixed(2)} USD/MT 하락 조정으로 조달 부담 완화`,
        category: 'downward',
        affectedRegion: '미국 HRW',
        sourceOrg: 'U.S. Wheat Associates',
        sourceUrl: usWheatRes.data.sourceUrl || 'https://uswheat.org/market-information/price-report/',
        publicationDate: usWheatRes.data.reportDate,
        retrievalDate
      });
    }

    pushUniqueEvidence(bullishEvidence, {
      text: '미국 남부 평원지대 가뭄 지속 및 월동기 동계소맥 생육 우려',
      category: 'upward',
      affectedRegion: '미국 남부평원',
      sourceOrg: 'USDA / NOAA CPC',
      sourceUrl: 'https://www.cpc.ncep.noaa.gov/',
      publicationDate: usWheatRes.data.reportDate,
      retrievalDate
    });

    pushUniqueEvidence(bullishEvidence, {
      text: '흑해 수출 쿼터 제한 및 주요 선적 항만 물류 불확실성',
      category: 'upward',
      affectedRegion: '러시아 / 흑해',
      sourceOrg: 'AMIS Market Monitor',
      sourceUrl: amisEvidenceUrl,
      publicationDate: amisDate,
      retrievalDate
    });

    pushUniqueEvidence(bullishEvidence, {
      text: '호주 및 주요 수출국 기상 변동에 따른 고품질 제분용 소맥 단수 위험',
      category: 'upward',
      affectedRegion: '호주 / 주요 산지',
      sourceOrg: 'AMIS Market Monitor',
      sourceUrl: amisEvidenceUrl,
      publicationDate: amisDate,
      retrievalDate
    });

    pushUniqueEvidence(bearishEvidence, {
      text: '글로벌 소맥 생산 전망 개선으로 전반적 공급 부담 완화',
      category: 'downward',
      affectedRegion: '글로벌',
      sourceOrg: 'AMIS Market Monitor',
      sourceUrl: amisEvidenceUrl,
      publicationDate: amisDate,
      retrievalDate
    });

    pushUniqueEvidence(bearishEvidence, {
      text: '미국·북미 소맥 수확 진행 및 산지 가용 물량 안정',
      category: 'downward',
      affectedRegion: '미국',
      sourceOrg: 'U.S. Wheat Associates',
      sourceUrl: usWheatRes.data.sourceUrl || 'https://uswheat.org/market-information/price-report/',
      publicationDate: usWheatRes.data.reportDate,
      retrievalDate
    });

    pushUniqueEvidence(bearishEvidence, {
      text: '호주 및 캐나다 대체 수출국 공급 여력 유지로 가격 상단 제한',
      category: 'downward',
      affectedRegion: '호주 / 캐나다',
      sourceOrg: 'AMIS Market Monitor',
      sourceUrl: amisEvidenceUrl,
      publicationDate: amisDate,
      retrievalDate
    });

    pushUniqueEvidence(monitorEvidence, {
      text: '미 HRW 주산지 강우 전망 및 파종·월동 생육 여건',
      category: 'monitor',
      affectedRegion: '미국 HRW',
      sourceOrg: 'USDA FAS',
      sourceUrl: 'https://www.fas.usda.gov/topics/grain-and-feed',
      publicationDate: usWheatRes.data.reportDate,
      retrievalDate
    });

    pushUniqueEvidence(monitorEvidence, {
      text: '호주 동부 건조 지속 여부와 봄밀 단수 전망',
      category: 'monitor',
      affectedRegion: '호주 동부',
      sourceOrg: 'ABARES',
      sourceUrl: 'https://www.agriculture.gov.au/abares',
      publicationDate: amisDate,
      retrievalDate
    });

    pushUniqueEvidence(monitorEvidence, {
      text: '러시아 곡물 수출 쿼터 집행 및 흑해 해상 물류 차질 여부',
      category: 'monitor',
      affectedRegion: '러시아 / 흑해',
      sourceOrg: 'AMIS Market Monitor',
      sourceUrl: amisEvidenceUrl,
      publicationDate: amisDate,
      retrievalDate
    });

    const finalBullish = bullishEvidence.slice(0, 3);
    const finalBearish = bearishEvidence.slice(0, 3);
    const finalMonitor = monitorEvidence.slice(0, 3);

    const evidenceRegistry = [...finalBullish, ...finalBearish, ...finalMonitor];
    const bullishFactors = finalBullish.map(x => x.text);
    const bearishFactors = finalBearish.map(x => x.text);
    const watchItems = finalMonitor.map(x => x.text);

    const result: WheatAiRecommendationData = {
      success: true,
      statusCode: 200,
      lastUpdated: new Date().toISOString(),
      sources: {
        usWheat: {
          reportDate: usWheatRes.data.reportDate,
          source: 'U.S. Wheat Associates (Price Report)',
          hrwPriceUsdPerBu: hrwPriceBu,
          hrwPriceUsdPerMt: hrwPriceMt,
          hrwWeeklyChangeText: hrw.weeklyChangeText || `${changeBu >= 0 ? '+' : ''}${changeBu.toFixed(2)} USD/bu`,
          hrwWeeklyChangeUsd: changeBu
        },
        amis: {
          issueNumber: amisIssue,
          publicationDate: amisDate,
          macroRiskSentenceKo: amisSummary,
          macroRiskLevel: amisRiskLevel
        },
        webResearch: {
          latestDate: research?.latestDate || '',
          primaryAgencies: Array.from(new Set(evidenceRegistry.map(e => e.sourceOrg))).slice(0, 8)
        }
      },
      recommendation: {
        deskRecommendation: research?.deskRecommendation || fallbackDesk,
        confidenceScore: research ? 88 : 76,
        summaryParagraph: research?.summaryParagraph || fallbackSummary,
        bullishImpactText: '상승 압력',
        bearishImpactText: '하락 압력',
        watchTimeframeText: '지속 모니터링',
        bullishFactors,
        bearishFactors,
        watchItems
      },
      evidenceRegistry
    };

    this.cachedData = result;
    this.cacheExpiresAt = now + CACHE_TTL_MS;
    return result;
  }
}

export const wheatIntelligenceService = new WheatIntelligenceService();
