import { useState } from 'react';
import { Popover, PopoverState } from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faBars,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

import MobileSidebar from '../MobileSidebar';
import UserDropdown from '../UserDropdown';
import classes from './Topbar.module.css';

export default function Topbar() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className={classes['topbar-container']}>
      <div>
        <div className={classes['logo-container']}>
          <FontAwesomeIcon
            icon={faClock}
            style={{ fontSize: 30, color: '#fff' }}
          />
          <p>TimeTracker</p>
        </div>

        <div className={classes['menu-container']}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: 30, color: '#fff' }}
            />
          </div>

          <MobileSidebar
            setIsBurgerOpen={setIsBurgerOpen}
            isBurgerOpen={isBurgerOpen}
          />
        </div>
      </div>

      <div className={classes['right-section']}>
        <div>
          <span className={classes['user-name']}>Albert Johnson</span>
          <p className={classes['user-title']}>Consultant</p>
        </div>

        <Popover
          isOpen={isPopoverOpen}
          positions={['bottom']}
          content={(props: PopoverState) => <UserDropdown {...props} />}
          align="end"
          onClickOutside={() => setIsPopoverOpen(false)}
          containerStyle={{ top: '-15px', zIndex: '100' }}
        >
          <button
            className={classes['user-button']}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ fontSize: 36, color: '#fff' }}
            />
          </button>
        </Popover>
      </div>
    </div>
  );
}
