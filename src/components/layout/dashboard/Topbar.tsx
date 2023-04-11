import { useState } from 'react';
import styled from 'styled-components';
import { Popover, PopoverState } from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faBars,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from 'src/context/appContext';

import MobileSidebar from './MobileSidebar';
import UserDropdown from './UserDropdown';

export default function Topbar() {
  const { userInfo } = useAppContext()

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Styled>
      <div>
        <div className={'logo-container'}>
          <FontAwesomeIcon
            icon={faClock}
            style={{ fontSize: 30, color: '#fff' }}
          />
          <p>TimeTracker</p>
        </div>

        <div className={'menu-container'}>
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

      <div className={'right-section'}>
        <div>
          <span className={'user-name'}>
            {`${userInfo?.firstName} ${userInfo?.lastName}`}
          </span>
          <p className={'user-title'}>{userInfo?.type}</p>
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
            className={'user-button'}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ fontSize: 36, color: '#fff' }}
            />
          </button>
        </Popover>
      </div>
    </Styled>
  );
}

const Styled = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  text-transform: uppercase;
  font-size: 1.2rem;
  background: linear-gradient(0deg, rgba(36, 31, 33, 1) 0%, rgba(41, 35, 37, 1) 48%, rgba(55, 47, 50, 1) 100%);
  border-bottom: 2px solid var(--color-primary);
  transition: all 500ms ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0rem;

  @media (max-width: 560px) {
    padding: 0.75rem;
  }


  & .logo-container {
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: 1.5rem;

    & p {
      margin: 0 15px;
      text-transform: none;
    }


    @media (max-width: 770px) {
      display: none;
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: 1rem
  }

  .user-title {
    margin: 0 0 0 1px;
    font-size: 11px;
    color: var(--color-primary);
  }

  .user-button {
    margin-left: 0.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
  }  

  @media (min-width: 769px) {
    .menu-container {
      display: none;
    }
  }
`