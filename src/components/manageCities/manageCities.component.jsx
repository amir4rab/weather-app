import classes from './manageCities.module.scss';

import { connect } from 'react-redux';
import { removeCity } from './../../redux/weatherApiData/weatherApiData.actions'

import CityItem from './cityItem/cityItem.component';

const ManageCities = ({ citiesData, removeCity }) => {
    const removeCityFn = (cityName) => removeCity(cityName);

    return (
        <div className={ classes.main }>
            <div className={ classes.title }>
                Manage cities
            </div>
            <div className={ classes.cityBox }>
                {
                    citiesData.data.map( city => <CityItem data={city} removeFn={_ => removeCityFn(city.name)} key={city.name} />)
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    citiesData: state.weatherApi
});

const mapDispatchToProps = dispatch => ({
    removeCity: data => dispatch(removeCity(data))
});

export default connect( mapStateToProps, mapDispatchToProps )(ManageCities);