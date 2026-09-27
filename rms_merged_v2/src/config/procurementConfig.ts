/**
 * Centrally configurable procurement assumptions for Landed Cost calculation.
 * 
 * Requirements:
 * - Stored separately from verified external market data.
 * - Clearly identified as [Assumption].
 * - Easily modifiable without altering calculation logic.
 * - If no port-cost assumption exists, do not invent one; default to null and report that it needs configuration.
 */
export interface ProcurementConfig {
  /**
   * Internal Port Cost assumption for South Korea import in USD/MT (하역/항만비용).
   * Internal assumption only. Not external market data.
   * If null or undefined, calculation remains pending per integrity requirements.
   */
  portCostUsdPerMt: number | null;
}

export const procurementConfig: ProcurementConfig = {
  // Configured port cost assumption in USD/MT.
  // Set via PORT_COST_USD_PER_MT environment variable or configured here.
  // Default: null (unconfigured, calculation kept pending with '내부 항만비 가정치 설정 필요')
  portCostUsdPerMt: process.env.PORT_COST_USD_PER_MT
    ? parseFloat(process.env.PORT_COST_USD_PER_MT)
    : null,
};
