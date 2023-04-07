import { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { MENU_LINKS } from 'src/components/layout/dashboard/Sidebar';
import { getPathName } from 'src/utils';
import classes from './MobileSidebar.module.css';

interface MobileSidebarProps {
  isBurgerOpen: boolean;
  setIsBurgerOpen: any;
}

export default function MobileSidebar({
  isBurgerOpen,
  setIsBurgerOpen,
}: MobileSidebarProps) {
  const [currentRoute, setCurrentRoute] = useState<any>(null);

  // useEffect(() => {
  //   setCurrentRoute(getPathName(location.pathname, 'dashboard/'));
  // }, [location.pathname]);

  const menuStyles = {
    bmBurgerButton: {
      position: 'fixed',
      height: '50px',
      width: '50px',
      top: '5px',
      left: '2px',
    },
    bmOverlay: {
      top: '0',
      left: '0',
    },
    bmMenuWrap: {
      display: isBurgerOpen ? 'block' : 'none',
      width: '300px',
      top: '0',
      left: '0',
    },
    bmMorphShape: {
      fill: '#fff',
    },
    bmItemList: {
      display: 'flex',
      width: '300px',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
    },
    bmItem: {
      display: 'inline-block',
      width: '100%',
      textAlign: 'center',
    },
    bmCross: {
      background: '#000',
    },
  };

  return (
    <Menu
      styles={menuStyles}
      onStateChange={(status: any) => setIsBurgerOpen(status.isOpen)}
      isOpen={isBurgerOpen}
    >
      <div
        className={classes['logo-container']}
        onClick={() => alert('clicked')}
      >
        <FontAwesomeIcon
          icon={faClock}
          style={{ fontSize: 30, marginRight: 15 }}
        />
        <p>TimeTracker</p>
      </div>

      {MENU_LINKS.map((link: { title: string; url: string }, key: number) => {
        const isCurrent =
          currentRoute === undefined && link.url === MENU_LINKS[0].url
            ? true
            : currentRoute === link.url.toLowerCase();

        return (
          <div
            className={`${classes['burger-container']} ${
              isCurrent && classes['burger-container-current']
            }`}
            key={key}
          >
            <a
              className="menu-item"
              href={
                key === 0
                  ? '/dashboard'
                  : `/dashboard/${link.url.toLowerCase()}`
              }
            >
              {link.title}
            </a>
          </div>
        );
      })}
    </Menu>
  );
}
