import React from 'react';

const EmbedCodesandbox = ({ src }) => (
  <iframe
    src={src}
    style={{
      width: '100%',
      height: '500px',
      border: '0',
      borderRadius: '4px',
      overflow: 'hidden'
    }}
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
);
export default EmbedCodesandbox;
