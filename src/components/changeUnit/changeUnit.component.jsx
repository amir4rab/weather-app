import classes from './changeUnit.module.scss';

import { connect } from 'react-redux';
import { setUnit } from '../../redux/settingsData/settingsData.actions';
import { unitChanged } from '../../redux/weatherApiData/weatherApiData.actions';

const ChangeUnit = ({ unit, setUnit, unitChanged }) => {
    console.log(unit);
    console.log(unit === `metric`);

    const selectUnit = (e) => {
        // console.log(e.target.value);
        setUnit(e.target.value);
        unitChanged();
    }

    return (
        <div className={ classes.main }>
            <div className={ classes.title }>
                Change unit
            </div>
            <div className={ classes.inputGroup }>
                <input 
                    className={ classes.inputGroup_input } 
                    type="radio" 
                    id="metricUnitID" 
                    name="weatherUnit" 
                    value="metric"
                    defaultChecked={ unit === `metric` }
                    onClick={ selectUnit }
                />
                <label className={ classes.inputGroup_label } htmlFor="metricUnitID">Metric</label>
            </div>
            <div className={ classes.inputGroup }>
                <input 
                    className={ classes.inputGroup_input } 
                    type="radio" 
                    id="imperialUnitID" 
                    name="weatherUnit" 
                    value="imperial"
                    defaultChecked={ unit === `imperial` }
                    onClick={ selectUnit }
                />
                <label className={ classes.inputGroup_label } htmlFor="imperialUnitID">Imperial</label>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    unit: state.settings.unitSettings
});

const mapDispatchToProps = dispatch => ({
    setUnit: data => dispatch(setUnit(data)),
    unitChanged: _ => dispatch(unitChanged())
});

export default connect( mapStateToProps, mapDispatchToProps )(ChangeUnit);