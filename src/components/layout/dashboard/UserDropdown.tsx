import axios from 'axios'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ArrowContainer, PopoverState } from 'react-tiny-popover';

import { useAppContext } from 'src/context/appContext';

export default function UserDropdown(props: PopoverState) {
  const { position, childRect, popoverRect } = props;

  const { setUserInfo } = useAppContext()
  const navigate = useNavigate();

  const userDashboardDropdownItems = [
    {
      title: 'Profile',
      icon: faUser,
      onClick: () => alert('Coming Soon'),
    },
    {
      title: 'Settings',
      icon: faCog,
      onClick: () => navigate('dashboard/settings'),
    },
    {
      title: 'Logout',
      icon: faSignOutAlt,
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = async () => {
    if (process.env.NODE_ENV === 'development') {
      try {
        const res = await axios.post('/logout')

        localStorage.removeItem("type");
  
        if (res.status === 200) {
          setUserInfo(null)
          navigate('/')
        }
      } catch (err) {
        console.log(err)
      }
    } else { 
      navigate('/')
    }
  }

  return (
    <Styled>
      <ArrowContainer
        position={position}
        childRect={childRect}
        popoverRect={popoverRect}
        arrowColor="white"
        arrowSize={8}
      >
        <div className={'dropdown-container'}>
          {userDashboardDropdownItems.map((item, key) => (
            <button
              key={key}
              className={'dropdown-row'}
              onClick={() => item.onClick()}
            >
              <FontAwesomeIcon
                icon={item.icon}
                style={{ fontSize: 20, marginRight: '1rem' }}
              />
              {item.title}
            </button>
          ))}
        </div>
      </ArrowContainer>
    </Styled>
  );
}

const Styled = styled.div`
  .dropdown-container {
    background: white;
    border: 1px solid lightgray;
    border-top: none;
    width: 220px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  .dropdown-row {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    width: 100%;
    background: transparent;
    border: none;
    font-size: 0.9rem;
  }

  .dropdown-row > svg {
    color: var(--color-text-primary);
  }

  .dropdown-row:hover {
    background: var(--color-primary);
    color: white;
  }

  .dropdown-row:hover > svg {
    color: white;
  }
`