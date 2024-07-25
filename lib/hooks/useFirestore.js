// hooks/useFirestore.js
import { useState, useCallback } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '@/lib/firebase/initFirebase';

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

  return { handleSaveTask, handleGetTasks, loading, error };
}
