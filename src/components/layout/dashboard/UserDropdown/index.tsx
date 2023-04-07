import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ArrowContainer, PopoverState } from 'react-tiny-popover';

import classes from './UserDropdown.module.css';

export default function UserDropdown(props: PopoverState) {
  const { position, childRect, popoverRect } = props;

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
      onClick: () => alert('Coming Soon'),
    },
    {
      title: 'Logout',
      icon: faSignOutAlt,
      onClick: () => navigate('/'),
    },
  ];

  return (
    <ArrowContainer
      position={position}
      childRect={childRect}
      popoverRect={popoverRect}
      arrowColor="white"
      arrowSize={8}
    >
      <div className={classes['dropdown-container']}>
        {userDashboardDropdownItems.map((item, key) => (
          <button
            key={key}
            className={classes['dropdown-row']}
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
  );
}
