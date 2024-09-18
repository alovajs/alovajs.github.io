import Link from '@docusaurus/Link';
import IconFont from '@site/src/components/IconFont';
import clsx from 'clsx';
import styles from './style.module.css';

interface Card {
  Image: React.JSX.Element;
  title: string;
  desc?: string;
  link: string;
  target?: string;
}
interface IProps {
  list: Card[];
}
const NavCard = ({ list }: IProps) => {
  return (
    <div className="use-tailwind">
      <div className="grid grid-rows-1 gap-3 xl:gap-4 xl:grid-cols-3">
        {list.map(({ Image, target, title, desc, link }) => (
          <Link
            to={link}
            key={title}
            target={target}
            className={clsx(styles.cardItem, desc ? '' : 'justify-center')}>
            <div className={styles.cardTitle}>
              <div className="flex-row align-center">
                {Image ? <div className={styles.image}>{Image}</div> : null}
                <strong>{title}</strong>
              </div>
              <IconFont
                name="youjiantou"
                width={18}></IconFont>
            </div>
            {desc ? <span className={styles.cardDesc}>{desc}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavCard;
