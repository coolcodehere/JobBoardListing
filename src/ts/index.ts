import * as Entities from "./entities";
import { getJobBoards } from "./firebase";
import * as Classifier from "./jobClassifier";

function createJobBoard(jobBoard: Entities.JobBoard) {
  const mainBox = document.createElement("div");
  const companyLogo = document.createElement("img");
  const description = document.createElement("div");
  const titleDiv = document.createElement("div");
  const title = document.createElement("span");
  const rating = document.createElement("p");
  const numJobs = document.createElement("p");

  description.innerText = jobBoard.description;
  rating.innerText = jobBoard.rating;
  title.innerText = jobBoard.name;
  companyLogo.src = jobBoard.logo_file;

  mainBox.className = "boardBox";
  companyLogo.className = "logo";
  description.className = "description";
  rating.className = "rating";
  titleDiv.className = "horizontal-center vertical-center";
  rating.style.color = getRatingColor(jobBoard.rating);

  titleDiv.appendChild(companyLogo);
  titleDiv.appendChild(title);
  mainBox.appendChild(rating);
  mainBox.appendChild(titleDiv);
  mainBox.appendChild(description);

  return mainBox;
}

function getRatingColor(rating: string) {
  switch (rating) {
    case "Great":
      return "#1dff00";
    case "Good":
      return "#fbff00";
    case "Okay":
      return "#ff0000";
    default:
      return "#000000";
  }
}

function createTable(
  jobBoard: Entities.JobBoard,
  jobPostings: Entities.ResolvedJobData[]
) {
  const table = document.createElement("table");
  table.id = "jobTable";
  const tableHead = document.createElement("thead");
  const tableBody = document.createElement("tbody");

  const tableHeadRow = document.createElement("tr");
  const tableHeadRowTitle = document.createElement("td");
  const tableHeadRowCompany = document.createElement("td");
  const tableHeadRowSource = document.createElement("td");

  tableHeadRowTitle.innerText = "Title";
  tableHeadRowCompany.innerText = "Company";
  tableHeadRowSource.innerText = "Post Source";

  try {
    for (const jobPosting of jobPostings) {
      const tableBodyRow = document.createElement("tr");
      const tableBodyRowTitle = document.createElement("td");
      const tableBodyRowCompany = document.createElement("td");
      const url = document.createElement("a");
      const tableBodyRowSource = document.createElement("td");

      tableBodyRowTitle.innerText = jobPosting.jobTitle;
      tableBodyRowCompany.innerText = jobPosting.companyName;
      url.href = jobPosting.jobURL;
      url.innerText = jobBoard.name;

      tableBodyRowSource.appendChild(url);
      tableBodyRow.appendChild(tableBodyRowTitle);
      tableBodyRow.appendChild(tableBodyRowCompany);
      tableBodyRow.appendChild(tableBodyRowSource);
      tableBody.appendChild(tableBodyRow);
    }

    tableHeadRow.appendChild(tableHeadRowTitle);
    tableHeadRow.appendChild(tableHeadRowCompany);
    tableHeadRow.appendChild(tableHeadRowSource);

    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    table.appendChild(tableBody);
  } catch (e) {
    const noJobsMessage = document.createElement("p");
    noJobsMessage.style.textAlign = "center";
    noJobsMessage.innerText = "No jobs found";
    table.appendChild(noJobsMessage);
  }

  return table;
}

function scrollTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Reveals the div specified by onId and hides the div specified by offId
function toggleDisplay(onId: string, offId: string) {
  const onDiv = document.getElementById(onId);
  const offDiv = document.getElementById(offId);

  if (!onDiv || !offDiv) {
    return;
  }

  onDiv.style.display = "block";
  offDiv.style.display = "none";
}

async function app(
  jobBoards: Entities.JobBoard[],
  jobPostings: Promise<Entities.indexedJobPostings>
) {
  const boardsDiv = document.getElementById("boards");
  const tableDiv = document.getElementById("table");
  const boardsSubDiv = document.getElementById("boards-sub");
  const tableSubDiv = document.getElementById("table-sub");

  if (!boardsDiv || !tableDiv || !boardsSubDiv || !tableSubDiv) {
    alert("Error: Please Refresh");
    return;
  }

  document.getElementById("back-button")?.addEventListener("click", () => {
    toggleDisplay("boards", "table");
    scrollTop();
    while (tableSubDiv.children.length > 0) {
      tableSubDiv.removeChild(tableSubDiv.children[0]);
    }
  });

  for (const jobBoard of jobBoards) {
    const board = createJobBoard(jobBoard);

    board.addEventListener("click", async () => {
      scrollTop();
      toggleDisplay("table", "boards");
      let title = document.getElementById("tableTitle");
      if (!title) {
        title = document.createElement("p");
        title.className = "horizontal-center tableTitle";
      }

      title.innerText = `Jobs on ${jobBoard.name}`;

      const table = createTable(jobBoard, (await jobPostings)[jobBoard.name]);
      tableSubDiv.appendChild(title);
      tableSubDiv.appendChild(table);
    });

    boardsSubDiv.appendChild(board);
  }
}

(async () => {
  const jobBoards = await getJobBoards();
  const indexedJobPostings = Classifier.indexJobsBySource();

  app(jobBoards, indexedJobPostings);
})();
