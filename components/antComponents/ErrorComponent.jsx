import React from 'react'
import { Button, Result } from 'antd';

export default function ErrorComponent() {
  return (
    <div>
      <Result
            status="500"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="link">Back Home</Button>}
        />
    </div>
  )
}
