import Spinner from "../Spinner";
import "../styles/WeeklyForecast.css";

interface WeeklyForecastProps {
  forecastData: {
    list: {
      dt_txt: string;
      main: {
        temp: number;
      };
      weather: {
        icon: string;
      }[];
    }[];
  };
  isLoading: boolean;
  isError: boolean;
}

const WeeklyForecast = ({
  forecastData,
  isLoading,
  isError,
}: WeeklyForecastProps) => {
  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const day = date.toLocaleDateString(undefined, { weekday: "short" });
    const time = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${day}${time}`;
  };

  if (isLoading) {
    return (
      <div>
        <Spinner loading={isLoading} />
      </div>
    );
  }

  if (isError) {
    return <div>{isError}</div>;
  }
  if (!forecastData || !forecastData.list) {
    return <>No weather forecast today</>;
  }

  return (
    <div className="weekly-forecast">
      {forecastData.list.map((item) => (
        <div key={item.dt_txt} className="forecast-item">
          <div>{formatTime(item.dt_txt)}</div>
          <div>{Math.round(item.main.temp)}°C</div>
          <img
            className="forecast-icon"
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
