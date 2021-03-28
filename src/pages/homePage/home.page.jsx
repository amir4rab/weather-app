import { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import classes from './home.module.scss';

import DayReminder from '../../components/dayReminder/dayReminder.component';
import HomePageIndicator from '../../components/homePageIndicator/homePageIndicator.component';
import AddNewCity from './../../components/addNewCity/addNewCity.component';
import WeatherDisplay from '../../components/weatherDisplay/weatherDisplay.component';

const HomePage = ({ citiesData }) => {
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ todaysDate ] = useState(new Date()); 

    
    const [ citiesDataArr, setCitiesDataArr ] = useState( [...citiesData.data.sort( (a,b) =>  a.positon > b.positon ? 1 : -1 )] );
    useEffect(() => {
        setCitiesDataArr([...citiesData.data.sort( (a,b) =>  a.positon > b.positon ? 1 : -1 )])
    }, [citiesData]);

    //** touch event start here **//
    const [ touchStartPointLocation, setTouchStartPointLocation ] = useState(null);
    const [ lastTouchEnded, setLastTouchEnded ] = useState(true);
    const touchEndPoint = () => {
        setLastTouchEnded(true);
    }
    const touchStartPoint = (e) => {
        setTouchStartPointLocation(e.touches[0].screenX);
    }
    const touchMoveEvent = (e) => {
        if( lastTouchEnded && Math.abs( touchStartPointLocation - e.touches[0].screenX ) > 50 ) {
            setLastTouchEnded(false);
            // touchStartPointLocation - e.touches[0].screenX > 0 ? console.log(`+`) : console.log(`-`);
            if( touchStartPointLocation - e.touches[0].screenX > 0 ) {
                if( activeIndex + 1 <= citiesData.data.length ) {
                    setActiveIndex( activeIndex + 1 );
                } else {
                    setActiveIndex( 0 );
                }
            } else {
                if( activeIndex - 1 >= 0 ) {
                    setActiveIndex( activeIndex - 1 );
                } else {
                    setActiveIndex( citiesData.data.length );
                }
            }
        };
    }
    //** touch event enda here **//


    return (
        <div className={classes.home} >
            <div className={ classes.title }><DayReminder dateObj={todaysDate}/></div>
            <div className={ classes.main }>
                <div className={ classes.pageIndicator }>
                    <HomePageIndicator data={ citiesDataArr } activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                </div>
            </div>
            {
                ( activeIndex === 0 && citiesDataArr.length === 0 ) || ( citiesDataArr.length < ( activeIndex + 1 ) ) ?
                <AddNewCity 
                    onTouchStartFn={touchStartPoint} 
                    onTouchEndFn={touchEndPoint} 
                    onTouchMoveFn={ touchMoveEvent } 
                /> : 
                null
            }
            {
                citiesDataArr.length < ( activeIndex + 1 ) ? 
                null : 
                <WeatherDisplay 
                    onTouchStartFn={ touchStartPoint }
                    onTouchEndFn={ touchEndPoint } 
                    onTouchMoveFn={ touchMoveEvent } 
                    dataObj= { citiesDataArr[activeIndex] }
                />
            }
        </div>
    );
};

const mapStateToProps = state => ({
    citiesData: state.weatherApi
})

export default connect(mapStateToProps, null)(HomePage);