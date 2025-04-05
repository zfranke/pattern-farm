import prices from '../config/gameConfig';

class Animal {
  constructor(name) {
    this.name = name;
    this.productValue = 0; // This can be calculated based on its multiplier and range
    this.multiplier = 1; // Default multiplier
  }

  // Animal production based on daily range
  produce() {
    const range = prices[this.name.toLowerCase()]?.dailyRange || [0, 0]; // Get the daily range
    this.productValue = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    return this.productValue;
  }

  // Example of an upgrade function to increase production
  upgrade() {
    this.multiplier += 1;
  }
}

export { Animal };

