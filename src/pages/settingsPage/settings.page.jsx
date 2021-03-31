import classes from './settings.module.scss';

import ManageCities from "../../components/manageCities/manageCities.component"
import ChangeUnit from '../../components/changeUnit/changeUnit.component';

const SettingsPage = (props) => {
    return (
        <div className={ classes.main }>
            <h3 className={ classes.title }>
                Settings
            </h3>
            <ManageCities />
            <ChangeUnit />
        </div>
    );
};

export default SettingsPage;