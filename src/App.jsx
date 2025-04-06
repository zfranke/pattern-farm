import React, { useState, useEffect } from 'react';
import FarmView from './components/FarmView';
import Controls from './components/Controls';
import { Farm } from './models/Farm';
import { FarmGood } from './models/FarmGood';  // Import the new unified FarmGood class
import { Mediator } from './models/Mediator';
import prices from './config/gameConfig';
import TitleScreen from './components/TitleScreen';
import About from './components/About';
import SaveLoadDialog from './components/SaveLoadDialog';  // Import the SaveLoadDialog component

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [farm, setFarm] = useState(null);
  const [day, setDay] = useState(1);
  const [gameLogs, setGameLogs] = useState([]);
  const [systemLogs, setSystemLogs] = useState([]);
  const [isSaveLoadDialogOpen, setIsSaveLoadDialogOpen] = useState(false);
  const [savedGames, setSavedGames] = useState([]);

  const mediator = new Mediator();

  // Load available saved games from localStorage
  const loadSavedGames = () => {
    const saved = Object.keys(localStorage).filter(key => key.startsWith('farm-save-'));
    setSavedGames(saved);
  };

  useEffect(() => {
    loadSavedGames();
  }, []);

  const startNewGame = () => {
    const newFarm = new Farm('My First Farm');
    newFarm.money = 1000;
    setFarm(newFarm);
    setDay(1);
    setGameLogs([]);
    setSystemLogs([]);
    setGameStarted(true);
  };

  const loadGame = (saveName) => {
    const savedFarm = localStorage.getItem(saveName);
    if (savedFarm) {
      const parsed = JSON.parse(savedFarm);
      setFarm(Farm.fromJSON(parsed));
      setGameStarted(true);
    } else {
      alert("Save not found.");
    }
  };

  const showAboutSection = () => {
    setShowAbout(true);
  };

  const backToTitleScreen = () => {
    setShowAbout(false);
  };

  // Handle Save Game
  const handleSaveGame = (saveName) => {
    localStorage.setItem(`farm-save-${saveName}`, JSON.stringify(farm));
    loadSavedGames();
    setIsSaveLoadDialogOpen(false);
    setSystemLogs((prev) => [...prev, '💾 Game saved']);
  };

  // Handle Game Reset
  const resetFarm = () => {
    const newFarm = new Farm('My Reset Farm');
    setFarm(newFarm);
    setGameLogs([]);
    setSystemLogs((prev) => [...prev, '🔄 Farm reset']);
    setDay(1);
  };

  useEffect(() => {
    const log = (msg) => setSystemLogs((prev) => [...prev, `🛠️ ${msg}`]);
    log('App initialized');
  }, []);

  const nextCycle = () => {
    if (isNaN(farm.money) || farm.money < 0) {
      setSystemLogs((prev) => [...prev, '❌ Invalid farm money state']);
      return;  // Exit early if money is invalid
    }

    const newGameLogs = [];

    // Check if the farm has at least one good (animal or crop)
    if (farm.goods.length === 0) {
      setSystemLogs((prev) => [...prev, '❌ You must have at least one animal or crop to proceed!']);
      return;  // Exit if no goods are available
    }

    // Call the day cycle (calculates daily costs, produces goods, handles day events)
    if (mediator.isDay) {
      newGameLogs.push('🌞 Day begins');
      mediator.dayCycle(farm, newGameLogs);  // Handles daily costs, events, income generation
    } else {
      newGameLogs.push('🌙 Night falls');
      mediator.nightCycle(farm, newGameLogs);  // Handles night events
    }

    // Set game logs and update farm state
    setGameLogs((prev) => [...prev, ...newGameLogs]);
    setFarm({ ...farm });  // Ensure farm state is updated correctly
    setDay((prev) => prev + 1);  // Proceed to next day
  };

  // Upgrade a good
  const upgradeGood = (index) => {
    const good = farm.goods[index];
    const upgradeCost = good.upgradeCost || 0;  // Get the upgrade cost from the good

    if (farm.money >= upgradeCost) {
      good.upgrade();  // Upgrade the good (either animal or crop)
      farm.money -= upgradeCost;  // Deduct the upgrade cost from farm money
      setFarm({ ...farm });  // Trigger re-render with updated farm state
      setGameLogs((prev) => [...prev, `🔧 Upgraded ${good.name} to level ${good.multiplier} (-$${upgradeCost})`]);
    }
    else {
      setSystemLogs((prev) => [...prev, `❌ Not enough money to upgrade ${good.name} (${upgradeCost})`]);
    }
  };

  const addGood = (type, category) => {
    const cost = prices[type.toLowerCase()]?.buy || 0;
    if (farm.money >= cost) {
      const newGood = new FarmGood(type);  // Create a new FarmGood (either animal or crop)
      farm.goods.push(newGood);
      farm.money -= cost;
      setFarm({ ...farm });
      setGameLogs((prev) => [...prev, `🏠 Added ${type} to farm (-$${cost})`]);
    } else {
      setSystemLogs((prev) => [...prev, `❌ Not enough money to buy ${type} (${cost})`]);
    }
  };

  return (
    <div className="p-4">
      {showAbout ? (
        <About onBack={backToTitleScreen} />
      ) : gameStarted ? (
        <div>
          <FarmView
            farm={farm}
            logs={gameLogs}
            systemLogs={systemLogs}
            day={day}
            onNextDay={nextCycle}
            onAddGood={addGood} 
            onUpgradeGood={upgradeGood}
            onShowAbout={showAboutSection}
          />
          <Controls onSave={() => setIsSaveLoadDialogOpen(true)} onReset={resetFarm} />
        </div>
      ) : (
        <TitleScreen onNewGame={startNewGame} onLoadGame={() => setIsSaveLoadDialogOpen(true)} onAbout={showAboutSection} />
      )}

      <SaveLoadDialog
        open={isSaveLoadDialogOpen}
        onClose={() => setIsSaveLoadDialogOpen(false)}
        onSave={handleSaveGame}
        onLoad={loadGame}
        savedGames={savedGames}
      />
    </div>
  );
}
