// pages/client-page.tsx
import ClientNavbar from '../components/ClientNavbar';
import OpportunityPage from '../components/OpportunityPage';

const ClientPage = () => {
  return (
    <div>
      <ClientNavbar />
      <h1>Welcome to the Client Page</h1>
      <OpportunityPage />
    </div>
  );
};

export default ClientPage;
