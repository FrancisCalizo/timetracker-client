import * as React from 'react';
import styled from 'styled-components'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { useProjects } from 'src/context/projectsContext';
import BackToLink from '../../BackToLink';

export type FormValues = {
  projectId: string;
  projectName: string;
};

export default function Project() {
  const navigate = useNavigate();
  const {
    selectedProject,
    setSelectedProject,
    setProjectsList,
    isEditMode,
    setIsEditMode,
  } = useProjects();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // Set Values of form on initial render
  // React.useEffect(() => {
  //   if (selectedProject) {
  //     setValue('projectName', selectedProject.project);
  //   }
  // }, []);

  const onSubmit = (data: FormValues) => {
    const { projectName, projectId } =
      data;

    const newProject = {
      projectId,
      project: projectName,
    };

    setProjectsList((old: any) => {
      const filtered = old.filter(
        (el: any) => el.projectId !== selectedProject.projectId
      );
      return [...filtered, newProject];
    });

    toast.success('Project updated successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    navigate(`/dashboard/projects`);
  };

  return (
    <Styled>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard/projects"
          text="Back to Projects List"
          onClick={() => setSelectedProject(null)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'page-container'}>
          <div className={'form-container'}>
            {!isEditMode && (
              <div className={`${'edit-container'}`}>
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  data-tooltip-id="edit-tooltip"
                  data-tooltip-content="Edit Project"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}

            <Tooltip id="edit-tooltip" />

            {isEditMode && <h2>Edit Project</h2>}

            <div className={'grid-container'}>
              <div>
                <p>Sample</p>
              </div>
            </div>

            {isEditMode && (
              <div className={'buttons-container'}>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className={`${'button'} ${'cancel'}`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`${'button'} ${'save'}`}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </Styled>
  );
}

const Styled = styled.div`
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
  }

  .form-container > h2 {
    text-align: center;
    font-size: 2rem;
    color: rgba(0, 0, 0, 0.7);
  }

  .edit-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }

  .edit-container > button {
    cursor: pointer;
    background: transparent;
    color: rgba(0, 0, 0, 0.7);
    border: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    align-items: center;

    & > p {
      margin: 0 0 0 0.5rem;
    }

    & > svg {
      color: var(--color-primary);
      font-size: 1.5rem;
    }
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 1rem;
  }

  .billing-email {
    grid-column: span 6;
    grid-row-start: 1;
  }

  .project-name {
    grid-column: span 6;
    grid-row-start: 1;
  }

  .supervisor,
  .supervisor-email {
    grid-column: span 6;
    grid-row-start: 2;
  }

  .input-label {
    color: var(--color-primary);
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

  .error-message {
    color: var(--color-danger);
    font-size: 12px !important;
    width: 100%;
    margin: 0 2px 0;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
  }

  .button {
    display: block;
    font-size: var(--input-font-size);
    box-shadow: var(--box-shadow);
    border-radius: 6px;
    cursor: pointer;
    transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;
  }

  .save {
    background: var(--color-primary);
    color: white;
    border: 0.5px solid white;
    padding: 0.75rem 3rem;
    margin-left: 0.5rem;

    &:hover {
      filter: brightness(85%);
    }
  }

  .cancel {
    padding: 0.75rem 2rem;
    border: 0.5px solid white;

    &:hover {
      filter: brightness(85%);
    }
  }
`