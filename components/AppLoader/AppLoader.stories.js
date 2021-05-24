import React from 'react';
import AppLoader from './index';

export default {
  title: 'Components/AppLoader',
  component: AppLoader
};

const Template = args => (
  <div
    style={{
      position: 'relative',
      width: '100vw',
      height: '100vh'
    }}
  >
    <AppLoader {...args} />
  </div>
);

export const Default = Template.bind({});
