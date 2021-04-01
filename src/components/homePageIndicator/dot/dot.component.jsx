import './dot.scss';

const Dot = ({ name, index, activeIndex, setToThisIndex }) => {
    // console.log(data);

    return (
        <div className={ `dot ${ index === activeIndex ? 'active' : ''}` }>
            <div onClick={setToThisIndex} className="dot_inner">
                { name }
            </div>
        </div> 
    );
}

export default Dot;
