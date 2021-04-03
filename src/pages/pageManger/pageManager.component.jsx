import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavbarDesktop from '../../components/navbarDesktop/navbarDesktop.component';
import NavbarMobile from '../../components/navbarMobile/navbarMobile.component';
import LoadingAnimation from './loadingAnimation/loadingAnimation.component';

const HomePage = lazy(() => import('../homePage/home.page'));
const AccountPage = lazy(() => import('../accountPage/account.page'));
const SettingsPage = lazy(() => import('../settingsPage/settings.page'));

const PageManager = props => {
    return (
        <div>
            <NavbarDesktop />
            <Switch>
                <Route path='/' exact>
                    <Suspense fallback={<LoadingAnimation />}>
                        <HomePage />
                    </Suspense>
                </Route>
                <Route path='/account' exact>
                    <Suspense fallback={<LoadingAnimation />}>
                        <AccountPage />
                    </Suspense>
                </Route>
                <Route path='/settings' exact>
                    <Suspense fallback={<LoadingAnimation />}>
                        <SettingsPage />
                    </Suspense>
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