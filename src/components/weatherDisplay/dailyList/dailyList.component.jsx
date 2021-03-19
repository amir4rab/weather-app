import DailyItem from "./dailyItem/dailyItem.component";

const DailyList = ({ dataArr }) => {
    return (
        <div>
            { dataArr.map( ( data, i ) => <DailyItem data={ data } key={`dailyItem${i}`} />) }
        </div>
    );
};

export default DailyList;