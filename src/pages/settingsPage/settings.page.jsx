import classes from './settings.module.scss';

import ManageCities from "../../components/manageCities/manageCities.component"

const SettingsPage = (props) => {
    return (
        <div className={ classes.main }>
            <h3 className={ classes.title }>
                Settings
            </h3>
            <ManageCities />
        </div>
    );
};

export default SettingsPage;