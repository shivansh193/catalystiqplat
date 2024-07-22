// lib/firebase/initFirebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);

  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
}
const database = getDatabase(app);

export { database, ref, get, child };
export default app;
