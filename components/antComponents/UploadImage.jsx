import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { set } from 'date-fns';

export default function UploadImage({ src, setSrc}) {
    const props = {
        name: 'file',
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
          authorization: 'authorization-text',
        },
        async onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log(info.file)
            let src = info.file.url;
            if (!src) {
              src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(info.file.originFileObj);
                reader.onload = () => resolve(reader.result);
              });
            }
            console.log( "Source : " + src)
            setSrc(src)

          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
      };
  return (
    <div>
      <Upload {...props}>
         <Button className='py-6 px-4 bg-[#3d97b2] rounded-full flex items-center text-center justify-center text-white text-lg ' icon={<PlusOutlined />}>Add Photo / Video</Button>
      </Upload>
    </div>
  )
}
