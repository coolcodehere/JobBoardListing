import * as Entities from "./entities";
import { getJobBoards, getJobPostings } from "./firebase";

async function parseJobBoards(jobBoards: Entities.JobBoard[]) {
  const parsedJobBoards: Record<string, Entities.JobBoard> = {};

  jobBoards.forEach((jobBoard: Entities.JobBoard) => {
    parsedJobBoards[jobBoard.root_domain] = jobBoard;
  });

  return parsedJobBoards;
}

async function classifyJobs(
  jobs: Entities.JobData[],
  jobBoards: Entities.JobBoardWrapper
): Promise<Entities.ResolvedJobData[]> {
  return jobs.map((job) => {
    const jobDomain = getDomain(job.jobURL);
    let source: string;
    if (!jobDomain) {
      source = "Unknown";
    } else if (jobBoards[jobDomain]) {
      source = jobBoards[jobDomain].name;
    } else if (
      jobDomain.toLowerCase().includes(job.companyName.toLowerCase())
    ) {
      source = "Company Website";
    } else {
      source = "Unknown";
    }

    return { ...job, jobSource: source };
  });
}

function getDomain(jobURL: string | undefined): string | undefined {
  if (jobURL) {
    return jobURL.split("/")[2]?.split(".").slice(1).join(".");
  }
}

export async function jobSourceResolver(): Promise<Entities.ResolvedJobData[]> {
  const jobBoards = await parseJobBoards(await getJobBoards());
  const jobPostings = await getJobPostings();
  return await classifyJobs(jobPostings, jobBoards);
}

export async function indexJobsBySource(): Promise<Entities.indexedJobPostings> {
  const jobSources: Record<string, Entities.ResolvedJobData[]> = {};
  const jobs = await jobSourceResolver();
  jobs.forEach((job) => {
    if (!jobSources[job.jobSource]) {
      jobSources[job.jobSource] = [];
    }

    jobSources[job.jobSource].push(job);
  });

  return jobSources;
}
