import React, { createContext, useMemo } from 'react'
import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
  } from '@ant-design/icons';
  import { Button,  notification } from 'antd';

  export default function NotificationComponent() {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.info({
          message: `Notification ${placement}`,
          description: "This is the content of the notification. ",
          placement,
        });
      };
    
  return (
    <div >
        {contextHolder}
        <Button
            type="primary"
            onClick={() => openNotification('topRight')} 
            className='bg-blue-700 text-white rounded-md px-4 py-2 flex items-center justify-center'
            >
            Notification
        </Button>

    </div>
  )
}
