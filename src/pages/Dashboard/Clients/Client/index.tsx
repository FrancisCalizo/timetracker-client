import DashboardLayout from 'src/components/layout/dashboard/DashboardLayout';
import Client from 'src/components/layout/dashboard/Links/Clients/Client';
import AccessControl from 'src/components/AccessControl';
import { useAppContext } from 'src/context/appContext';

const allowedPermissions = ['admin']

export default function Dashboard() {
  const { userInfo } = useAppContext()

  return (
    <DashboardLayout>
      <AccessControl
        userPermissions={[userInfo?.type]}
        allowedPermission={allowedPermissions}
      >
        <Client />
      </AccessControl>
    </DashboardLayout>
  );
}
