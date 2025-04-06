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

  // Method to upgrade the good, keep it all integers
  upgrade() {
    if (this.upgradeCost > 0) {
      this.dailyCost += Math.floor(this.dailyCost * 0.1); // Increase daily cost by 10%
      this.dailyRange[0] += Math.floor(this.dailyRange[0] * 0.1); // Increase min range by 10%
      this.dailyRange[1] += Math.floor(this.dailyRange[1] * 0.1); // Increase max range by 10%
      this.upgradeCost = Math.floor(this.upgradeCost * 1.5); // Increase upgrade cost by 50%
    }
    
  }
}

export { FarmGood };


