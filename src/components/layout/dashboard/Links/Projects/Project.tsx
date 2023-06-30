import * as React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useProjects } from 'src/context/projectsContext';
import { useAppContext } from 'src/context/appContext';
import BackToLink from '../../BackToLink';

interface StyledProps {
  themeColor: string;
}

export default function Project() {
  const navigate = useNavigate();
  const { themeColor } = useAppContext()
  
  const {
    selectedProject,
    setSelectedProject,
    setProjectsList,
  } = useProjects();

  console.log(selectedProject)

  // Set Values of form on initial render
  // React.useEffect(() => {
  //   if (selectedProject) {
  //     setValue('projectName', selectedProject.project);
  //   }
  // }, []);

  return (
    <Styled themeColor={themeColor}>
      <div style={{ maxWidth: 200 }}>
        <BackToLink          
          text="Back to Projects List"
          onClick={() => {
            setSelectedProject(null)
            navigate(-1)
          }}
        />
      </div>

      <div className={'page-container'}>
        <div className={'form-container'}>

          <h2>Projects</h2>

          <div className={'grid-container'}>
            <div className={`${'client-name'}`}>
              <label className={'input-label'} htmlFor="clientName">
                Client Name
              </label>

              <input
                id="clientName"
                className={'input'}
                type="text"
                value={selectedProject?.client}
                disabled
              />
            </div>
          </div>

          <div>
            <div className='subheader-container'>              
              <h3>Timesheet History</h3>
              <Link to="/dashboard/timesheets/add-timesheet">
                <button className="add-button">
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
                  Add Timesheet
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Styled>
  );
}

const Styled = styled.div<StyledProps>`
  .page-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    background: #f1f2f6;
  }

  .form-container {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 2rem 2rem 1rem;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: #fff;

    > h2 {
      text-align: center;
      font-size: 2rem;
      color: rgba(0, 0, 0, 0.7);
    }

    & h3 {
      font-size: 1.25rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .client-name {
    grid-row-start: 1;
    grid-column: span 12;
  }

  .input-label {
    color: ${(props) => props.theme.colors[props.themeColor]};
    font-size: 0.75rem;
    font-weight: 600;
  }

  .input {
    width: 100%;
    font-size: calc(14px + (16 - 14) * ((100vw - 400px) / (1800 - 400)));
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid lightgray;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .subheader-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .add-button {
    display: block;
    background: var(--color-primary);
    color: white;
    border: 0.5px solid white;
    padding: 0.5em .75rem;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: var(--button-box-shadow);
    transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;
  }
`