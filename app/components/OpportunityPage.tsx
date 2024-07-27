
"use client";

import { useEffect, useState, useCallback } from 'react';
import OpportunityCard from '../components/OpportunityCard';
import { useFirestore } from '../../lib/hooks/useFirestore';
import { useAuth } from '@/lib/hooks/useAuth';
import { User } from 'firebase/auth';

interface Subtask {
  completed: boolean;
  text: string;
}

interface Opportunity {
  id: string;
  budget: string;
  createdAt: Date;
  deadline: string;
  description: string;
  subtasks: Subtask[];
  taskName: string;
  userId: string;
  workTypes: string[];
}

export default function OpportunityPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const { handleGetTasks, loading, error } = useFirestore();
  const { user } = useAuth() as { user: User | null };
    const userId = user?.uid;

  const fetchOpportunities = useCallback(async () => {
    try {
      const tasks = await handleGetTasks(userId);
      const opportunitiesList = tasks.map((task: any) => {
        const subtasks = task.subtasks.filter((subtask: Subtask) => subtask.completed);
        return {
          id: task.id,
          ...task,
          subtasks,
          createdAt: task.createdAt.toDate() // Ensure `createdAt` is a Firestore Timestamp
        };
      }) as Opportunity[];
      setOpportunities(opportunitiesList);
      console.log(opportunitiesList);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  }, [handleGetTasks, userId]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Available Opportunities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              id={opportunity.id}
              role={opportunity.taskName}
              scope={opportunity.description}
              stipend={opportunity.budget}
              deadline={opportunity.deadline}
              badges={opportunity.workTypes}
              
            />
          ))}
        </div>
      </div>
    </div>
  );
}