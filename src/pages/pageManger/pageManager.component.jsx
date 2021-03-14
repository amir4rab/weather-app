import NavbarDesktop from '../../components/navbarDesktop/navbarDesktop.component';
import NavbarMobile from '../../components/navbarMobile/navbarMobile.component';
import AddNewCity from '../addNewCity/addNewCity.component';

const PageManager = props => {
    return (
        <div>
            <NavbarDesktop />
            <AddNewCity />
            <NavbarMobile />
        </div>
    );
};

export default PageManager;