import { prices } from '../config/gameConfig';  // Import prices from gameConfig.js

class FarmGood {
  constructor(name) {
    this.name = name;  // Name of the good (e.g., 'Cow', 'Corn')
    
    // Fetch the product definition from prices
    const goodData = prices[name.toLowerCase()];

    // Check if the product exists in the price configuration
    if (goodData) {
      this.category = goodData.category || 'unknown';  // Default to 'unknown' if category is not defined
      this.buyPrice = goodData.buy;
      this.dailyCost = goodData.dailyCost;
      this.dailyRange = goodData.dailyRange;
      this.upgradeCost = goodData.upgradeCost;
      this.multiplier = 1;  // Initial multiplier level
    } else {
      // If not found in the prices config, set default values
      this.buyPrice = 0;
      this.dailyCost = 0;
      this.dailyRange = [0, 0];
      this.upgradeCost = 0;
      this.multiplier = 1;
    }
  }

  // Returns random value based on the category (animals or crops)
  getDailyIncome() {
    const [min, max] = this.dailyRange;
    return Math.floor(Math.random() * (max - min + 1) + min) * this.multiplier;  // Multiply by the multiplier
  }

  // Method to upgrade the good
  upgrade() {
    if (this.upgradeCost > 0) {
      // Increase daily cost and range by 10% per upgrade
      this.dailyCost += Math.floor(this.dailyCost * 0.1);
      this.dailyRange[0] += Math.floor(this.dailyRange[0] * 0.1);
      this.dailyRange[1] += Math.floor(this.dailyRange[1] * 0.1);
      // Increase the upgrade cost by 50%
      this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
      this.multiplier += 1;  // Increase multiplier for level-up
    }
  }
}

export { FarmGood };



