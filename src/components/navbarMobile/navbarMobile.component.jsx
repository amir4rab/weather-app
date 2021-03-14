import { NavLink } from 'react-router-dom'

import classes from './navbarMobile.module.scss';

import homeIcon from '../../assets/icons/homeIcon.svg';
import settingsIcon from '../../assets/icons/settingsIcon.svg';
import accountIcon from '../../assets/icons/accountIcon.svg';

const NavbarMobile = props => {
    return (
        <div className={ classes.navbar_bottom }>
            <NavLink to="/account" className={ classes.navLink } activeClassName={ classes.active }>
                <img src={accountIcon} alt=""/>
            </NavLink>
            <NavLink to="/" className={ classes.navLink } activeClassName={ classes.active } exact>
                <img src={homeIcon} alt=""/>
            </NavLink>
            <NavLink to="/settings" className={ classes.navLink } activeClassName={ classes.active }>
                <img src={settingsIcon} alt=""/>
            </NavLink>
        </div>
    );
};

export default NavbarMobile;