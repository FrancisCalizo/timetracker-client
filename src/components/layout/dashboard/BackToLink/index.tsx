import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './BackToLink.module.css';

interface BackToLinkProps {
  text: string;
  to: string;
  onClick?: () => null;
}

export default function BackToLink(props: BackToLinkProps) {
  const { text, to, onClick = () => null } = props;

  return (
    <Link to={to} onClick={() => onClick()}>
      <div className={classes['breadcrumbs-container']}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ fontSize: 16, marginRight: '.5rem' }}
        />
        <p>{text}</p>
      </div>
    </Link>
  );
}
