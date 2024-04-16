import IAddress from "./IAddress";
import IPerson from "./IPerson";

export default interface IHousehold extends IAddress {
  inhabitants: IPerson[];
}
