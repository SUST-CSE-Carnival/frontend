import React from 'react'
import { Alert, Space } from 'antd';

export default function AlertComponent() {
  return (
      <div className='w-full'> 
        <Alert
            message="Operation Successful"
            type="success"
            showIcon
            closable
        />
        <Alert
            message="Operation Failed"
            type="error"
            showIcon
            closable
        />
      </div>
  )
}
