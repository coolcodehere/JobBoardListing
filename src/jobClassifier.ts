import { getFile } from "./utility";
import * as Entities from "./entities";
import { parseJobData } from "./csvHandler";

async function parseJSONData(path: string): Promise<Entities.JobBoardWrapper> {
  const file = await getFile(path, true);
  const jobBoards = JSON.parse(file.toString());

  const parsedJobBoards: Record<string, Entities.JobBoard> = {};

  jobBoards.job_boards.forEach((jobBoard: Entities.JobBoard) => {
    parsedJobBoards[jobBoard.root_domain] = jobBoard;
  });

  return parsedJobBoards;
}

async function classifyJobs(
  jobs: Entities.RawJobData[]
): Promise<Entities.ResolvedJobData[]> {
  const jobBoards = await parseJSONData("./data/jobBoards.json");

  return jobs.map((job) => {
    return { ...job, jobSource: identifyJob(job, jobBoards) };
  });
}

function identifyJob(
  job: Entities.RawJobData,
  jobBoard: Entities.JobBoardWrapper
): string {
  const jobDomain = getDomain(job.jobURL);

  if (!jobDomain) {
    return "Unknown";
  } else if (jobBoard[jobDomain]) {
    return jobBoard[jobDomain].name;
  } else if (jobDomain.toLowerCase().includes(job.companyName.toLowerCase())) {
    return "Company Website";
  }

  return "Unknown";
}

function getDomain(jobURL: string | undefined): string | undefined {
  if (jobURL) {
    return jobURL.split("/")[2]?.split(".").slice(1).join(".");
  }
}

(async () => {
  const jobs = await parseJobData();
  console.log(await classifyJobs(jobs));
})();
