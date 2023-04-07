import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import Clients from 'src/pages/Dashboard/Clients';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Clients />
    </DashboardLayout>
  );
}
