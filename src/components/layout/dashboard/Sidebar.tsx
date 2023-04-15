import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBusinessTime,
  faUsers,
  faUser,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';
import classnames from 'classnames'

import { getPathName } from 'src/utils';

export const MENU_LINKS = [
  { title: 'Clients', url: 'clients', icon: faUsers },
  { title: 'Timesheets', url: 'timesheets', icon: faBusinessTime },
  { title: 'Consultants', url: 'consultants', icon: faUser },
  { title: 'Settings', url: 'settings', icon: faCog, section: 'BOTTOM' },
];

export default function Sidebar() {
  const location = useLocation();

  const [currentRoute, setCurrentRoute] = useState<any>(null);

  useEffect(() => {
    setCurrentRoute(getPathName(location.pathname, 'dashboard/'));
  }, [location.pathname]);

  return (
    <Styled>
      <div className={'sidebar-links'}>
        {MENU_LINKS.map(
          (link: { title: string; url: string; icon: any }, key: number) => {
            const isCurrent =
              currentRoute === undefined && link.url === MENU_LINKS[0].url
                ? true
                : currentRoute === link.url.toLowerCase();
            return (
              <Link
                className={classnames('g-link', isCurrent && 'g-link-current')}
                key={key}
                to={
                  key === 0
                    ? '/dashboard'
                    : `/dashboard/${link.url.toLowerCase()}`
                }                
              >
                <li
                  className={classnames('li-link', isCurrent && 'li-link-current')}
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
    </Styled>
  );
}

const Styled = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 99;
  width: 260px;
  padding: 2rem 0;
  box-sizing: border-box;
  overflow-y: auto;
  transition: all 300ms ease-in-out;

  @media (max-width: 768px) {
    display: none;
  }

  .sidebar-links {
    display: flex;
    flex-direction: column;    
    list-style-type: none;
    margin-top: 32px;
    height: 100%;    
  }

  .li-link {
    font-size: 1rem;
    padding: 1rem 1.85rem;
    transition: all 0.1s ease-out;    
    display: flex;
    align-items: center;

    &:hover {
      filter: brightness(120%);
      background: ${(props) => props.theme.colors.primary};
      cursor: pointer;
      color: #fff;
    }  

    & .li-link-current svg {
    color: #fff;
  }

    & a {
      padding: 0.3rem;
      border-radius: 2px;
      background-position: right bottom;
      transition: all 0.1s ease-out;
    }

    & svg {
      width: 40px !important;
      font-size: 24;
      margin-right: 0.5rem;
      color: gray;
    }
  }

  .g-link {
    color: #000;
    transition: all 300ms ease-in-out;
    text-transform: capitalize;
  }

  .g-link-current {
    color: #fff;
    background: ${(props) => props.theme.colors.primary};
}
`
