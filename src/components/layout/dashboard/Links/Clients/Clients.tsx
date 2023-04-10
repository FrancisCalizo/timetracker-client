import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ClientTable from './ClientTable';

export default function Clients() {
  return (
    <Styled>
      <div className={'title-container'}>
        <h1>Clients</h1>
        <Link to="/dashboard/clients/add-client" >
          <div className={'button-container'}>
            <button className='add-client'>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
              Add Client
            </button>
          </div>
        </Link>
      </div>

      <ClientTable />
    </Styled>
  );
}

const Styled = styled.div`
  .title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
  }

  .title-container h1 {
    color: ${(props) => props.theme.colors.textPrimary};
  }

  .button-container {
    width: 150px;
    display: flex;
    align-items: center;

    & > button:hover {
      filter: brightness(90%);
      cursor: pointer;
      transition: filter 150ms ease-in-out;
    }
  }

  .add-client {
    display: block;
    width: 100%;
    background: ${(props) => props.theme.colors.primary};
    color: white;
    border: 0.5px solid white;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;  
    box-shadow: ${(props) => props.theme.button.boxShadow};
    transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;
  }
`