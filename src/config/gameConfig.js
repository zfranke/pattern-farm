const prices = {
  cow: {
    category: 'animals',
    buy: 50,
    dailyCost: 5,
    dailyRange: [4, 10],
    upgradeCost: 20  
  },
  pig: {
    category: 'animals',
    buy: 40,
    dailyCost: 4,
    dailyRange: [3, 8],
    upgradeCost: 15  
  },
  corn: {
    category: 'crops',
    buy: 30,
    dailyCost: 3,
    dailyRange: [2, 6],
    upgradeCost: 10  
  },
  wheat: {
    category: 'crops',
    buy: 25,
    dailyCost: 2,
    dailyRange: [1, 4],
    upgradeCost: 8  
  }
};

const nightEvents = [
  { name: "Wolf Attack", probability: 0.1, message: "A wolf attacks your farm!" },
  { name: "Animal Disease", probability: 0.05, message: "Some of your animals caught a disease!" },
  { name: "Nothing Happens", probability: 0.85, message: "The night passed peacefully." }
];

const dayEvents = [
  { name: "Market Boost", probability: 0.2, message: "The market prices for crops rise!" },
  { name: "Nothing Happens", probability: 0.8, message: "Another normal day on the farm." }
];

export { prices, nightEvents, dayEvents };
export default prices;

