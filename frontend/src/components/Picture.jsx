import React from 'react';

const Picture = ({ src, ...args }) => (
  <img src={`data:image/png;base64,${src}`} alt="" {...args}/>
);

export default Picture;