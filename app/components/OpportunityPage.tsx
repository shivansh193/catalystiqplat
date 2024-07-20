// pages/index.js
import OpportunityCard from '../components/OpportunityCard';

export default function Home() {
  const opportunities = [
    {
      role: 'Full Stack Developer',
      scope: 'Develop a full stack web application',
      stipend: '1500',
      badges: ['Tech', 'AI'],
    },
    {
      role: 'Graphic Designer',
      scope: 'Design marketing materials',
      stipend: '800',
      badges: ['Design', 'Marketing'],
    },
    // Add more opportunities as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Available Opportunities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity, index) => (
            <OpportunityCard
              key={index}
              role={opportunity.role}
              scope={opportunity.scope}
              stipend={opportunity.stipend}
              badges={opportunity.badges}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
