"use client";

import { useState, useEffect } from 'react';
import { useFirestore } from '@/lib/hooks/useFirestore';
import { useAuth } from '@/lib/hooks/useAuth';
import TaskList from '../components/TaskList';
import FinancialSummary from '../components/Summary';
import ProjectHistory from '../components/ProjectHistory';
import ActiveOpportunities from '../components/ActiveOpportunities';
import { Separator } from '@/components/ui/separator';
import ApplicantManagement from '../components/ApplicantManagement';
import Link from 'next/link'; // Import Link for navigation

export default function OrgDashboard() {
  const { user } = useAuth();
  const { handleGetTasks, loading, error } = useFirestore();
  const [tasks, setTasks] = useState<{ id: number; taskName: string }[]>([]); // Updated type to include taskName

  const fetchTasks = async () => {
    const fetchedTasks = await handleGetTasks(user.uid);
    setTasks(fetchedTasks.map(task => ({ id: Number(task.id), taskName: task.taskName }))); // Ensure fetched tasks match the expected type
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organization Dashboard</h1>
      <Separator/>
      <div className="mb-4 flex justify-between px-24"> {/* Added padding on edges */}
        <Link href="/orgtask">
          <button className="px-4 py-2 text-xl bg-black text-white rounded">New Task</button>
        </Link>
        <a href="#applicants"> {/* New button for applicants */}
          <button className="px-4 py-2 text-xl bg-black text-white rounded">List of Applicants</button>
        </a>
        <Link href="/OrgLanding">
          <button className="px-4 py-2 bg-black text-xl text-white rounded">Home</button>
        </Link>
      </div>
      
      <TaskList tasks={tasks} />
      <FinancialSummary tasks={tasks} />
      <ProjectHistory tasks={tasks} />
      <ActiveOpportunities tasks={tasks} onUpdate={fetchTasks} />
      <div id="applicants">
        <ApplicantManagement tasks={tasks} onUpdate={fetchTasks} />
      </div>
    </div>
  );
}