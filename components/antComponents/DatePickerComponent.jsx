import React from 'react'
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';

export default function DatePickerComponent() {
    const onChange = (date, dateString) => {
        console.log(dateString);
        };
    const defaultValue = [dayjs('2000-01-01'), dayjs('2000-01-03'), dayjs('2000-01-05')];
    return (
        <div className='w-[48rem] p-16 h-screen'>
            <DatePicker
                multiple
                onChange={onChange}
                maxTagCount="responsive"
                defaultValue={defaultValue}
                size="small"
                className='w-96 h-8'
                />
        </div>
  )
}
