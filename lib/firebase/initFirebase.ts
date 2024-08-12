// lib/firebase/initFirebase.ts
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get, child, Database } from "firebase/database";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp | undefined; // Initialize app as undefined

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    getAnalytics(app);
  }
}

const database: Database = getDatabase(app!); // Use non-null assertion

export { database, ref, get, child, app };
export default app;