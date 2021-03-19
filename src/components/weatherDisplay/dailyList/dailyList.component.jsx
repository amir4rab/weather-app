import DailyItem from "./dailyItem/dailyItem.component";

const DailyList = ({ dataArr }) => {
    return (
        <div>
            { dataArr.map(data => <DailyItem data={ data } />) }
        </div>
    );
};

export default DailyList;