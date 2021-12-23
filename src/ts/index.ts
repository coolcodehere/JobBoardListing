import * as Entities from "./entities";
import { getJobBoards } from "./firebase";
import * as Classifier from "./jobClassifier";

function createJobBoard(jobBoard: Entities.JobBoard) {
  const mainBox = document.createElement("a");
  const companyLogo = document.createElement("img");
  const description = document.createElement("div");
  const rating = document.createElement("p");

  companyLogo.src = jobBoard.logo_file;
  description.innerText = jobBoard.description;
  rating.innerText = jobBoard.rating;

  mainBox.href = "https://www.google.com";
  mainBox.className = "boardBox";
  companyLogo.className = "logo";
  description.className = "description";
  rating.className = "rating";

  switch (jobBoard.rating) {
    case "Great":
      rating.style.color = "#1dff00";
      break;
    case "Good":
      rating.style.color = "#fbff00";
      break;
    case "Okay":
      rating.style.color = "#ff0000";
      break;
  }

  mainBox.appendChild(rating);
  mainBox.appendChild(companyLogo);
  mainBox.appendChild(description);

  return mainBox;
}

function drawTable(table: HTMLTableElement, jobs: Entities.ResolvedJobData[]) {
  jobs.forEach((job) => {
    addJobToTable(job, table);
  });
}

// Add resolved job post object to table in HTML
function addJobToTable(job: Entities.ResolvedJobData, table: HTMLTableElement) {
  const row = table.insertRow();

  const jobTitle = row.insertCell();
  const jobCompany = row.insertCell();
  const jobSource = row.insertCell();
  const jobLink = row.insertCell();

  jobTitle.innerText = job.jobTitle;
  jobCompany.innerText = job.companyName;
  jobSource.innerText = job.jobSource;
  jobLink.innerText = job.jobURL;
  jobLink.className = "jobLink";
  jobLink.addEventListener("click", () => {
    window.open(job.jobURL);
  });
}

const app = document.getElementById("app");
(async () => {
  const jobs = Classifier.jobSourceResolver();

  for (const jobBoard of await getJobBoards()) {
    app?.appendChild(createJobBoard(jobBoard));
  }
})();
