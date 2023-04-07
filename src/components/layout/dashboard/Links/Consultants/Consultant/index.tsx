import * as React from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

import { useConsultant } from 'src/context/consultantContext';
import BackToLink from '../../../BackToLink';
import classes from './Consultant.module.css';
import { FormValues } from '../AddConsultant';

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
    <div>
      <div style={{ maxWidth: 200 }}>
        <BackToLink
          to="/dashboard/consultants"
          text="Back to Consultant List"
          onClick={() => setSelectedConsultant(null)}
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
                  data-tooltip-content="Edit Consultant"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}

            <Tooltip id="edit-tooltip" />

            {isEditMode && <h2>Edit Consultant</h2>}

            <div className={classes['grid-container']}>
              <div className={classes['consultant-name']}>
                <label
                  className={classes['input-label']}
                  htmlFor="consultantName"
                >
                  Consultant Name
                </label>
                <input
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
