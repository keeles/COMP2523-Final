import ICity from "./ICity";

export default interface IMapData {
  city: {
    [key: string]: ICity;
  };
}
