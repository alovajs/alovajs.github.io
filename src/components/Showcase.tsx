import showcase from '@site/showcase.json';
import NavCard from '@site/src/components/NavCard';

export default function Showcase(): JSX.Element {
  return (
    <NavCard
      list={showcase.map(item => ({
        Image: <img src={item.logo} />,
        target: '__blank',
        ...item
      }))}></NavCard>
  );
}
