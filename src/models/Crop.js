import prices from '../config/gameConfig';

class Crop {
  constructor(name) {
    this.name = name;
    this.yieldValue = 0;  // The yield can be random based on the crop's daily range
    this.multiplier = 1;  // Default multiplier
  }

  // Crop yield based on daily range
  yieldProduce() {
    const range = prices[this.name.toLowerCase()]?.dailyRange || [0, 0]; // Get the daily range
    this.yieldValue = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    return this.yieldValue;
  }

  // Upgrade the crop to increase yield
  upgrade() {
    this.multiplier += 1;
  }
}

export { Crop };

