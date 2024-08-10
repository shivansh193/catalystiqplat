"use client";

import { useState, useEffect } from 'react';
import { useFirestore } from '@/lib/hooks/useFirestore';
import { useAuth } from '@/lib/hooks/useAuth';
import TaskList from '../components/TaskList';
import FinancialSummary from '../components/Summary';
import ProjectHistory from '../components/ProjectHistory';
import ActiveOpportunities from '../components/ActiveOpportunities';
import ApplicantManagement from '../components/ApplicantManagement';

export default function OrgDashboard() {
  const { user } = useAuth();
  const { handleGetTasks, loading, error } = useFirestore();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    const fetchedTasks = await handleGetTasks(user.uid);
    setTasks(fetchedTasks);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organization Dashboard</h1>
      <TaskList tasks={tasks} />
      <FinancialSummary tasks={tasks} />
      <ProjectHistory tasks={tasks} />
      <ActiveOpportunities tasks={tasks} onUpdate={fetchTasks} />
      <ApplicantManagement tasks={tasks} onUpdate={fetchTasks} />
    </div>
  );
}