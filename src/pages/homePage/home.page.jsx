import { useState } from 'react';
import { connect } from 'react-redux';

import classes from './home.module.scss';

import DayReminder from '../../components/dayReminder/dayReminder.component';
import HomePageIndicator from '../../components/homePageIndicator/homePageIndicator.component';

const Home = ({ citiesData }) => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ todaysDate ] = useState(new Date()); 
    // console.log(props.citiesData);

    return (
        <div className={classes.home} >
            <h3 className={ classes.title }><DayReminder dateObj={todaysDate}/></h3>
            <div className={ classes.main }>
                <div className={ classes.pageIndicator }>
                    <HomePageIndicator data={ citiesData.data } acticeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    citiesData: state.weatherApi
})

export default connect(mapStateToProps, null)(Home);