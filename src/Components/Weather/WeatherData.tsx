import clear from "../../assets/clear.png";
import cloud from "../../assets/cloud.png";
import drizzle from "../../assets/drizzle.png";
import humidityIcon from "../../assets/humidity.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import windIcon from "../../assets/wind.png";
import translate from "../../fr.json";

interface WeatherDataProps {
  data: {
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
    }[];
    wind: {
      speed: number;
    };
    name: string;
  };
}

const getWeatherLogo = (icon: string) => {
  switch (icon) {
    case "01d":
    case "01n":
      return clear;
    case "02d":
    case "02n":
      return cloud;
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return drizzle;
    case "09d":
    case "09n":
      return rain;
    case "10d":
    case "10n":
      return rain;
    case "13d":
    case "13n":
      return snow;
    default:
      return clear;
  }
};

const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
  return (
    <div className="data-container">
      <div className="weather-image">
        <img src={getWeatherLogo(data.weather[0].icon)} alt="" />
      </div>
      <div className="weather-temp">{Math.floor(data.main.temp)}°c</div>
      <div className="weather-location">{data.name}</div>
      <div className="element">
        <img src={humidityIcon} alt="" className="icon" />
        <div className="data">
          <div className="humidity-percentage">
            {Math.floor(data.main.humidity)} %
          </div>
          <div className="text">{translate.humidity}</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="" className="icon" />
        <div className="data">
          <div className="wind-rate">{Math.floor(data.wind.speed)} km/h</div>
          <div className="text">{translate.windSpeed}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherData;
