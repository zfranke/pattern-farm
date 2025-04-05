import { Animal } from './Animal';
import { Crop } from './Crop';

class Farm {
  constructor(name) {
    this.name = name;
    this.money = 1000;
    this.animals = [];
    this.crops = [];
  }

  // Add an animal to the farm
  addAnimal(name) {
    const animal = new Animal(name);
    this.animals.push(animal);
    return animal;
  }

  // Add a crop to the farm
  addCrop(name) {
    const crop = new Crop(name);
    this.crops.push(crop);
    return crop;
  }

  cropsProduce(logs) {
    this.crops.forEach(crop => {
      const value = crop.getYield();
      this.money += value;
      logs.push(`🌾 ${crop.name} yielded +$${value}`);
    });
  }

  animalsProduce(logs) {
    this.animals.forEach(animal => {
      const value = animal.getProductValue();
      this.money += value;
      logs.push(`🐖 ${animal.name} produced +$${value}`);
    });
  }

  // Static method to initialize a farm from saved data
  static fromJSON(data) {
    const farm = new Farm(data.name);
    farm.money = data.money;
    farm.animals = data.animals.map(a => new Animal(a.name));  // Recreate animal objects
    farm.crops = data.crops?.map(c => new Crop(c.name)) || [];  // Recreate crop objects
    return farm;
  }
}

export { Farm };

