export interface RawJobData {
  "ID (primary key)": string;
  "Company Name": string;
  "Job Title": string;
  "Job URL": string;
}

export interface JobData {
  id: string;
  jobTitle: string;
  companyName: string;
  jobURL: string;
}

export interface RawJobBoard {
  job_boards: JobBoard[];
}

export interface JobBoard {
  name: string;
  rating: string;
  root_domain: string;
  logo_file: string;
  description: string;
}

export interface ResolvedJobData extends JobData {
  jobSource: string;
}

export interface JobBoardWrapper {
  [index: string]: JobBoard;
}

export interface indexedJobPostings {
  [index: string]: ResolvedJobData[];
}
