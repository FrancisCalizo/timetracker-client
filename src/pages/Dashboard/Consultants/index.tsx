import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import ConsultantsComponent from 'src/components/layout/dashboard/Links/Consultants';

export default function Timesheets() {
  return (
    <DashboardLayout>
      <ConsultantsComponent />
    </DashboardLayout>
  );
}
