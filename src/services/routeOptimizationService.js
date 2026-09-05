// Smart Route & Hub-Spoke Logistics Optimizer (Simulating Google OR-Tools Multi-Drop VRP)

export const sampleRoutes = [
  {
    id: "route-101",
    truckId: "HR-05-AG-4921",
    driverName: "Gurmeet Singh",
    driverPhone: "+91 98120 44321",
    capacityTonnes: 5.0,
    currentLoadTonnes: 4.2,
    hubOrigin: "Karnal FPO Village Hub",
    destinations: [
      { name: "Ambala Retail Co-Op", distanceKm: 42, eta: "08:30 AM", status: "Delivered", loadKg: 1200 },
      { name: "Chandigarh Sector 17 Market", distanceKm: 48, eta: "10:15 AM", status: "In-Transit", loadKg: 1800 },
      { name: "Panchkula Direct Buyer Cluster", distanceKm: 15, eta: "11:45 AM", status: "Scheduled", loadKg: 1200 }
    ],
    totalDistanceKm: 105,
    unoptimizedDistanceKm: 168, // Traditional unpooled trips
    fuelSavedLiters: 18.5,
    co2SavedKg: 49.6,
    spoilagePreventedKg: 140,
    status: "Active (On Route)"
  },
  {
    id: "route-102",
    truckId: "MH-15-FV-8802",
    driverName: "Prakash Jadhav",
    driverPhone: "+91 97654 11200",
    capacityTonnes: 8.0,
    currentLoadTonnes: 7.5,
    hubOrigin: "Nashik Lasalgaon Agro Hub",
    destinations: [
      { name: "Thane Wholesale Mandi Hub", distanceKm: 135, eta: "06:00 AM", status: "Delivered", loadKg: 4000 },
      { name: "Dadar Consumer Group Buyer Hub", distanceKm: 30, eta: "08:15 AM", status: "In-Transit", loadKg: 3500 }
    ],
    totalDistanceKm: 165,
    unoptimizedDistanceKm: 240,
    fuelSavedLiters: 26.0,
    co2SavedKg: 69.8,
    spoilagePreventedKg: 310,
    status: "Active (On Route)"
  }
];

export function optimizeHubDispatch(orderList) {
  const totalOrders = orderList.length;
  const totalWeightKg = orderList.reduce((sum, item) => sum + (item.qtyKg || 50), 0);
  const trucksNeeded = Math.ceil(totalWeightKg / 2000);
  const estimatedFuelSavePercent = 32.4;
  const estimatedDeliveryTimeHrs = 4.5;

  return {
    totalOrders,
    totalWeightKg,
    trucksNeeded,
    estimatedFuelSavePercent,
    estimatedDeliveryTimeHrs,
    optimizationScore: 94 // 94% efficiency rating
  };
}
