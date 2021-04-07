import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import classes from './pageManager.module.scss';

import NavbarDesktop from '../../components/navbarDesktop/navbarDesktop.component';
import NavbarMobile from '../../components/navbarMobile/navbarMobile.component';
import LoadingAnimation from './loadingAnimation/loadingAnimation.component';

const HomePage = lazy(() => import('../homePage/home.page'));
const AccountPage = lazy(() => import('../accountPage/account.page'));
const SettingsPage = lazy(() => import('../settingsPage/settings.page'));

const PageManager = props => {
    return (
        <div className={ classes.main }>
            <div className={ classes.navbarTop }>
                <NavbarDesktop />
            </div>
            <div className={ classes.inner }>
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
                        <Redirect to='/' />
                    </Route>
                </Switch>
            </div>
            <NavbarMobile />
        </div>
    );
};

export default PageManager;