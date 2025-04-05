import { useEffect, useState } from 'react';
import FarmView from './components/FarmView';
import Controls from './components/Controls';
import { Farm } from './models/Farm';
import { Animal } from './models/Animal';
import { Crop } from './models/Crop';
import { Mediator } from './models/Mediator';
import prices from './config/gameConfig';

export default function App() {
  const [farm, setFarm] = useState(() => {
    const saved = localStorage.getItem('farm-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return Farm.fromJSON(parsed);  // Properly instantiate farm from saved state
    }
    const newFarm = new Farm('My First Farm');
    newFarm.money = 1000;
    return newFarm;
  });

  const [gameLogs, setGameLogs] = useState(() => {
    const saved = localStorage.getItem('farm-logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [systemLogs, setSystemLogs] = useState([]);
  const [day, setDay] = useState(() => {
    const saved = localStorage.getItem('farm-day');
    return saved ? JSON.parse(saved) : 1;
  });

  const mediator = new Mediator();  // Create an instance of the Mediator class

  useEffect(() => {
    const log = (msg) => setSystemLogs((prev) => [...prev, `🛠️ ${msg}`]);
    log('App initialized');
    const saved = localStorage.getItem('farm-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFarm(Farm.fromJSON(parsed));
      log('Farm loaded from localStorage');
    }
  }, []);

  const nextCycle = () => {
    if (isNaN(farm.money) || farm.money < 0) {
      setSystemLogs((prev) => [...prev, '❌ Invalid farm money state']);
      return;  // Exit early if money is invalid
    }

    let dailyAnimalCost = 0;
    let dailyCropCost = 0;

    // Calculate daily costs for animals
    farm.animals.forEach(animal => {
      const animalData = prices[animal.name.toLowerCase()];  // Fetch from prices config
      if (animalData) {
        dailyAnimalCost += animalData.dailyCost;
      }
    });

    // Calculate daily costs for crops
    farm.crops.forEach(crop => {
      const cropData = prices[crop.name.toLowerCase()];  // Fetch from prices config
      if (cropData) {
        dailyCropCost += cropData.dailyCost;
      }
    });

    const totalCost = dailyAnimalCost + dailyCropCost;
    farm.money -= totalCost;  // Deduct the daily costs
    const expenseLog = `💸 Daily expenses: -$${totalCost} ($${dailyAnimalCost} animals + $${dailyCropCost} crops)`;

    // Handle day events before transitioning to night
    mediator.handleDayEvents(farm, gameLogs);  // Use mediator instance to call day events

    const newGameLogs = [];
    newGameLogs.push('🌞 Day ends');

    // Handle night events after the day ends
    mediator.handleNightEvents(farm, newGameLogs);  // Use mediator instance to call night events
    newGameLogs.push('🌙 Night begins');

    // Produce money from animals and crops
    mediator.animalsProduce(farm, newGameLogs);  // Use mediator to produce income from animals
    mediator.cropsProduce(farm, newGameLogs);    // Use mediator to produce income from crops

    // Make sure to set the game logs and farm state correctly
    setGameLogs((prev) => [...prev, expenseLog, ...newGameLogs]);
    setFarm({ ...farm });
    setDay((prev) => prev + 1);
  };


  
  const addAnimal = (type) => {
    const cost = prices[type.toLowerCase()]?.buy || 0;  // Make sure we fetch the 'buy' price from the config
    if (farm.money >= cost) {
      const newAnimal = new Animal(type);
      farm.animals.push(newAnimal);
      farm.money -= cost;
      setFarm({ ...farm });
      setGameLogs((prev) => [...prev, `🏠 Added ${type} to farm (-$${cost})`]);
    } else {
      setSystemLogs((prev) => [...prev, `❌ Not enough money to buy ${type} (${cost})`]);
    }
  };

  const addCrop = (type) => {
    const cost = prices[type.toLowerCase()]?.buy || 0;  // Make sure we fetch the 'buy' price from the config
    if (farm.money >= cost) {
      const newCrop = new Crop(type);
      farm.crops.push(newCrop);
      farm.money -= cost;
      setFarm({ ...farm });
      setGameLogs((prev) => [...prev, `🌿 Planted ${type} (-$${cost})`]);
    } else {
      setSystemLogs((prev) => [...prev, `❌ Not enough money to plant ${type} (${cost})`]);
    }
  };

  const upgradeAnimal = (index) => {
    const animal = farm.animals[index];
    if (farm.money >= 20) {
      animal.upgrade();
      farm.money -= 20;
      setFarm({ ...farm });
      setGameLogs((prev) => [...prev, `🆙 Upgraded ${animal.name}`]);
    } else {
      setSystemLogs((prev) => [...prev, '❌ Not enough money to upgrade animal']);
    }
  };

  const upgradeCrop = (index) => {
    const crop = farm.crops[index];
    if (farm.money >= 15) {
      crop.upgrade();
      farm.money -= 15;
      setFarm({ ...farm });
      setGameLogs((prev) => [...prev, `🌟 Upgraded ${crop.name}`]);
    } else {
      setSystemLogs((prev) => [...prev, '❌ Not enough money to upgrade crop']);
    }
  };

  const saveFarm = () => {
    localStorage.setItem('farm-state', JSON.stringify(farm));
    localStorage.setItem('farm-logs', JSON.stringify(gameLogs));
    localStorage.setItem('farm-day', JSON.stringify(day));
    setSystemLogs((prev) => [...prev, '💾 Farm state saved']);
  };

  const resetFarm = () => {
    const newFarm = new Farm('My Reset Farm');
    localStorage.clear();
    setFarm(newFarm);
    setGameLogs([]);
    setSystemLogs((prev) => [...prev, '🔄 Farm reset']);
    setDay(1);
  };

  return (
    <div className="p-4">
      <Controls onSave={saveFarm} onReset={resetFarm} />
      <FarmView
        farm={farm}
        logs={gameLogs}
        systemLogs={systemLogs}
        day={day}
        onUpgradeAnimal={upgradeAnimal}
        onUpgradeCrop={upgradeCrop}
        onNextDay={nextCycle}
        onAddAnimal={addAnimal}
        onAddCrop={addCrop}
      />
    </div>
  );
}
