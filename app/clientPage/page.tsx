// pages/client-page.tsx
import { Navbar } from '@/components/navbar';
import ClientNavbar from '../components/ClientNavbar';
import OpportunityPage from '../components/OpportunityPage';

const ClientPage = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Client Page</h1>
      <OpportunityPage />
    </div>
  );
};

export default ClientPage;
