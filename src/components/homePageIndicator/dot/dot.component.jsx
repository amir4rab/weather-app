import './dot.scss';

const Dot = ({ index, activeIndex }) =>  (
    <div className={ `dot ${ index === activeIndex ? 'active' : ''}` }></div> 
);

export default Dot;
