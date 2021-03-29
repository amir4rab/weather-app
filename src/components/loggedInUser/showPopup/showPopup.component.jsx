import classes from './showPopup.module.scss';

const ShowPopup = ({ fromCloud, fromDevice }) => {
    return (
        <div className={ classes.overlay }>
            <div className={ classes.inner }>
                <h3 className={ classes.title }>
                    There is a difference between data from Cloud and you device which one you want to use? 
                </h3>
                <div className={ classes.btnSection }>
                    <button onClick={ fromCloud }>
                        from Cloud
                    </button>
                    <button onClick={ fromDevice }>
                        from Device
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowPopup;