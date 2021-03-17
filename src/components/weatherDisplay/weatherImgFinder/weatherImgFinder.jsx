import img02d from '../../../assets/weatherIcons/02d.svg';
import img03d from '../../../assets/weatherIcons/03d.svg';
import img01d from '../../../assets/weatherIcons/01d.svg';
import img04d from '../../../assets/weatherIcons/04d.svg';
import img09d from '../../../assets/weatherIcons/09d.svg';
import img10d from '../../../assets/weatherIcons/10d.svg';
import img11d from '../../../assets/weatherIcons/11d.svg';
import img13d from '../../../assets/weatherIcons/13d.svg';
import img50d from '../../../assets/weatherIcons/50d.svg';
import img01n from '../../../assets/weatherIcons/01n.svg';
import img02n from '../../../assets/weatherIcons/02n.svg';
import img03n from '../../../assets/weatherIcons/03n.svg';
import img04n from '../../../assets/weatherIcons/04n.svg';
import img09n from '../../../assets/weatherIcons/09n.svg';
import img10n from '../../../assets/weatherIcons/10n.svg';
import img11n from '../../../assets/weatherIcons/11n.svg';
import img13n from '../../../assets/weatherIcons/13n.svg';
import img50n from '../../../assets/weatherIcons/50n.svg';

const WeatherImgFinder = ({ imgCode }) => {
    let Img;

    switch (imgCode) {
        case '01d':{
            Img = <img src={img01d} alt={imgCode}/>
            break;
        }
        case '02d':{
            Img = <img src={img02d} alt={imgCode}/>
            break;
        }
        case '03d':{
            Img = <img src={img03d} alt={imgCode}/>
            break;
        }
        case '04d':{
            Img = <img src={img04d} alt={imgCode}/>
            break;
        }
        case '09d':{
            Img = <img src={img09d} alt={imgCode}/>
            break;
        }
        case '10d':{
            Img = <img src={img10d} alt={imgCode}/>
            break;
        }
        case '11d':{
            Img = <img src={img11d} alt={imgCode}/>
            break;
        }
        case '13d':{
            Img = <img src={img13d} alt={imgCode}/>
            break;
        }
        case '50d':{
            Img = <img src={img50d} alt={imgCode}/>
            break;
        }
        case '01n':{
            Img = <img src={img01n} alt={imgCode}/>
            break;
        }
        case '02n':{
            Img = <img src={img02n} alt={imgCode}/>
            break;
        }
        case '03n':{
            Img = <img src={img03n} alt={imgCode}/>
            break;
        }
        case '04n':{
            Img = <img src={img04n} alt={imgCode}/>
            break;
        }
        case '09n':{
            Img = <img src={img09n} alt={imgCode}/>
            break;
        }
        case '10n':{
            Img = <img src={img10n} alt={imgCode}/>
            break;
        }
        case '11n':{
            Img = <img src={img11n} alt={imgCode}/>
            break;
        }
        case '13n':{
            Img = <img src={img13n} alt={imgCode}/>
            break;
        }
        case '50n':{
            Img = <img src={img50n} alt={imgCode}/>
            break;
        }
        default:
            break;
    }

    return Img;
}

export default WeatherImgFinder;