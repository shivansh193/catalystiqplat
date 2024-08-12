'use client';

import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../lib/firebase/initFirebase';
import { useRouter, useParams } from 'next/navigation';
import { User } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

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

const ListingClient = () => {
  const router = useRouter();
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [assignedSubtask, setAssignedSubtask] = useState<Subtask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth(app);
  const user = auth.currentUser as User;

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (id) {
        try {
          const db = app ? getFirestore(app) : null; // Check if app is defined
          if (!db) throw new Error('Firebase app is not initialized'); // Handle the case where app is undefined
          const docRef = doc(db, 'tasks', id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data() as Omit<Opportunity, 'id'>;
            setOpportunity({ id: docSnap.id, ...data });

            if (data.subtasks && data.subtasks.length > 0) {
              const randomSubtask = data.subtasks[Math.floor(Math.random() * data.subtasks.length)];
              setAssignedSubtask(randomSubtask);
            }
          } else {
            console.error('No such document!');
          }
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOpportunity();
  }, [id]);

  const handleApplyNow = () => {
    router.push(`/opportunities/${id}/apply`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Opportunity Details</h1>
        {opportunity ? (
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold mb-2">{opportunity.taskName}</h2>
            <p className="text-gray-700 mb-4">{opportunity.description}</p>
            <p className="text-green-500 font-semibold mb-4">Budget: ${opportunity.budget}</p>
            <p className="text-red-500 font-semibold mb-4">Deadline: {new Date(opportunity.deadline).toDateString()}</p>
            <div className="flex flex-wrap">
              {opportunity.workTypes.map((type, index) => (
                <span
                  key={index}
                  className={`text-white px-2 py-1 rounded-full text-sm mr-2 mb-2 ${
                    type === 'AI'
                      ? 'bg-purple-600'
                      : type === 'Tech'
                      ? 'bg-blue-600'
                      : type === 'Design'
                      ? 'bg-yellow-600'
                      : type === 'Marketing'
                      ? 'bg-green-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>
            {assignedSubtask && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Assigned Subtask:</h3>
                <p>{assignedSubtask.text}</p>
              </div>
            )}
            <button
              onClick={handleApplyNow}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        ) : (
          <div>Opportunity not found</div>
        )}
      </div>
    </div>
  );
};

export default ListingClient;
