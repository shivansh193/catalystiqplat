"use client"
import { useEffect, useState } from 'react';
import OpportunityCard from '../components/OpportunityCard';
import { useFirestore } from '../../lib/hooks/useFirestore';

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
  const userId = 'exampleUserId'; // Replace with the actual user ID if available

  useEffect(() => {
    const fetchOpportunities = async () => {
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
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, [handleGetTasks, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Available Opportunities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              taskName={opportunity.taskName}
              description={opportunity.description}
              budget={opportunity.budget}
              deadline={opportunity.deadline}
              badges={opportunity.workTypes} // Pass the badges (workTypes) if needed
              subtasks={opportunity.subtasks} // Pass the filtered subtasks if needed
            />
          ))}
        </div>
      </div>
    </div>
  );
}
