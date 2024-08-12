// app/opportunity/[id]/page.tsx
import ClientNavbar from '@/app/components/ClientNavbar';
import OpportunityDetail from './OpportunityClient';

const OpportunityPage = () => {
  return (
    <div>
      <ClientNavbar />
      <OpportunityDetail />
    </div>
  );
};

export default OpportunityPage;
