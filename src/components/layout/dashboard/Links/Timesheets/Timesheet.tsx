import React, { useState } from 'react';
import styled from 'styled-components'
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
import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useTimesheets } from 'src/context/timesheetsContext';
import {
  FormValues,
  SELECT_OPTIONS,
  WeekSelection,
  StartEnd,
  DEFAULT_WEEK,
  validationSchema,
} from 'src/components/layout/dashboard/Links/Timesheets/utils/types';
import { selectStyles } from 'src/components/layout/dashboard/Links/Timesheets/AddTimesheet';
import { useAppContext } from 'src/context/appContext';

interface StyledProps {
  themeColor: string;
}

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

  const { themeColor } = useAppContext()

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <Styled themeColor={themeColor}>
      <div style={{ maxWidth: 200 }}>
        <BackToLink 
          onClick={() => navigate(-1)}
          text="Back to Timesheet List" 
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'page-container'}>
          <div className={'form-container'}>
            {!isEditMode && (
              <div className={'edit-container'}>
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

            <div className={'grid-container'}>
              <div className={`${'client-name'}`}>
                <label className={'input-label'} htmlFor="clientName">
                  Client Name
                </label>
                <input
                  disabled={!isEditMode}
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

              <div className={`${'status'}`}>
                <label className={'input-label'} htmlFor="status">
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
                  <div className={'error-message'}>
                    {errors.status.message}
                  </div>
                )}
              </div>

              <div className={`${'consultant-first-name'}`}>
                <label
                  className={'input-label'}
                  htmlFor="consultantFirstName"
                >
                  Consultant First Name
                </label>
                <input
                  disabled={!isEditMode}
                  id="consultantFirstName"
                  className={'input'}
                  type="text"
                  {...register('consultantFirstName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantFirstName && (
                  <div className={'error-message'}>
                    {errors.consultantFirstName.message}
                  </div>
                )}
              </div>

              <div className={`${'consultant-last-name'}`}>
                <label
                  className={'input-label'}
                  htmlFor="consultantLastName"
                >
                  Consultant Last Name
                </label>
                <input
                  disabled={!isEditMode}
                  id="consultantLastName"
                  className={'input'}
                  type="text"
                  {...register('consultantLastName', {
                    required: 'This field is required',
                  })}
                />
                {errors.consultantLastName && (
                  <div className={'error-message'}>
                    {errors.consultantLastName.message}
                  </div>
                )}
              </div>

              <div className={'weekpicker-container'}>
                {isEditMode && (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label
                      className={'input-label'}
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
              <div className={'fixed-rate-container'}>
                <div className={'fixed-rate-checkbox'}>
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
                    className={`${'info-icon'}`}
                  />
                </div>
                <Tooltip id="fixed-rate-tooltip" style={{ width: 250 }} />

                {watchIsFixedRate && (
                  <div className={`${'rate'}`}>
                    <label className={'input-label'} htmlFor="rate">
                      Rate
                    </label>
                    <input
                      disabled={!isEditMode}
                      id="rate"
                      className={'input'}
                      type="number"
                      {...register('rate', {
                        onBlur: (e) => {
                          if (e.target.value === '') {
                            e.target.value = 0;
                          }

                          // Change the value of all "Rate" fields
                          fields?.forEach((_, idx) => {
                            setValue(`timesheets.${idx}.rate`, e.target.value);
                          });
                        },
                        onChange: (e) => {
                          // Change the value of all "Rate" fields
                          if (e.target.value !== '') {
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
                      <div className={'error-message'}>
                        {errors.rate.message}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={'timesheets-grid'}>
                <div style={{ gridColumn: 'span 4' }}>Date</div>
                <div style={{ gridColumn: 'span 2' }}>Rate</div>
                <div style={{ gridColumn: 'span 2' }}>Hours</div>
                <div style={{ gridColumn: 'span 4' }}>Notes</div>
                <hr className={'hr'} />

                {fields.map((field, idx) => {
                  return (
                    <React.Fragment key={field.id}>
                      <div style={{ gridColumn: 'span 4' }}>
                        <input
                          className={'read-only'}
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
                          className={'input'}
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
                          className={'input'}
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
                          className={'input'}
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

const Styled = styled.div<StyledProps>`
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
    padding: 1rem 2rem 1rem;
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
        color: ${(props) => props.theme.colors[props.themeColor]};
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

  .client-name {
    grid-row-start: 1;
    grid-column: span 6;
  }

  .status {
    grid-column: span 6;
    grid-row-start: 1;
  }

  .consultant-first-name,
  .consultant-last-name {
    grid-column: span 6;
  }

  .rate {
    width: 175px;
    margin-left: 15px;
  }

  .input-label {
    color: ${(props) => props.theme.colors[props.themeColor]};
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

  .read-only {
    width: 100%;
    font-size: calc(14px + (16 - 14) * ((100vw - 400px) / (1800 - 400)));
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: none;
    background: white;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  .input-with-adornmant {
    width: 100%;
    font-size: calc(14px + (16 - 14) * ((100vw - 400px) / (1800 - 400)));
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid lightgray;
    border-radius: 4px;
  }

  .error-message {
    color: ${(props) => props.theme.colors.danger};
    font-size: 12px !important;
    width: 100%;
    margin: 0 2px 0;
  }

  .weekpicker-container {
    display: flex;
    justify-content: center;
    grid-column: span 12;
    grid-row-start: 3;
    margin-top: 0.5rem;
  }

  .fixed-rate-container {
    display: flex;
    align-items: center;
    width: 500px;
    height: 80px;
    margin: 1rem 0 2rem;
  }

  .fixed-rate-checkbox {
    display: flex;
    align-items: center;
    width: 120;
    margin: 0 1rem 0 -5px;
    padding-top: 15px;
    color: ${(props) => props.theme.colors[props.themeColor]};

    & input {
      width: 20px;
      height: 20px;
    }
  }

  .info-icon {
    color: gray;
    margin-left: 10px;
    height: 20px;
    width: 20px;
  }

  .timesheets-grid {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    row-gap: 0.5rem;
    column-gap: 1rem;
    align-items: center;
    color: ${(props) => props.theme.colors.textPrimary};
  }

  .timesheets-grid-header {
    grid-row-start: 1;
  }

  .hr {
    width: 100%;
    grid-column: span 12;
    border-color: rgba(0, 0, 0, 0.3);
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

  .save {
    background: ${(props) => props.theme.colors[props.themeColor]};
    color: white;
    border: 0.5px solid white;
    padding: 0.75rem 3rem;
    margin-left: 0.5rem;

    &:hover{
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