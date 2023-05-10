// In order to enforce user permissions on specific features and modules,
// we use this wrapping component to solve this issue. Principles can be found here:
// https://levelup.gitconnected.com/access-control-in-a-react-ui-71f1df60f354

export default function AccessControl(props: any) {
  const { userPermissions, allowedPermission, children, renderNoAccess } = props;

  // Check if user permissions contains allowed permissions
  if (checkPermissions(userPermissions, allowedPermission)) {
    return children;
  }

  if (!!renderNoAccess) {
    return renderNoAccess();
  }
  return null;
}

export const checkPermissions = (userPermissions: any, allowedPermission: any) => {
  if (!allowedPermission) {
    return true;
  }

  return userPermissions.some((permission: any) =>
    allowedPermission.includes(permission)
  );
};

export const allowedPermissionsObject = {};
