import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from 'src/context/appContext';

interface BackToLinkProps {
  text: string;
  to?: string;
  onClick?: () => any;
}

interface StyledProps {
  themeColor: string;
}

export default function BackToLink(props: BackToLinkProps) {
  const { text, to = '#', onClick = () => null } = props;

  const { themeColor } = useAppContext()

  return (
    <Styled themeColor={themeColor}>
      <Link to={to} onClick={() => onClick()} >
        <div className='breadcrumbs-container'>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ fontSize: 16, marginRight: '.5rem' }}
            />
          <p>{text}</p>
        </div>
      </Link>
    </Styled>
  );
}

const Styled = styled.div<StyledProps>`
  .breadcrumbs-container {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors[props.themeColor]};

    & svg {
      color: ${(props) => props.theme.colors[props.themeColor]};
    }
  }
`
