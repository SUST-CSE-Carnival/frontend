import React from 'react'
import { Button, Popover, ConfigProvider } from 'antd';

const text = <span className='text-xl font-semibold mx-auto text-center w-full justify-center flex'>Title</span>;

const content = (
  <div className='p-2 rounded-lg '>
    <p className='hover:bg-gray-200 cursor-pointer py-2 rounded-lg px-4'>Content</p>
    <p className='hover:bg-gray-200 cursor-pointer py-2 rounded-lg px-4'>Content</p>
  </div>
);
export default function PopOver() {
  return (
    <ConfigProvider
    button={{
      style: { width: 80, margin: 4 },
    }}
  >
    <div className="demo">
      <div style={{ marginInlineStart: 80 + 4, whiteSpace: 'nowrap' }}>
        <Popover placement="right" title={text} content={content} >
          <Button className='bg-[#136464]'>Click</Button>
        </Popover>
      </div>
    </div>
  </ConfigProvider>
  )
}
