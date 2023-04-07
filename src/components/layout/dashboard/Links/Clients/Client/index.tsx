import * as React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { useClient } from 'src/context/clientContext';
import BackToLink from '../../../BackToLink';
import classes from './Client.module.css';

export type FormValues = {
  clientId: string;
  clientName: string;
  billingEmail: string;
  supervisor: string;
  supervisorEmail: string;
};

export default function Client() {
  const navigate = useNavigate();
  const {
    selectedClient,
    setSelectedClient,
    setClientList,
    isEditMode,
    setIsEditMode,
  } = useClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // Set Values of form on initial render
  React.useEffect(() => {
    if (selectedClient) {
      setValue('clientName', selectedClient.client);
      setValue('supervisor', selectedClient.supervisor);
      setValue('supervisorEmail', selectedClient.supervisorEmail);
      setValue('billingEmail', selectedClient.billingEmail);
    }
  }, []);

  const onSubmit = (data: FormValues) => {
    const { clientName, clientId, billingEmail, supervisor, supervisorEmail } =
      data;

    const newClient = {
      clientId,
      client: clientName,
      billingEmail,
      supervisor,
      supervisorEmail,
    };

    setClientList((old: any) => {
      const filtered = old.filter(
        (el: any) => el.clientId !== selectedClient.clientId
      );
      return [...filtered, newClient];
    });

    toast.success('Client updated successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    navigate(`/dashboard`);
  };

  return (
    <div>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard"
          text="Back to Client List"
          onClick={() => setSelectedClient(null)}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['page-container']}>
          <div className={classes['form-container']}>
            {!isEditMode && (
              <div className={`${classes['edit-container']}`}>
                <button
                  type="button"
                  onClick={() => setIsEditMode(true)}
                  data-tooltip-id="edit-tooltip"
                  data-tooltip-content="Edit Client"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}

            <Tooltip id="edit-tooltip" />

            {isEditMode && <h2>Edit Client</h2>}

            <div className={classes['grid-container']}>
              <div className={classes['client-name']}>
                <label className={classes['input-label']} htmlFor="clientName">
                  Client Name
                </label>
                <input
                  disabled={!isEditMode}
                  id="clientName"
                  className={classes['input']}
                  type="text"
                  {...register('clientName', {
                    required: 'This field is required',
                  })}
                />
                {errors.clientName && (
                  <div className={classes['error-message']}>
                    {errors.clientName.message}
                  </div>
                )}
              </div>

              <div className={`${classes['billing-email']}`}>
                <label
                  className={classes['input-label']}
                  htmlFor="billingEmail"
                >
                  Billing Email
                </label>
                <input
                  disabled={!isEditMode}
                  id="billingEmail"
                  className={classes['input']}
                  type="email"
                  {...register('billingEmail', {
                    required: 'This field is required',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {errors.billingEmail && (
                  <div className={classes['error-message']}>
                    {errors.billingEmail.message}
                  </div>
                )}
              </div>

              <div className={`${classes['supervisor']}`}>
                <label className={classes['input-label']} htmlFor="supervisor">
                  Supervisor
                </label>
                <input
                  disabled={!isEditMode}
                  id="supervisor"
                  className={classes['input']}
                  type="text"
                  {...register('supervisor', {
                    required: 'This field is required',
                  })}
                />
                {errors.supervisor && (
                  <div className={classes['error-message']}>
                    {errors.supervisor.message}
                  </div>
                )}
              </div>

              <div className={`${classes['supervisor-email']}`}>
                <label
                  className={classes['input-label']}
                  htmlFor="supervisorEmail"
                >
                  Supervisor Email
                </label>
                <input
                  disabled={!isEditMode}
                  id="supervisorEmail"
                  className={classes['input']}
                  type="email"
                  {...register('supervisorEmail', {
                    required: 'This field is required',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {errors.supervisorEmail && (
                  <div className={classes['error-message']}>
                    {errors.supervisorEmail.message}
                  </div>
                )}
              </div>
            </div>

            {isEditMode && (
              <div className={classes['buttons-container']}>
                <button
                  type="button"
                  onClick={() => setIsEditMode(false)}
                  className={`${classes['button']} ${classes['cancel']}`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`${classes['button']} ${classes['save']}`}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
