// AI Fair Pricing & Demand Forecasting Engine (Prophet / Agmarknet simulator)

export function calculateFairPrice(agmarknetBasePricePerKg, grade = 'Grade A', organic = false) {
  // Base calculation
  let gradeMultiplier = 1.0;
  if (grade === 'Grade A+') gradeMultiplier = 1.15;
  if (grade === 'Grade A') gradeMultiplier = 1.08;
  if (grade === 'Grade B') gradeMultiplier = 0.95;

  let organicMultiplier = organic ? 1.12 : 1.0;

  // Recommended Farmer Direct Payout (15%-25% higher than raw mandi price)
  const recommendedFarmerEarning = Math.round((agmarknetBasePricePerKg * 1.20 * gradeMultiplier * organicMultiplier) * 10) / 10;

  // Logistics Direct Hub cost (fixed efficient transport rate)
  const estimatedLogistics = Math.round((agmarknetBasePricePerKg * 0.08 + 1.5) * 10) / 10;

  // Platform Escrow & Verification fee (minimal 3%)
  const platformFee = Math.round((agmarknetBasePricePerKg * 0.03 + 0.5) * 10) / 10;

  // Direct Marketplace Price for Consumer
  const finalConsumerPrice = Math.round((recommendedFarmerEarning + estimatedLogistics + platformFee) * 10) / 10;

  // Traditional Intermediary Retail Price (Usually 1.8x to 2.2x of mandi price)
  const traditionalPrice = Math.round((agmarknetBasePricePerKg * 2.0 * gradeMultiplier) * 10) / 10;

  const farmerGainPercent = Math.round(((recommendedFarmerEarning - agmarknetBasePricePerKg) / agmarknetBasePricePerKg) * 100);
  const consumerSavingsPercent = Math.round(((traditionalPrice - finalConsumerPrice) / traditionalPrice) * 100);

  return {
    agmarknetBasePrice: agmarknetBasePricePerKg,
    recommendedFarmerEarning,
    estimatedLogistics,
    platformFee,
    finalConsumerPrice,
    traditionalPrice,
    farmerGainPercent,
    consumerSavingsPercent
  };
}

export function generateDemandForecast(cropName) {
  // Returns 6-week demand forecast simulated using Prophet time series
  const weeks = ['Week 1 (Current)', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
  const baseDemand = 100;
  
  return weeks.map((week, idx) => {
    // Generate realistic seasonal fluctuations
    const trend = Math.sin(idx * 0.8) * 20 + (idx * 5);
    const predictedDemand = Math.round(baseDemand + trend);
    const predictedPrice = Math.round((30 + idx * 1.5 + (Math.random() * 2 - 1)) * 10) / 10;
    const confidenceUpper = Math.round(predictedDemand * 1.1);
    const confidenceLower = Math.round(predictedDemand * 0.9);

    return {
      week,
      demandIndex: predictedDemand,
      expectedPrice: predictedPrice,
      confidenceUpper,
      confidenceLower
    };
  });
}
