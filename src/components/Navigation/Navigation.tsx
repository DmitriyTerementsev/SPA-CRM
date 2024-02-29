import React from 'react';
import styles from './Navigation.module.scss';
import NavigationItem from './NavigationItem/NavigationItem.tsx';
import { NavLink } from 'react-router-dom';
import { navigationLinks } from '../../constants/navigationLinks.tsx';
import { Link } from '../../constants/navigationLinks.tsx';

function Navigation() {
  return (
    <nav className={styles.navigation}>
      {navigationLinks?.map((item: Link) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={(navbar) =>
            navbar.isActive ? styles.active : styles.navigation__link
          }
        >
          <NavigationItem name={item.name}>{item.svg}</NavigationItem>
        </NavLink>
      ))}
    </nav>
  );
}

export default Navigation;
