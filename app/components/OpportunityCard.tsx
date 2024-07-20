// components/OpportunityCard.js
import React from 'react';

const OpportunityCard = ({ role, scope, stipend, badges }: any) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-bold mb-2">{role}</h2>
      <p className="text-gray-700 mb-4">{scope}</p>
      <p className="text-green-500 font-semibold mb-4">${stipend}</p>
      <div className="flex flex-wrap">
        {badges.map((badge: any, index: any) => (
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
        ))}
      </div>
    </div>
  );
};

export default OpportunityCard;
