import { useState } from 'react';
import { connect } from 'react-redux';

import classes from './home.module.scss';

import DayReminder from '../../components/dayReminder/dayReminder.component';
import HomePageIndicator from '../../components/homePageIndicator/homePageIndicator.component';
import AddNewCity from './../../components/addNewCity/addNewCity.component';

const Home = ({ citiesData }) => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ todaysDate ] = useState(new Date()); 
    // console.log(props.citiesData);

    // console.log(`from home:`, citiesData.data.length === activeIndex || 0 ? true : false );
    // console.log(`from home:`,  );

    return (
        <div className={classes.home} >
            <div className={ classes.title }><DayReminder dateObj={todaysDate}/></div>
            <div className={ classes.main }>
                <div className={ classes.pageIndicator }>
                    <HomePageIndicator data={ citiesData.data } activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
            </div>
            {
                activeIndex !== 0 ? false : citiesData.data.length <= activeIndex ?
                <AddNewCity /> : 
                <div>set</div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    citiesData: state.weatherApi
})

export default connect(mapStateToProps, null)(Home);