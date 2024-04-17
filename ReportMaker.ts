import IReport from "./interfaces/IReport";

export default class ReportMaker {
  private _report: IReport;

  constructor(report: IReport) {
    this._report = report;
  }

  printDetails() {
    this._report.printDetails();
  }
}
