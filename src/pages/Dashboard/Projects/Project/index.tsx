import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import Project from 'src/components/layout/dashboard/Links/Projects/Project';
import AccessControl from 'src/components/AccessControl';
import { useAppContext } from 'src/context/appContext';

const allowedPermissions = ['admin', 'candidate']

export default function Dashboard() {
  const { userInfo } = useAppContext()

  return (
    <DashboardLayout>
      <AccessControl
        userPermissions={[userInfo?.type]}
        allowedPermission={allowedPermissions}
      >
        <Project />
      </AccessControl>
    </DashboardLayout>
  );
}
