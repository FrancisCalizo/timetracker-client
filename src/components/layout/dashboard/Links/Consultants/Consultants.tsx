import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ConsultantTable from './ConsultantTable';

export default function Consultants() {
  const navigate = useNavigate();
  
  return (
    <Styled>
      <div className={'title-container'}>
        <h1>Consultants</h1>
        <div className={'button-container'}>
          <button className='add-consultant' onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
            Add Consultant
          </button>
        </div>
      </div>

      <ConsultantTable />
    </Styled>
  );
}

const Styled = styled.div`
  .title-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;

    & h1 {
      color: var(--color-text-primary);
    }
  }
  .button-container {
    width: 170px;
    display: flex;
    align-items: center;

    .add-consultant {
      display: block;
      width: 100%;
      background: var(--color-primary);
      color: white;
      border: 0.5px solid white;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: var(--button-box-shadow);
      transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;

      &:hover {
        filter: brightness(90%);
        cursor: pointer;
        transition: filter 150ms ease-in-out;
      }
    }
  }
`