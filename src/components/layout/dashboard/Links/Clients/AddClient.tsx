import { Link } from 'react-router-dom';
import styled from 'styled-components'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useClient } from 'src/context/clientContext';
import { FormValues } from 'src/components/layout/dashboard/Links/Clients/Client';

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
    <Styled>
      <div style={{ maxWidth: 200 }}>
        <BackToLink to="/dashboard" text="Back to Client List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'page-container'}>
          <div className={'form-container'}>
            <h2>Add A Client</h2>

            <div className={'grid-container'}>
              <div className={'client-name'}>
                <label className={'input-label'} htmlFor="clientName">
                  Client Name
                </label>
                <input
                  id="clientName"
                  className={'input'}
                  type="text"
                  {...register('clientName', {
                    required: 'This field is required',
                  })}
                />
                {errors.clientName && (
                  <div className={'error-message'}>
                    {errors.clientName.message}
                  </div>
                )}
              </div>

              <div className={`${'billing-email'}`}>
                <label
                  className={'input-label'}
                  htmlFor="billingEmail"
                >
                  Billing Email
                </label>
                <input
                  id="billingEmail"
                  className={'input'}
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
                  <div className={'error-message'}>
                    {errors.billingEmail.message}
                  </div>
                )}
              </div>

              <div className={`${'supervisor'}`}>
                <label className={'input-label'} htmlFor="supervisor">
                  Supervisor
                </label>
                <input
                  id="supervisor"
                  className={'input'}
                  type="text"
                  {...register('supervisor', {
                    required: 'This field is required',
                  })}
                />
                {errors.supervisor && (
                  <div className={'error-message'}>
                    {errors.supervisor.message}
                  </div>
                )}
              </div>

              <div className={`${'supervisor-email'}`}>
                <label
                  className={'input-label'}
                  htmlFor="supervisorEmail"
                >
                  Supervisor Email
                </label>
                <input
                  id="supervisorEmail"
                  className={'input'}
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
                  <div className={'error-message'}>
                    {errors.supervisorEmail.message}
                  </div>
                )}
              </div>
            </div>

            <div className={'buttons-container'}>
              <Link to={'/dashboard'}>
                <button className={`${'button'} ${'cancel'}`}>
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className={`${'button'} ${'add'}`}
              >
                Add
              </button>
            </div>
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
    padding: 3rem 2rem 1rem;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: #fff;

    & > h2 {
      text-align: center;
      font-size: 2rem;
      color: rgba(0, 0, 0, 0.7);
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

  .client-name {
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

  .add {
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