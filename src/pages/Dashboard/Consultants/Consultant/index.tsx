import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import Consultant from 'src/components/layout/dashboard/Links/Consultants/Consultant';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Consultant />
    </DashboardLayout>
  );
}
