// app/opportunity/[id]/apply/page.tsx
import ClientNavbar from '@/app/components/ClientNavbar';
import OpportunityApply from './OppApply';

const ApplyPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ClientNavbar />
      <OpportunityApply params={params} />
    </div>
  );
};

export default ApplyPage;
