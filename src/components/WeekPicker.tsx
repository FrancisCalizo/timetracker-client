import { useState } from 'react';
import add from 'date-fns/add';
import startOfWeek from 'date-fns/startOfWeek';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface WeekPickerProps {
  onChange: (newStart: Date | null, newEnd: Date | null) => void;
  defaultDates?: { startDate: Date; endDate: Date } | null;
}

function WeekPicker({ onChange, defaultDates = null }: WeekPickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    defaultDates?.startDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    defaultDates?.endDate || null
  );

  const handleChange = (dates: any) => {
    const [start] = dates;

    const newStart = startOfWeek(start, { weekStartsOn: 1 });
    const newEnd = add(newStart, { days: 6 });
    setStartDate(newStart);
    setEndDate(newEnd);

    if (onChange) {
      onChange(newStart, newEnd);
    }
  };

  return (
    <DatePicker
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
}

export default WeekPicker;
