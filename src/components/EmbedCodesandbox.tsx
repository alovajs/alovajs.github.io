import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

const EmbedCodesandbox = ({ src }) => (
  <div>
    <iframe
      src={src}
      style={{
        width: '100%',
        height: '1000px',
        border: '0',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
    <Link to={src}>
      <Translate id="example.open in new tab">Encounter troubles? Click to open this in new page.</Translate>
    </Link>
  </div>
);
export default EmbedCodesandbox;
