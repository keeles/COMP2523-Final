import IClinic from "./IClinic";
import IHousehold from "./IHousehold";

export default interface ICity {
  households: IHousehold[];
  clinics: IClinic[];
}
