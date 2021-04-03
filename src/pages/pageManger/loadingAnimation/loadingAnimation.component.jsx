import classes from './loadingAnimation.module.scss';

const LoadingAnimation = _ => {
    return (
        <div className={ classes.outer }>
            <div className={ classes.inner }></div>
        </div>
    );
};

export default LoadingAnimation;