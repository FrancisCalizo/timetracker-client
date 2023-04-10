import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useConsultant } from 'src/context/consultantContext';

export type FormValues = {
  consultantId: string;
  consultantName: string;
  email: string;
  rate: number;
};

export default function AddConsultant() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const { setConsultantList } = useConsultant();

  const onSubmit = (data: FormValues) => {
    const { consultantId, consultantName, email, rate } = data;

    const newConsultant = {
      consultantId,
      consultantName,
      email,
      rate,
    };

    toast.success('Consultant added successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    setConsultantList((old: any) => [...old, newConsultant]);
    navigate(`/dashboard`);
  };

  return (
    <Styled>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard/consultants"
          text="Back to Consultant List"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'page-container'}>
          <div className={'form-container'}>
            <h2>Add A Consultant</h2>

            <div className={'grid-container'}>
              <div className={'consultant-name'}>
                <label
                  className={'input-label'}
                  htmlFor="consultantName"
                >
                  Consultant Name
                </label>
                <input
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

            <div className={'buttons-container'}>
              <Link to={'/dashboard/consultants'}>
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
    color: ${(props) => props.theme.colors.primary};
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
    color: ${(props) => props.theme.colors.danger};
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
    font-size: ${(props) => props.theme.input.fontSize};
    box-shadow: ${(props) => props.theme.button.boxShadow};
    border-radius: 6px;
    cursor: pointer;
    transition: background 300ms ease-in-out, transform 150ms ease-in-out,
      filter 150ms ease-in-out;
  }

  .add {
    background: ${(props) => props.theme.colors.primary};
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