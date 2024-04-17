import IMapData from "./interfaces/IMapData";
import IReport from "./interfaces/IReport";
import {EOL} from "os";

export default class SimpleReport implements IReport {
  private _data: IMapData;

  constructor(data: IMapData) {
    this._data = data;
  }

  printDetails() {
    this.generateReport(this._data);
  }

  private generateReport(data: IMapData) {
    let str: string = `---Simple Report---${EOL}${EOL}`;
    const report = Object.values(data.city).map((locs) => {
      return locs.clinics.map((c) => {
        if (c.queue) {
          str += `${c.name} has ${c.queue.size} people in line ${EOL}`;
        }
        str += `${c.name} has 0 people in line ${EOL}`;
      });
    });
    console.log(str);
  }
}
