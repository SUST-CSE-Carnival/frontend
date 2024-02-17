import React from 'react';
import { Button, Dropdown } from 'antd';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/login">
        Google
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com">
       Facebook
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com">
        Meta
      </a>
    ),
  },
];
export default function DropDown() {
    return (
  <>
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      arrow
    >
      <Button className='bg-gray-500 text-white text-lg text-center flex items-center justify-center p-4'>bottomLeft</Button>
    </Dropdown>
  </>
);

}
