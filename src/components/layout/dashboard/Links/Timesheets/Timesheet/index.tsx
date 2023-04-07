import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import add from 'date-fns/add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import Select from 'react-select';
import toast from 'react-hot-toast';
import format from 'date-fns/format';
import { yupResolver } from '@hookform/resolvers/yup';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { capitalizeString } from 'src/utils';
import WeekPicker from 'src/components/WeekPicker';
import classes from './Timesheet.module.css';
import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useTimesheets } from 'src/context/timesheetsContext';
import {
  FormValues,
  SELECT_OPTIONS,
  WeekSelection,
  StartEnd,
  DEFAULT_WEEK,
  validationSchema,
} from 'src/components/layout/dashboard/Links/Timesheets/AddTimesheet/types';
import { selectStyles } from 'src/components/layout/dashboard/Links/Timesheets/AddTimesheet';

export default function Timesheet() {
  const navigate = useNavigate();
  const { selectedTimesheet, setTimesheetsList, isEditMode, setIsEditMode } =
    useTimesheets();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: { rate: 0 },
  });

  const { fields, append } = useFieldArray({
    name: 'timesheets',
    control,
  });

  const watchIsFixedRate = watch('isFixedRate', false);
  const isFirstRef = React.useRef(true);

  const [weekSelection, setWeekSelection] =
    useState<WeekSelection>(DEFAULT_WEEK);

  // Set Values of form on initial render
  React.useEffect(() => {
    if (selectedTimesheet) {
      setValue('clientName', selectedTimesheet.client);
      setValue('consultantFirstName', selectedTimesheet.firstName);
      setValue('consultantLastName', selectedTimesheet.lastName);
      setValue('consultantLastName', selectedTimesheet.lastName);
      setValue('isFixedRate', selectedTimesheet.isFixedRate);
      setValue('status', {
        value: selectedTimesheet.status,
        label: capitalizeString(selectedTimesheet.status),
      });
      if (selectedTimesheet.isFixedRate) {
        setValue('rate', selectedTimesheet.timesheets[0].rate);
      }

      // Create Timesheets fields
      if (isFirstRef.current) {
        isFirstRef.current = false;

        for (const ts of selectedTimesheet.timesheets) {
          append({
            date: format(ts.date, 'ccc	MMMM dd, yyyy'),
            rate: ts.rate || 0,
            hours: ts.hours || 0,
            notes: ts.notes || '',
          });
        }
      }
    }
  }, []);

  const handleCreateTimesheetRows = (startDate: Date) => {
    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(add(startDate, { days: i }));
    }

    // @ts-ignore
    for (const [idx, day] of days.entries()) {
      setValue(`timesheets.${idx}.date`, format(day, 'ccc	MMMM dd, yyyy'));
    }
  };

  const onSubmit = (data: FormValues) => {
    const newTimesheet = {
      status: data.status.value,
      client: data.clientName,
      firstName: data.consultantFirstName,
      lastName: data.consultantLastName,
      isFixedRate: data.isFixedRate,
      timesheets: data.timesheets,
    };

    setTimesheetsList((old: any) => {
      const filtered = old.filter((el: any) => el.id !== selectedTimesheet.id);
      return [...filtered, newTimesheet];
    });

    toast.success('Timesheet updated successfully', {
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

            <h2>{isEditMode ? 'Edit' : 'View'} Timesheet</h2>

            <div className={classes['grid-container']}>
              <div className={`${classes['client-name']}`}>
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
                      isDisabled={!isEditMode}
                      options={SELECT_OPTIONS}
                      placeholder="Status"
                      isSearchable={false}
                      styles={selectStyles}
                      instanceId="status"
                    />
                  )}
                  control={control}
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
                  disabled={!isEditMode}
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
                  disabled={!isEditMode}
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
                {isEditMode && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                      className={classes['input-label']}
                      htmlFor="Timesheet week selection"
                      style={{ marginBottom: '.5rem', textAlign: 'center' }}
                    >
                      Timesheet week selection
                    </label>
                    <WeekPicker
                      defaultDates={{
                        startDate: selectedTimesheet?.timesheets?.[0].date,
                        endDate: selectedTimesheet?.timesheets?.[6].date,
                      }}
                      onChange={(start: StartEnd, end: StartEnd) => {
                        // Update values every other time
                        handleCreateTimesheetRows(start as Date);

                        setWeekSelection({ start, end });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <>
              <div className={classes['fixed-rate-container']}>
                <div className={classes['fixed-rate-checkbox']}>
                  <input
                    style={{ marginRight: 10 }}
                    type="checkbox"
                    id="isFixedRate"
                    disabled={!isEditMode}
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
                      disabled={!isEditMode}
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
                            setValue(`timesheets.${idx}.rate`, e.target.value);
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
                          disabled={!isEditMode}
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
                          disabled={!isEditMode}
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
