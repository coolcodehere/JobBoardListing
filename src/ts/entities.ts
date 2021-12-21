export interface RawJobData {
  id: string;
  companyName: string;
  jobTitle: string;
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

export interface ResolvedJobData extends RawJobData {
  jobSource: string;
}

export interface JobBoardWrapper {
  [index: string]: JobBoard;
}
