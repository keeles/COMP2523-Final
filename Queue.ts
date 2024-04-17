import IPerson from "./interfaces/IPerson";

export default class Queue {
  private _data: IPerson[] = [];

  enqueue(person: IPerson) {
    this._data.push(person);
  }

  dequeue(): IPerson | undefined {
    return this._data.shift();
  }

  get size() {
    return this._data.length;
  }

  get waitTime(): number {
    return this._data.length * 15;
  }
}
