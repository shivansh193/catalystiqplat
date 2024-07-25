"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useFirestore } from '@/lib/hooks/useFirestore';
import ClientNavbar from '@/app/components/ClientNavbar';
import { Button } from '@/components/ui/button';

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

export default function TaskDetails() {
  const { TaskID } = useParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleGetTask } = useFirestore();

  useEffect(() => {
    let isMounted = true;
    const fetchOpportunity = async () => {
      if (TaskID) {
        try {
          const task = await handleGetTask(TaskID as string);
          if (isMounted) {
            setOpportunity(task as Opportunity);
            setIsLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setIsLoading(false);
          }
        }
      }
    };
    fetchOpportunity();
    return () => {
      isMounted = false;
    };
  }, [TaskID, handleGetTask]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ClientNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
              <div className="h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ClientNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-100">
        <ClientNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-gray-500">Opportunity not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ClientNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{opportunity.taskName}</h1>
        <p className="text-xl mb-4">Budget: {opportunity.budget}</p>
        <p className="text-xl mb-4">Deadline: {opportunity.deadline}</p>
        <p className="mb-4">{opportunity.description}</p>
        <h2 className="text-2xl font-bold mb-2">Subtasks:</h2>
        <ul className="list-disc pl-5 mb-4">
          {opportunity.subtasks.map((subtask, index) => (
            <li key={index} className={subtask.completed ? "line-through" : ""}>
              {subtask.text}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mb-2">Work Types:</h2>
        <div className="flex flex-wrap gap-2">
          {opportunity.workTypes.map((type, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {type}
            </span>
          ))}
        </div>
        < Button className='my-24'> Continue </Button>
      </div>
    </div>
  );
}