import Link from '@docusaurus/Link';
import IconFont from '@site/src/components/IconFont';
import clsx from 'clsx';
import styles from './style.module.css';

interface Card {
  title: string;
  desc: string;
  link: string;
}
interface IProps {
  list: Card[];
}
const NavCard = ({ list }: IProps) => {
  return (
    <div className={styles.cardWrapper}>
      {list.map(({ title, desc, link }) => (
        <Link
          to={link}
          key={title}
          className={clsx(styles.cardItem)}>
          <div className={styles.cardTitle}>
            <strong>{title}</strong>
            <IconFont
              name="youjiantou"
              width={18}></IconFont>
          </div>
          <span>{desc}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavCard;
