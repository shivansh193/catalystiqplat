// lib/firebase/firestore.js
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import app from "./initFirebase";

const db = getFirestore(app);

export async function saveTask(taskData) {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), taskData);
    console.log("Task saved successfully with ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error saving task:", e);
    throw e;
  }
}

export async function getTasks(userId) {
  try {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting tasks:", e);
    throw e;
  }
}