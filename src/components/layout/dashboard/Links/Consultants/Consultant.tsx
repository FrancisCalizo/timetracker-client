import styled from 'styled-components';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { useConsultant } from 'src/context/consultantContext';
import BackToLink from '../../BackToLink';
import { FormValues } from './AddConsultant';

export default function Consultant() {
  const navigate = useNavigate();
  const {
    selectedConsultant,
    setSelectedConsultant,
    setConsultantList,
    isEditMode,
    setIsEditMode,
  } = useConsultant();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // Set Values of form on initial render
  React.useEffect(() => {
    if (selectedConsultant) {
      setValue('consultantName', selectedConsultant.consultantName);
      setValue('email', selectedConsultant.email);
      setValue('rate', selectedConsultant.rate);
    }
  }, []);

  const onSubmit = (data: FormValues) => {
    const { consultantName, consultantId, email, rate } = data;

    const newConsultant = {
      consultantId,
      consultant: consultantName,
      email,
      rate,
    };

    setConsultantList((old: any) => {
      const filtered = old.filter(
        (el: any) => el.consultantId !== selectedConsultant.consultantId
      );
      return [...filtered, newConsultant];
    });

    toast.success('Consultant updated successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    navigate(`/dashboard`);
  };

  return (
    <Styled>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard/consultants"
          text="Back to Consultant List"
          onClick={() => setSelectedConsultant(null)}
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
                  data-tooltip-content="Edit Consultant"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}

            <Tooltip id="edit-tooltip" />

            {isEditMode && <h2>Edit Consultant</h2>}

            <div className={'grid-container'}>
              <div className={'consultant-name'}>
                <label
                  className={'input-label'}
                  htmlFor="consultantName"
                >
                  Consultant Name
                </label>
                <input
                  disabled={!isEditMode}
                  id="consultantName"
                  className={'input'}
                  type="text"
                  {...register('consultantName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantName && (
                  <div className={'error-message'}>
                    {errors.consultantName.message}
                  </div>
                )}
              </div>

              <div className={`${'email'}`}>
                <label className={'input-label'} htmlFor="email">
                  Email
                </label>
                <input
                  disabled={!isEditMode}
                  id="email"
                  className={'input'}
                  type="email"
                  {...register('email', {
                    required: 'This field is required',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {errors.email && (
                  <div className={'error-message'}>
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className={`${'rate'}`}>
                <label className={'input-label'} htmlFor="rate">
                  Rate
                </label>
                <input
                  disabled={!isEditMode}
                  id="rate"
                  className={'input'}
                  type="text"
                  {...register('rate', {
                    required: 'This field is required',
                  })}
                />
                {errors.rate && (
                  <div className={'error-message'}>
                    {errors.rate.message}
                  </div>
                )}
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

    & > h2 {
      text-align: center;
      font-size: 2rem;
      color: rgba(0, 0, 0, 0.7);
    }
  }

  .edit-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;

    & > button {
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
  } 
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 1rem;
  }

  .consultant-name {
    grid-column: span 12;
    grid-row-start: 1;
  }

  .email {
    grid-column: span 6;
    grid-row-start: 2;
  }

  .rate {
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