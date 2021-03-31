import classes from './cityItem.module.scss'

const CityItem = ({ data, removeFn }) => {
    return (
        <div className={ classes.main }>
            <div className={ classes.name }>
                {data.name}
            </div>
            <div className={ classes.btnArea }>
                <button className={ classes.btn_red } onClick={ removeFn }>Remove</button>
            </div>
        </div>
    );
};

export default CityItem;