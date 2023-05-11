import Clients from 'src/components/layout/dashboard/Links/Clients/Clients';
import AccessControl from 'src/components/AccessControl';
import { useAppContext } from 'src/context/appContext';

const allowedPermissions = ['admin']

export default function Dashboard() {
  const { userInfo } = useAppContext()

  return (
      <AccessControl
        userPermissions={[userInfo?.type]}
        allowedPermission={allowedPermissions}
        renderNoAccess={() => <>Restricted</>}
      >
        <Clients />
      </AccessControl>
  );
}
