import { useState, useCallback } from 'react';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { app } from '@/lib/firebase/initFirebase';
import { saveTask } from '@/lib/firebase/firestore'; 
export function useFirestore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveTask = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      const taskId = await saveTask(taskData);
      setLoading(false);
      return taskId;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  };

  const handleGetTasks = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore(app);
      const tasksCollection = collection(db, 'tasks');
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasks = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLoading(false);
      return tasks;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return [];
    }
  }, []);

  const handleGetTask = async (taskId) => {
    setLoading(true);
    setError(null);
    try {
      const db = getFirestore(app);
      const taskDocRef = doc(db, 'tasks', taskId);
      const taskDoc = await getDoc(taskDocRef);
      if (taskDoc.exists()) {
        const task = { id: taskDoc.id, ...taskDoc.data() };
        setLoading(false);
        return task;
      } else {
        setError('Task not found');
        setLoading(false);
        return null;
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return null;
    }
  };

  return { handleSaveTask, handleGetTasks, handleGetTask, loading, error };
}
