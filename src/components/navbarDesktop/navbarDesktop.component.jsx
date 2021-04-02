import { NavLink } from 'react-router-dom';

import classes from './navbarDesktop.module.scss'

import settingsIcon from '../../assets/icons/settingsIcon.svg';
import accountIcon from '../../assets/icons/accountIcon.svg';
import homeIcon from '../../assets/icons/homeIcon.svg';

const NavbarDesktop = props => {
    return (
        <nav className={ classes.navbar_top } >
            <h3 className={ classes.title }>
                Weather App
            </h3>
            <div className={ classes.links }>
                <NavLink to="/" exact activeClassName={ classes.activeNav }>
                    <img src={homeIcon} alt=""/>
                </NavLink>
                <NavLink to="/account" activeClassName={ classes.activeNav }>
                    <img src={accountIcon} alt=""/>
                </NavLink>
                <NavLink to="/settings" activeClassName={ classes.activeNav }>
                    <img src={settingsIcon} alt=""/>
                </NavLink>
            </div>
        </nav>
    );
};

export default NavbarDesktop;