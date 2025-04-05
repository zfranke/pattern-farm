import { prices } from '../config/gameConfig';  // Import prices from gameConfig.js

class FarmGood {
  constructor(name) {
    this.name = name;            // Name of the good (e.g., 'Cow', 'Corn')
    const goodData = prices[name.toLowerCase()]; // Fetch the product definition from prices

    if (goodData) {
      this.category = goodData.category;
      this.buyPrice = goodData.buy;
      this.dailyCost = goodData.dailyCost;
      this.dailyRange = goodData.dailyRange;
      this.upgradeCost = goodData.upgradeCost;
    } else {
      this.buyPrice = 0;
      this.dailyCost = 0;
      this.dailyRange = [0, 0];
      this.upgradeCost = 0;
    }
  }

  // Returns random value based on the category (animals or crops)
  getDailyIncome() {
    const [min, max] = this.dailyRange;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export { FarmGood };


