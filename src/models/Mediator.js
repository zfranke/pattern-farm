import { prices, nightEvents, dayEvents } from '../config/gameConfig';

class Mediator {
  constructor() {
    this.isDay = true; // Initially, it's daytime
  }

  // Function to handle the day cycle (animals produce, crops yield)
  dayCycle(farm, logs) {
    this.isDay = true;
    this.animalsProduce(farm, logs); // Animals produce money based on daily range
    this.cropsProduce(farm, logs);   // Crops yield money based on daily range
  }

  // Function to handle the night cycle (special events, etc.)
  nightCycle(farm, logs) {
    this.isDay = false;

    // Handle night events
    this.handleNightEvents(farm, logs);
  }

  // Handle night events based on probability
  handleNightEvents(farm, logs) {
    const event = this.getRandomEvent(nightEvents);
    logs.push(event.message); // Log the event message

    // You can add specific consequences of the event here, like:
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
    logs.push(event.message); // Log the event message

    if (event.name === "Market Boost") {
      // Example logic: increase crop price for the day
      prices.corn.dailyCost += 2;
      logs.push("📈 Market prices for crops have increased!");
    }
  }

  // Animals produce random money based on their range
  animalsProduce(farm, logs) {
    farm.animals.forEach(animal => {
      const range = prices[animal.name.toLowerCase()]?.dailyRange || [0, 0];  // Ensure range is provided
      const value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
      farm.money += value;
      logs.push(`🐖 ${animal.name} produced +$${value}`);
    });
  }

  // Crops produce random money based on their range
  cropsProduce(farm, logs) {
    farm.crops.forEach(crop => {
      const range = prices[crop.name.toLowerCase()]?.dailyRange || [0, 0];  // Ensure range is provided
      const value = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
      farm.money += value;
      logs.push(`🌾 ${crop.name} yielded +$${value}`);
    });
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
