import styles from '../components/Navigation/Navigation.module.scss';
import { ReactComponent as Protocols } from '../assets/icons/protocols.svg';
import { ReactComponent as Users } from '../assets/icons/users.svg';
import { ReactComponent as Categories } from '../assets/icons/categories.svg';
import { ReactComponent as Cities } from '../assets/icons/cities.svg';
import { ReactComponent as Brands } from '../assets/icons/brands.svg';
import { ReactComponent as Orders } from '../assets/icons/orders.svg';
import { ReactComponent as Banners } from '../assets/icons/banners.svg';
import { ReactComponent as Seminars } from '../assets/icons/seminares.svg';
import { ReactComponent as Promocode } from '../assets/icons/promocodes.svg';
import { ReactComponent as Products } from '../assets/icons/products.svg';

export const navigationLinks = [
  {
    path: '/products',
    name: 'Продукты',
    svg: <Products className={styles.navigation__icon} />,
  },
  {
    path: '/clients',
    name: 'Клиенты',
    svg: <Users className={styles.navigation__icon} />,
  },
  {
    path: '/categories',
    name: 'Категории',
    svg: <Categories className={styles.navigation__icon} />,
  },
  {
    path: '/cities',
    name: 'Города',
    svg: <Cities className={styles.navigation__icon} />,
  },
  {
    path: '/brands',
    name: 'Бренды',
    svg: <Brands className={styles.navigation__icon} />,
  },
  {
    path: '/protocols',
    name: 'Протоколы',
    svg: <Protocols className={styles.navigation__icon} />,
  },
  {
    path: '/orders',
    name: 'Заказы',
    svg: <Orders className={styles.navigation__icon} />,
  },
  {
    path: '/banners',
    name: 'Баннеры',
    svg: <Banners className={styles.navigation__icon} />,
  },
  {
    path: '/seminars',
    name: 'Семинары',
    svg: <Seminars className={styles.navigation__icon} />,
  },
  {
    path: '/promocode',
    name: 'Промокоды',
    svg: <Promocode className={styles.navigation__icon} />,
  },
];
