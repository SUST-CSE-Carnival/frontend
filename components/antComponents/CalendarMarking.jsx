import React, { useState } from 'react'
import { Calendar, Alert} from 'antd';
import dayjs from 'dayjs';

export default function CalendarMarking() {
  const onPanelChange = (value, mode) => {
     console.log(value.format('YYYY-MM-DD'), mode);
  };
  const onSelect = (newValue, dateStr) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log(newValue.format('YYYY-MM-DD'))
  };
  const [value, setValue] = useState(() => dayjs('2024-02-07'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-02-07'));
  return (
    <div>
      <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />;
    </div>
  )
}
