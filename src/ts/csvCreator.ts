import * as Entities from "./entities";
import { jobSourceResolver } from "./jobClassifier";
import papa from "papaparse";
import fs from "fs";

async function createCSV(jobs: Entities.ResolvedJobData[]) {
  const csvData = papa.unparse(jobs);
  fs.writeFileSync("resolved_jobs.csv", csvData);
}

(async () => {
  const jobs = await jobSourceResolver();
  createCSV(jobs);
})();
