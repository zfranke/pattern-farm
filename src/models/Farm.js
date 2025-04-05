import { FarmGood } from './FarmGood.js';  // Import the FarmGood class

class Farm {
  constructor(name) {
    this.name = name;
    this.money = 1000; // Starting money
    this.animals = [];  // Ensure animals is always an array
    this.crops = [];    // Ensure crops is always an array
    this.goods = [];    // Store both animals and crops here
  }

  // Add a good (either animal or crop) to the farm
  addGood(name, category) {
    const good = new FarmGood(name, category);  // Category will determine if it's an animal or crop
    this.goods.push(good);
    return good;
  }

  // Calculate daily costs and income for all goods (both animals and crops)
  produce(logs) {
  let totalIncome = 0;

  // Loop over all goods (both animals and crops)
  this.goods.forEach((good) => {
    // Deduct daily cost for each good (animal or crop)
    this.money -= good.dailyCost;
    logs.push(`${good.category === 'animals' ? '🐄' : '🌾'} ${good.name} daily cost: -$${good.dailyCost}`);

    // Generate daily income for each good (based on daily range)
    const dailyIncome = good.getDailyIncome();
    this.money += dailyIncome;
    totalIncome += dailyIncome;
    logs.push(`${good.category === 'animals' ? '🐄' : '🌾'} ${good.name} produced: +$${dailyIncome}`);
  });

  return totalIncome;
}
  // Static method to initialize a farm from saved data
  static fromJSON(data) {
    const farm = new Farm(data.name);
    farm.money = data.money;
    farm.goods = data.goods.map(g => new FarmGood(g.name, g.category));  // Recreate FarmGood objects
    return farm;
  }
}

export { Farm };
