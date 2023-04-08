import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ConsultantTable from './ConsultantTable';
import classes from './Consultants.module.css';

export default function Consultants() {
  return (
    <div>
      <div className={classes['title-container']}>
        <h1>Consultants</h1>
        <Link to="/dashboard/consultants/add-consultant" >
          <div className={classes['button-container']}>
            <button>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
              Add Consultant
            </button>
          </div>
        </Link>
      </div>

      <ConsultantTable />
    </div>
  );
}
