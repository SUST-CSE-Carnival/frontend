import React, { useState } from 'react'
import { Radio, Timeline } from 'antd';

export default function TimelineComponent() {
  return (
    <div className='w-full text-xl'>
      <Timeline
        mode={"left"}
        items={[
          {
            label: '2015-09-01',
            children: 'Create a services',
          },
          {
            label: '2015-09-01',
            children: 'Solve initial network problems',
          },
          {
            label: '2015-09-01',
            children: 'Technical testing',
          },
          {
            label: '2015-09-01',
            children: 'Network problems being solved',
            pending : true
          },
        ]}
      />
    </div>
  )
}
