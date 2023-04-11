import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface BackToLinkProps {
  text: string;
  to: string;
  onClick?: () => null;
}

export default function BackToLink(props: BackToLinkProps) {
  const { text, to, onClick = () => null } = props;

  return (
    <Styled>
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

const Styled = styled.div`
  .breadcrumbs-container {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.primary};

    & svg {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`
