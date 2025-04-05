import {prices, nightEvents, dayEvents } from "../config/gameConfig.js"; // Import events from gameConfig

class Mediator {
  constructor() {
    this.isDay = true; // Initially, it's daytime
  }

  // Function to handle the day cycle (animals produce, crops yield)
  dayCycle(farm, logs) {
    this.isDay = true;
    const { totalCost, dailyAnimalCost, dailyCropCost } = this.calculateDailyCosts(farm); // Get daily costs
    farm.money -= totalCost; // Deduct the daily costs from farm money

    logs.push(`💸 Daily expenses: -$${totalCost} ($${dailyAnimalCost} animals + $${dailyCropCost} crops)`);

    this.handleDayEvents(farm, logs);  // Handle day-specific events
    this.produceGoods(farm, logs);     // Both animals and crops produce money
  }

  // Function to handle the night cycle (special events, etc.)
  nightCycle(farm, logs) {
    this.isDay = false;
    this.handleNightEvents(farm, logs);  // Handle night-specific events
  }

  // Calculate daily costs for animals and crops
  calculateDailyCosts(farm) {
    let dailyAnimalCost = 0;
    let dailyCropCost = 0;

    // Calculate daily costs for animals and crops
    farm.goods.forEach(good => {
      if (good.category === 'animals') {
        dailyAnimalCost += good.dailyCost;
      } else if (good.category === 'crops') {
        dailyCropCost += good.dailyCost;
      }
    });

    const totalCost = dailyAnimalCost + dailyCropCost;
    return { totalCost, dailyAnimalCost, dailyCropCost };
  }

  // Produce income from all goods (both animals and crops)
  produceGoods(farm, logs) {
    farm.goods.forEach(good => {
      const value = good.getDailyIncome();
      farm.money += value;
      logs.push(`${good.category === 'animals' ? '🐄' : '🌾'} ${good.name} produced +$${value}`);
    });
  }

  // Handle night events based on probability
  handleNightEvents(farm, logs) {
    const event = this.getRandomEvent(nightEvents);
    logs.push(event.message);  // Log the event message

    if (event.name === "Wolf Attack") {
      // Example logic: lose one animal
      if (farm.animals.length > 0) {
        farm.animals.pop();
        logs.push("❌ A wolf attack caused the loss of an animal!");
      }
    }
  }

  // Handle day events based on probability
  handleDayEvents(farm, logs) {
    const event = this.getRandomEvent(dayEvents);
    logs.push(event.message);  // Log the event message

    if (event.name === "Market Boost") {
      // Example logic: increase crop price for the day
      prices.corn.dailyCost += 2;
      logs.push("📈 Market prices for crops have increased!");
    }
  }

  // Helper function to get a random event based on probability
  getRandomEvent(events) {
    const rand = Math.random();
    let cumulativeProbability = 0;

    for (const event of events) {
      cumulativeProbability += event.probability;
      if (rand <= cumulativeProbability) {
        return event;
      }
    }

    return events.find(e => e.name === "Nothing Happens"); // Default event if no match
  }
}

export { Mediator };

