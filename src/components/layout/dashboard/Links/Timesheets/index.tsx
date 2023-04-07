import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TimesheetsTable from './TimesheetsTable';
import classes from './Timesheets.module.css';

export default function Timesheets() {
  return (
    <div>
      <div className={classes['title-container']}>
        <h1>Timesheets List</h1>
        <Link to="/dashboard/timesheets/add-timesheet">
          <div className={classes['button-container']}>
            <button>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
              Add Timesheet
            </button>
          </div>
        </Link>
      </div>

      <TimesheetsTable />
    </div>
  );
}
