import IMapData from "./interfaces/IMapData";
import IReport from "./interfaces/IReport";
import {EOL} from "os";

export default class ComplexReport implements IReport {
  private _data: IMapData;

  constructor(data: IMapData) {
    this._data = data;
  }

  printDetails() {
    this.generateReport(this._data);
  }

  generateReport(data: IMapData) {
    const cities = Object.keys(data.city);
    let index = 0;
    let str: string = `---Complex Report---${EOL}${EOL}`;
    Object.values(data.city).map((locs) => {
      let locStr = `---${cities[index]} Region---${EOL}`;
      let waitTime = 0;
      locs.clinics.map((c) => {
        if (c.queue) {
          locStr += `${c.name} has ${c.queue.size} people in line ${EOL}`;
          waitTime += c.queue.waitTime;
          locStr += `Average Wait Time: ${waitTime} minutes${EOL}${EOL}`;
          return;
        }
        locStr += `${c.name} has 0 people in line ${EOL}`;
        locStr += `Average Wait Time: ${waitTime} minutes${EOL}${EOL}`;
      });
      str += locStr;
      index++;
    });
    console.log(str);
  }
}
