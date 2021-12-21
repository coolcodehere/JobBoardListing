// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, getDatabase, get, ref } from "firebase/database";
import * as Entities from "./entities";

const firebaseConfig = {
  apiKey: "AIzaSyAEDOxngod6xUPZblKytvryFpiuG12Nb4Y",
  authDomain: "pathrise-5a820.firebaseapp.com",
  databaseURL: "https://pathrise-5a820-default-rtdb.firebaseio.com",
  projectId: "pathrise-5a820",
  storageBucket: "pathrise-5a820.appspot.com",
  messagingSenderId: "331209768878",
  appId: "1:331209768878:web:805a681e8cd14b3dc1d23f",
  measurementId: "G-XKSWZ6Y7RE",
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

export async function getJobBoards(): Promise<Entities.JobBoard[]> {
  const res = await get(child(dbRef, "job_boards"))
    .then((snapshot: any) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("Job Boards not found");
      }
    })
    .catch((error) => {
      throw new Error("Unknown error occurred");
    });

  console.log(res);
  return res;
}

export async function getJobPostings(): Promise<Entities.RawJobData[]> {
  return await get(child(dbRef, "jobs"))
    .then((snapshot: any) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        throw new Error("Job Boards not found");
      }
    })
    .catch((error) => {
      throw new Error("Unknown error occurred");
    });
}
