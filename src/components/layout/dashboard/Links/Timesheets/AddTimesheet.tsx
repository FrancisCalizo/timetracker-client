import React, { useState } from 'react';
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import add from 'date-fns/add';
import Select from 'react-select';
import toast from 'react-hot-toast';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import WeekPicker from 'src/components/WeekPicker';
import BackToLink from 'src/components/layout/dashboard/BackToLink';
import { useTimesheets } from 'src/context/timesheetsContext';
import { useAppContext } from 'src/context/appContext';
import {
  DEFAULT_WEEK,
  FormValues,
  StartEnd,
  WeekSelection,
  SELECT_OPTIONS,
  validationSchema,
} from './utils/types';

interface StyledProps {
  themeColor: string;
}

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

  const { themeColor } = useAppContext()
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
    <Styled themeColor={themeColor}>
      <div style={{ maxWidth: 200 }}>
        <BackToLink onClick={() => navigate(-1)} text="Back to Timesheet List" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={'page-container'}>
          <div className={'form-container'}>
            <h2>Add A Timesheet</h2>

            <div className={'grid-container'}>
              <div className={`${'client-name'}`}>
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

              <div className='status'>
                <label className={'input-label'} htmlFor="status">
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label
                    className={'input-label'}
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
                <div className={'fixed-rate-container'}>
                  <div className={'fixed-rate-checkbox'}>
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
                              setValue(
                                `timesheets.${idx}.rate`,
                                e.target.value
                              );
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
                          {/* <p>{format(field.date, 'ccc	MMMM dd, yyyy')}</p> */}
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
            )}

            <div className={'buttons-container'}>
              <button className={`${'button'} ${'cancel'}`} onClick={() => navigate(-1)}>
                Cancel
              </button>

              <button
                type="submit"
                className={`${'button'} ${'add'}`}
                disabled={!weekSelection.start || !weekSelection.end}
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
 }

 .form-container > h2 {
   text-align: center;
   font-size: 2rem;
   color: rgba(0, 0, 0, 0.7);
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

 .supervisor {
   grid-column: span 4;
   grid-row-start: 4;
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

 .add {
   background: ${(props) => props.theme.colors[props.themeColor]};
   color: white;
   border: 0.5px solid white;
   padding: 0.75rem 3rem;
   margin-left: 0.5rem;

   &:hover {
     filter: brightness(85%);
   }

   &:disabled {
     background: gainsboro;
     color: darkgray;
     cursor: default;

     &:hover {
       filter: brightness(100%);
     }
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