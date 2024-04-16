import * as fs from "node:fs/promises";
import IMapData from "./interfaces/IMapData";
import ICity from "./interfaces/ICity";
import IHousehold from "./interfaces/IHousehold";
import IPerson from "./interfaces/IPerson";
import IAddress from "./interfaces/IAddress";
import IClinic from "./interfaces/IClinic";
import {createInterface} from "node:readline";
import Queue from "./Queue";

export default class Map {
  private _mapData: IMapData;

  private constructor(mapData: IMapData) {
    this._mapData = mapData;
  }

  static async buildMap(fileName: string) {
    const mapData = await fs.readFile(fileName, "utf8");
    const mapObj: IMapData = JSON.parse(mapData);
    return new Map(mapObj);
  }

  printMap() {
    const cities = Object.keys(this._mapData.city);
    const sorted = cities.map((city) => sortByBlockNum(this._mapData.city[city]));
    const output = sorted.map((city) => {
      const cityMap = city.map((address) => {
        //@ts-ignore
        if (address.inhabitants) {
          //@ts-ignore
          if (isVaccinated(address.inhabitants)) {
            return "F";
          } else {
            return "H";
          }
        } else {
          return "C";
        }
      });
      return cityMap;
    });
    console.log(output);
  }

  registerForShots() {
    const cities = Object.keys(this._mapData.city);
    const sorted = cities.map((city) => sortByBlockNum(this._mapData.city[city]));
    sorted.map((city) => {
      city.map((address) => {
        //@ts-ignore
        if (address.inhabitants) {
          //@ts-ignore
          addToClosestQueue(address, city);
        }
      });
    });
  }
}

function isVaccinated(inhabitants: IPerson[]) {
  const unVaxed = inhabitants.filter((person) => !person.isVaccinated);
  return !unVaxed.length;
}

function sortByBlockNum(city: ICity) {
  const sortedHouse = city.households;
  const sortedClinics = city.clinics;
  const sorted = [...sortedHouse, ...sortedClinics].sort((a, b) => a.blockNum - b.blockNum);
  return sorted;
}

function addToClosestQueue(address: IHousehold, sorted: IAddress[]) {
  const unVaxed = address.inhabitants.filter((person) => !person.isVaccinated);
  let distance: number = 1000; // There is definitely a better way to do this...
  //@ts-ignore
  let closestClinic = sorted.filter((add) => !!add.name)[0];
  const findClosest = sorted.map((a) => {
    //@ts-ignore
    if (a.name) {
      const distFromAddress = a.blockNum - address.blockNum;
      if (distFromAddress < distance) {
        distance = distFromAddress;
        closestClinic = a as IClinic;
      }
    }
  });
  unVaxed.map((person) => joinWaitlist(person, closestClinic as IClinic));
}

function joinWaitlist(person: IPerson, clinic: IClinic) {
  if (!clinic.queue) {
    clinic.queue = new Queue();
  }
  if (person.age > clinic.currentIntakeAge) {
    clinic.queue.enqueue(person);
    console.log(`${person.fullName} was registered for vaccination at ${clinic.name}`);
  }
}
