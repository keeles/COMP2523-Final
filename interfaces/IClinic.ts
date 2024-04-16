import IAddress from "./IAddress";
import Queue from "../Queue";

export default interface IClinic extends IAddress {
  name: string;
  staff: number;
  queue: Queue;
  currentIntakeAge: number;
}
