import { Link } from 'react-router-dom';

import classes from './navbarDesktop.module.scss'

import settingsIcon from '../../assets/icons/settingsIcon.svg';
import accountIcon from '../../assets/icons/accountIcon.svg';

const NavbarDesktop = props => {
    return (
        <nav className={ classes.navbar_top } >
            <h3 className={ classes.title }>
                Weather App
            </h3>
            <div className={ classes.links }>
                <Link to="/account">
                    <img src={accountIcon} alt=""/>
                </Link>
                <Link to="/settings">
                    <img src={settingsIcon} alt=""/>
                </Link>
            </div>
        </nav>
    );
};

export default NavbarDesktop;