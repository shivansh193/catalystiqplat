// app/opportunity/[id]/apply/page.tsx
import ClientNavbar from '@/app/components/ClientNavbar';
import OpportunityApply from './OppApply';

const Home = () => {
  return (
    <div>
      <ClientNavbar />
      <OpportunityApply />
    </div>
  );
};

export default Home;
