import React from 'react';
import Link from 'next/link';

interface Subtask {
  completed: boolean;
  text: string;
}

interface OpportunityCardProps {
  id: string;
  role: string;
  scope: string;
  stipend: string;
  deadline: string;
  badges: string[];
  subtasks?: Subtask[];
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ id, role, scope, stipend, deadline, badges, subtasks }) => {
  return (
    <Link href={`/task/${id}`}>
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{role}</h2>
      <p className="text-gray-700 mb-4">{scope}</p>
      <p className="text-green-500 font-semibold mb-4">${stipend}</p>
      <p className="text-gray-600 mb-4">Deadline: {deadline}</p>
      <div className="flex flex-wrap mb-4">
        {badges && badges.length > 0 ? (
          badges.map((badge, index) => (
            <span
              key={index}
              className={`text-white px-2 py-1 rounded-full text-sm mr-2 mb-2 ${
                badge === 'AI'
                  ? 'bg-purple-600'
                  : badge === 'Tech'
                  ? 'bg-blue-600'
                  : badge === 'Design'
                  ? 'bg-yellow-600'
                  : badge === 'Marketing'
                  ? 'bg-green-600'
                  : 'bg-gray-600'
              }`}
            >
              {badge}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No work types specified</span>
        )}
      </div>
      <div>
        {/* <h3 className="font-bold mb-2">Completed Subtasks:</h3> */}
        {subtasks && subtasks.length > 0 ? (
          <ul className="list-disc list-inside">
            {subtasks.map((subtask, index) => (
              <li key={index} className="text-gray-600">{subtask.text}</li>
            ))}
          </ul>
        ) : (
          // <p className="text-gray-500">No completed subtasks</p> 
          <>  </>
        )}
      </div>
    </div>
    </Link>
  );
};

export default OpportunityCard;