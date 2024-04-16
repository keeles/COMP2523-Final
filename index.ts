import Map from "./Map";

async function main() {
  const map = await Map.buildMap("data.json");
  map.printMap();
  console.log("---End of Map---");
  map.registerForShots();
  //   const report = new ReportMaker(new ComplexReport(map));
  //   report.printDetails();
  //   console.log("---End of Report---");
  //   map.printMap();
  //   console.log("---End of Map---");
}

main();
