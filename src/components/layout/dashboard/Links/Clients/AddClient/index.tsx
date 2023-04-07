import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useClient } from 'src/context/clientContext';
import { FormValues } from 'src/components/layout/dashboard/Links/Clients/Client';
import classes from './AddClient.module.css';

export default function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const { setClientList } = useClient();

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

    toast.success('Client added successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    setClientList((old: any) => [...old, newClient]);
    navigate(`/dashboard`);
  };

  return (
    <div>
      <div style={{ maxWidth: 200 }}>
        <BackToLink to="/dashboard" text="Back to Client List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['page-container']}>
          <div className={classes['form-container']}>
            <h2>Add A Client</h2>

            <div className={classes['grid-container']}>
              <div className={classes['client-name']}>
                <label className={classes['input-label']} htmlFor="clientName">
                  Client Name
                </label>
                <input
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

            <div className={classes['buttons-container']}>
              <Link to={'/dashboard'}>
                <button className={`${classes['button']} ${classes['cancel']}`}>
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className={`${classes['button']} ${classes['add']}`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
