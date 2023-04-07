import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import ClientTable from './ClientTable';
import classes from './Clients.module.css';

export default function Clients() {
  return (
    <div>
      <div className={classes['title-container']}>
        <h1>Clients</h1>
        <Link to="/dashboard/clients/add-client">
          <div className={classes['button-container']}>
            <button>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
              Add Client
            </button>
          </div>
        </Link>
      </div>

      <ClientTable />
    </div>
  );
}
