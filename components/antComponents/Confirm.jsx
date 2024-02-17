import React from 'react'
import { Button, Popconfirm } from 'antd';

export default function Confirm() {
    function handleConfirm() {
        console.log('confirmed');
    }
  return (
    <div className=''>
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleConfirm}
            okButtonProps = {
                {style: {backgroundColor: 'blue', color: 'white'}}
            }
            >
                <Button danger>Delete</Button>
        </Popconfirm>
    </div>
  )
}
