import * as Entities from "./entities";
import { getJobBoards } from "./firebase";

async function parseJSONData() {
  const jobBoards = await getJobBoards();
  const parsedJobBoards: Record<string, Entities.JobBoard> = {};

  jobBoards.forEach((jobBoard: Entities.JobBoard) => {
    parsedJobBoards[jobBoard.root_domain] = jobBoard;
  });

  return parsedJobBoards;
}

async function classifyJobs(
  jobs: Entities.RawJobData[]
): Promise<Entities.ResolvedJobData[]> {
  const jobBoards = await parseJSONData();

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
