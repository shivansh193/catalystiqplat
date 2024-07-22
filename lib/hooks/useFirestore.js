// hooks/useFirestore.js
import { useState } from 'react';
import { saveTask, getTasks } from '../firebase/firestore';

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

  const handleGetTasks = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const tasks = await getTasks(userId);
      setLoading(false);
      return tasks;
    } catch (e) {
      setError(e.message);
      setLoading(false);
      return [];
    }
  };

  return { handleSaveTask, handleGetTasks, loading, error };
}