import { Switch, Route } from 'react-router-dom';

import NavbarDesktop from '../../components/navbarDesktop/navbarDesktop.component';
import NavbarMobile from '../../components/navbarMobile/navbarMobile.component';

import HomePage from '../homePage/home.page';
import AccountPage from '../accountPage/account.page';
import SettingsPage from '../settingsPage/settings.page';

const PageManager = props => {
    return (
        <div>
            <NavbarDesktop />
            <Switch>
                <Route path='/' exact>
                    <HomePage />
                </Route>
                <Route path='/account' exact>
                    <AccountPage />
                </Route>
                <Route path='/settings' exact>
                    <SettingsPage />
                </Route>
                <Route path='**'>
                    <div>
                        404
                    </div>
                </Route>
            </Switch>
            <NavbarMobile />
        </div>
    );
};

export default PageManager;