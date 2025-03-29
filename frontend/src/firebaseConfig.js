import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAznWfD_RxBx8YtURH23OrmJH6SNR2ZhmQ",
  authDomain: "expensetracker-6a94c.firebaseapp.com",
  projectId: "expensetracker-6a94c",
  storageBucket: "expensetracker-6a94c.firebasestorage.app",
  messagingSenderId: "125532299530",
  appId: "1:125532299530:web:2628c28e282953fa5a9af3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);