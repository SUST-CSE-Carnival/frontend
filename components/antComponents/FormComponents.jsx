import { PlusOutlined } from '@ant-design/icons';
import { Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from 'antd';
const { RangePicker } = DatePicker;

export default function FormComponents() {
    function datePickerHandler (date, dateString) {
        console.log(dateString);
      }

    function rangePickerHandler (date, dateString) {
        console.log(dateString);
      }

    function sliderHandler (value) {
        console.log(value);
    }

  return (
    <div>
      <Form.Item label="DatePicker">
          <DatePicker onChange={datePickerHandler} />
      </Form.Item>
      <Form.Item>
         <RangePicker onChange={rangePickerHandler} className='text-2xl px-4 py-1 text-blue-700'/>
      </Form.Item>
      <Form.Item label="Slider">
         <Slider onChange={sliderHandler} />
      </Form.Item>
    </div>
  )
}
