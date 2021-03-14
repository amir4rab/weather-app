import { Switch, Route } from 'react-router-dom';

import NavbarDesktop from '../../components/navbarDesktop/navbarDesktop.component';
import NavbarMobile from '../../components/navbarMobile/navbarMobile.component';

import Home from '../homePage/home.page';



const PageManager = props => {
    return (
        <div>
            <NavbarDesktop />
            <Switch>
                <Route path='/' exact>
                    <Home />
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