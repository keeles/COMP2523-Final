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

  get waitTime(): string {
    return `Current wait time is: ${this._data.length * 15} minutes`;
  }
}
