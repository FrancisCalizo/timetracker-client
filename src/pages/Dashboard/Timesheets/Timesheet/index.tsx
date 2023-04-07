import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import Timesheet from 'src/components/layout/dashboard/Links/Timesheets/Timesheet';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Timesheet />
    </DashboardLayout>
  );
}
