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

const app = document.getElementById("app");
(async () => {
  for (const jobBoard of await getJobBoards()) {
    app?.appendChild(createJobBoard(jobBoard));
  }
})();
