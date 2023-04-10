import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TimesheetsTable from './TimesheetsTable';
import classes from './Timesheets.module.css';

export default function Timesheets() {
  return (
    <Styled>
      <div className='title-container'>
        <h1>Timesheets List</h1>
        <Link to="/dashboard/timesheets/add-timesheet">
          <div className='button-container'>
            <button className="add-button">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
              Add Timesheet
            </button>
          </div>
        </Link>
      </div>

      <TimesheetsTable />
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
    display: flex;
    align-items: center;
  }

  .add-button {
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
  }

  .button-container > button:hover {
    filter: brightness(90%);
    cursor: pointer;
    transition: filter 150ms ease-in-out;
  }
`