import React from 'react';
import classnames from 'classnames'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { useTimesheets } from 'src/context/timesheetsContext';
import { useClient } from 'src/context/clientContext';
import { useConsultant } from 'src/context/consultantContext';

interface ViewEditTableButtonsProps {
  rowObj: any;
  type: 'CLIENT' | 'TIMESHEET' | 'CONSULTANT';
}

export default function ViewEditTableButtons(props: ViewEditTableButtonsProps) {
  const { rowObj, type } = props;

  const navigate = useNavigate();
  const { setSelectedTimesheet, setIsEditMode } = useTimesheets();
  const { setSelectedClient, setIsEditMode: setIsEditModeClient } = useClient();
  const { setSelectedConsultant, setIsEditMode: setIsEditModeConsultant } =
    useConsultant();

  const handleButtonClick = (action: 'VIEW' | 'EDIT') => {
    if (type === 'CLIENT') {
      setSelectedClient(rowObj.original);
      setIsEditModeClient(action === 'VIEW' ? false : true);
      navigate(`/dashboard/clients/${rowObj.original.id}`);
    }

    if (type === 'TIMESHEET') {
      setSelectedTimesheet(rowObj.original);
      setIsEditMode(action === 'VIEW' ? false : true);
      navigate(`/dashboard/timesheets/${rowObj.original.id}`);
    }

    if (type === 'CONSULTANT') {
      setSelectedConsultant(rowObj.original);
      setIsEditModeConsultant(action === 'VIEW' ? false : true);
      navigate(`/dashboard/consultants/${rowObj.id}`);
    }
  };

  return (
    <Styled>
      <button
        className={classnames('button-view', 'button')}
        onClick={() => handleButtonClick('VIEW')}
        data-tooltip-id="view-tooltip"
        data-tooltip-content="View"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: 16 }} />
      </button>
      <button
        className={classnames('button-edit', 'button')}
        onClick={() => handleButtonClick('EDIT')}
        data-tooltip-id="edit-tooltip"
        data-tooltip-content="Edit"
      >
        <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 16 }} />
      </button>
      <Tooltip id="edit-tooltip" />
      <Tooltip id="view-tooltip" />
    </Styled>
  );
}

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80px;  
  

  .button {
    border: 1px solid #aaa;
    box-shadow: ${(props) => props.theme.button.boxShadow};
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    transition: transform 150ms ease-in-out;
  }

  .button:hover {
    transform: scale(1.1);
    transition: transform 150ms ease-in-out;
  }

  .button-view {
    background: ${(props) => props.theme.colors.success};
  }

  .button-edit {
    background: ${(props) => props.theme.colors.edit};
  }

  svg {
    color: #fff;
  }
`