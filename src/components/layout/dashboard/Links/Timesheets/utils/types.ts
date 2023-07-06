import * as yup from 'yup';

export type StartEnd = Date | null;
export type WeekSelection = { start: StartEnd; end: StartEnd };

export const DEFAULT_WEEK = { start: null, end: null };

export type FormValues = {
  clientName: string;
  consultantFirstName: string;
  consultantLastName: string;
  rate: number;
  status: { value: string; label: string };
  isFixedRate: boolean;

  timesheets: {
    date: Date | string;
    rate: number;
    hours: number;
    notes: string;
  }[];
};

export interface CreateRows {
  startDate: Date;
  type: 'CREATE' | 'UPDATE';
}

export const SELECT_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'denied', label: 'Denied' },
  { value: 'approved', label: 'Approved' },
];

export const validationSchema = yup.object().shape({
  clientName: yup.string().required('This field is required'),
  consultantFirstName: yup.string().required('This field is required'),
  consultantLastName: yup.string().required('This field is required'),
  isFixedRate: yup.boolean(),
  status: yup
    .object()
    .shape({ name: yup.string(), label: yup.string() })
    .required('This field is required'),
  timesheets: yup.array().of(
    yup.object().shape({
      date: yup.date().required('This field is required'),
      rate: yup.number().required('This field is required'),
      hours: yup.number().required('This field is required'),
      notes: yup.string(),
    })
  ),
});
