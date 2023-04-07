import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import add from 'date-fns/add';
import Select from 'react-select';
import toast from 'react-hot-toast';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import classes from './AddTimesheet.module.css';
import WeekPicker from 'src/components/WeekPicker';
import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useTimesheets } from 'src/context/timesheetsContext';
import {
  DEFAULT_WEEK,
  FormValues,
  StartEnd,
  WeekSelection,
  SELECT_OPTIONS,
  validationSchema,
} from './types';

export default function AddClient() {
  const navigate = useNavigate();
  const { setTimesheetsList } = useTimesheets();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: { rate: 0 },
  });

  const { fields, append } = useFieldArray({
    name: 'timesheets',
    control,
  });

  const watchIsFixedRate = watch('isFixedRate', false);

  const [weekSelection, setWeekSelection] =
    useState<WeekSelection>(DEFAULT_WEEK);

  const handleCreateTimesheetRows = (
    startDate: Date,
    type: 'CREATE' | 'UPDATE'
  ) => {
    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(add(startDate, { days: i }));
    }

    if (type === 'CREATE') {
      for (const day of days) {
        append({
          date: format(day, 'ccc	MMMM dd, yyyy'),
          rate: 0,
          hours: 0,
          notes: '',
        });
      }
    }

    if (type === 'UPDATE') {
      // @ts-ignore
      for (const [idx, day] of days.entries()) {
        setValue(`timesheets.${idx}.date`, format(day, 'ccc	MMMM dd, yyyy'));
      }
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);

    const newTimesheet = {
      id: uuidv4(),
      status: data.status.value,
      firstName: data.consultantFirstName,
      lastName: data.consultantLastName,
      timesheets: data.timesheets,
      client: data.clientName,
              isFixedRate: data.isFixedRate,
    };

    setTimesheetsList((old: any) => [...old, newTimesheet]);

    toast.success('Timesheet added successfully', {
      duration: 4000,
      position: 'bottom-right',
    });

    navigate(`/dashboard/timesheets`);
  };

  return (
    <div>
      <div style={{ maxWidth: 200 }}>
        <BackToLink to="/dashboard/timesheets" text="Back to Timesheet List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes['page-container']}>
          <div className={classes['form-container']}>
            <h2>Add A Timesheet</h2>

            <div className={classes['grid-container']}>
              <div className={`${classes['client-name']}`}>
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

              <div className={`${classes['status']}`}>
                <label className={classes['input-label']} htmlFor="status">
                  Timesheet Status
                </label>

                <Controller
                  name="status"
                  rules={{ required: 'This field is required' }}
                  render={({ field }: any) => (
                    <Select
                      {...field}
                      options={SELECT_OPTIONS}
                      placeholder="Status"
                      isSearchable={false}
                      styles={selectStyles}
                      instanceId="status"
                    />
                  )}
                  control={control}
                  defaultValue={{ value: 'submitted', label: 'Submitted' }}
                />

                {errors.status && (
                  <div className={classes['error-message']}>
                    {errors.status.message}
                  </div>
                )}
              </div>

              <div className={`${classes['consultant-first-name']}`}>
                <label
                  className={classes['input-label']}
                  htmlFor="consultantFirstName"
                >
                  Consultant First Name
                </label>
                <input
                  id="consultantFirstName"
                  className={classes['input']}
                  type="text"
                  {...register('consultantFirstName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantFirstName && (
                  <div className={classes['error-message']}>
                    {errors.consultantFirstName.message}
                  </div>
                )}
              </div>

              <div className={`${classes['consultant-last-name']}`}>
                <label
                  className={classes['input-label']}
                  htmlFor="consultantLastName"
                >
                  Consultant Last Name
                </label>
                <input
                  id="consultantLastName"
                  className={classes['input']}
                  type="text"
                  {...register('consultantLastName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantLastName && (
                  <div className={classes['error-message']}>
                    {errors.consultantLastName.message}
                  </div>
                )}
              </div>

              <div className={classes['weekpicker-container']}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    className={classes['input-label']}
                    htmlFor="rate"
                    style={{ marginBottom: '.5rem', textAlign: 'center' }}
                  >
                    Timesheet week selection
                  </label>
                  <WeekPicker
                    onChange={(start: StartEnd, end: StartEnd) => {
                      // Append new fields on first selection
                      if (!weekSelection.start && !weekSelection.end) {
                        handleCreateTimesheetRows(start as Date, 'CREATE');
                      } else {
                        // Update values every other time
                        handleCreateTimesheetRows(start as Date, 'UPDATE');
                      }

                      setWeekSelection({ start, end });
                    }}
                  />
                </div>
              </div>
            </div>

            {weekSelection.start && weekSelection.end && (
              <>
                <div className={classes['fixed-rate-container']}>
                  <div className={classes['fixed-rate-checkbox']}>
                    <input
                      style={{ marginRight: 10 }}
                      type="checkbox"
                      id="isFixedRate"
                      {...register('isFixedRate')}
                    />
                    <label htmlFor="isFixedRate">Fixed Rate</label>

                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      data-tooltip-id="fixed-rate-tooltip"
                      data-tooltip-content="Checking this box will use a fixed rate for all timesheet dates below. If any rate for a particular date differs from the rest, leave this box unchecked."
                      className={`${classes['info-icon']}`}
                    />
                  </div>
                  <Tooltip id="fixed-rate-tooltip" style={{ width: 250 }} />

                  {watchIsFixedRate && (
                    <div className={`${classes['rate']}`}>
                      <label className={classes['input-label']} htmlFor="rate">
                        Rate
                      </label>
                      <input
                        id="rate"
                        className={classes['input']}
                        type="number"
                        {...register('rate', {
                          onBlur: (e) => {
                            if (e.target.value == '') {
                              e.target.value = 0;
                            }

                            // Change the value of all "Rate" fields
                            fields?.forEach((_, idx) => {
                              setValue(
                                `timesheets.${idx}.rate`,
                                e.target.value
                              );
                            });
                          },
                          onChange: (e) => {
                            // Change the value of all "Rate" fields
                            if (e.target.value != '') {
                              fields?.forEach((_, idx) => {
                                setValue(
                                  `timesheets.${idx}.rate`,
                                  e.target.value
                                );
                              });
                            }
                          },
                        })}
                      />
                      {errors.rate && (
                        <div className={classes['error-message']}>
                          {errors.rate.message}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={classes['timesheets-grid']}>
                  <div style={{ gridColumn: 'span 4' }}>Date</div>
                  <div style={{ gridColumn: 'span 2' }}>Rate</div>
                  <div style={{ gridColumn: 'span 2' }}>Hours</div>
                  <div style={{ gridColumn: 'span 4' }}>Notes</div>
                  <hr className={classes['hr']} />

                  {fields.map((field, idx) => {
                    return (
                      <React.Fragment key={field.id}>
                        <div style={{ gridColumn: 'span 4' }}>
                          {/* <p>{format(field.date, 'ccc	MMMM dd, yyyy')}</p> */}
                          <input
                            className={classes['read-only']}
                            {...register(`timesheets.${idx}.date`, {
                              required: true,
                            })}
                            style={{ paddingLeft: 0 }}
                            readOnly
                            disabled
                          />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <input
                            className={classes['input']}
                            placeholder="00.00"
                            type="number"
                            step="any"
                            disabled={watchIsFixedRate}
                            {...register(`timesheets.${idx}.rate`, {
                              required: true,
                            })}
                          />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <input
                            className={classes['input']}
                            placeholder="0"
                            type="number"
                            step="any"
                            {...register(`timesheets.${idx}.hours`, {
                              required: true,
                            })}
                          />
                        </div>

                        <div style={{ gridColumn: 'span 4' }}>
                          <input
                            className={classes['input']}
                            placeholder="Notes"
                            style={{ width: '100%' }}
                            {...register(`timesheets.${idx}.notes`)}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </>
            )}

            <div className={classes['buttons-container']}>
              <Link to={'/dashboard/timesheets'}>
                <button className={`${classes['button']} ${classes['cancel']}`}>
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className={`${classes['button']} ${classes['add']}`}
                disabled={!weekSelection.start || !weekSelection.end}
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

export const selectStyles = {
  container: (baseStyles: any) => ({
    ...baseStyles,
    margin: '.5rem 0',
  }),
  control: (baseStyles: any) => ({
    ...baseStyles,
    fontSize: 'calc(14px + (16 - 14) * ((100vw - 400px) / (1800 - 400)))',
    border: '1px solid lightgray',
    '&:hover': { border: '1px solid #CCD7EA' },
  }),
  valueContainer: (baseStyles: any) => ({
    ...baseStyles,
    height: '42px',
    overflow: 'auto',
  }),
  menuList: (baseStyles: any) => ({
    ...baseStyles,
    maxHeight: '150px',
  }),
  dropdownIndicator: (baseStyles: any) => ({
    ...baseStyles,
    svg: { fill: 'grey' },
  }),
};
