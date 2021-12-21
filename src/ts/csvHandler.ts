// import { RawJobData } from "./entities";
// import * as Papa from "papaparse";

// export function parseJobData(): RawJobData[] {
//   const jobData: RawJobData[] = [];

//   const textData = getFile("./data/job_opportunities.csv");
//   const csv = Papa.parse<string[]>(textData).data.map((line) =>
//     parseLine(line)
//   );
//   return csv.slice(1);
// }

// function parseLine(line: string[]): RawJobData {
//   return {
//     id: line[0],
//     companyName: line[2],
//     jobURL: line[3],
//     jobTitle: line[1],
//   };
// }
