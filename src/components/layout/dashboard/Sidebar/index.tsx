import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBusinessTime,
  faUsers,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';

import { getPathName } from 'src/utils';
import classes from './Sidebar.module.css';

export const MENU_LINKS = [
  { title: 'Clients', url: 'clients', icon: faUsers },
  { title: 'Timesheets', url: 'timesheets', icon: faBusinessTime },
  { title: 'Consultants', url: 'consultants', icon: faUser },
];

export default function Sidebar() {
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState<any>(null);

  useEffect(() => {
    setCurrentRoute(getPathName(location.pathname, 'dashboard/'));
  }, [location.pathname]);

  return (
    <div className={classes['sidebar-container']}>
      <div className={classes['sidebar-links']}>
        {MENU_LINKS.map(
          (link: { title: string; url: string; icon: any }, key: number) => {
            const isCurrent =
              currentRoute === undefined && link.url === MENU_LINKS[0].url
                ? true
                : currentRoute === link.url.toLowerCase();

            return (
              <Link
                className={`${classes['g-link']} ${
                  isCurrent && classes['g-link-current']
                }`}
                key={key}
                to={
                  key === 0
                    ? '/dashboard'
                    : `/dashboard/${link.url.toLowerCase()}`
                }
                style={{ textDecoration: 'none' }}
              >
                <li
                  className={`${classes['li-link']} ${
                    isCurrent && classes['li-link-current']
                  }`}
                >
                  <FontAwesomeIcon icon={link.icon} />
                  <div style={{ textTransform: 'capitalize' }}>
                    {link.title}
                  </div>
                </li>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
