import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useConsultant } from 'src/context/consultantContext';
import classes from './AddConsultant.module.css';

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
    <div>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard/consultants"
          text="Back to Consultant List"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['page-container']}>
          <div className={classes['form-container']}>
            <h2>Add A Consultant</h2>

            <div className={classes['grid-container']}>
              <div className={classes['consultant-name']}>
                <label
                  className={classes['input-label']}
                  htmlFor="consultantName"
                >
                  Consultant Name
                </label>
                <input
                  id="consultantName"
                  className={classes['input']}
                  type="text"
                  {...register('consultantName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantName && (
                  <div className={classes['error-message']}>
                    {errors.consultantName.message}
                  </div>
                )}
              </div>

              <div className={`${classes['email']}`}>
                <label className={classes['input-label']} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className={classes['input']}
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
                  <div className={classes['error-message']}>
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className={`${classes['rate']}`}>
                <label className={classes['input-label']} htmlFor="rate">
                  Rate
                </label>
                <input
                  id="rate"
                  className={classes['input']}
                  type="text"
                  {...register('rate', {
                    required: 'This field is required',
                  })}
                />
                {errors.rate && (
                  <div className={classes['error-message']}>
                    {errors.rate.message}
                  </div>
                )}
              </div>
            </div>

            <div className={classes['buttons-container']}>
              <Link to={'/dashboard/consultants'}>
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
