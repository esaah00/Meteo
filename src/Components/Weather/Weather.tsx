import "./Weather.css";
import WeatherData from "../WeatherData";
import useWeather from "../Hooks/useWeather";
import { TiWeatherStormy } from "react-icons/ti";
import { WiDaySprinkle } from "react-icons/wi";
import Spinner from "../Spinner";
import { useCallback } from "react";

const Weather: React.FC = () => {
  const { data, isLoading, isError, error, handleSearch } = useWeather();

  const onSearchClick = useCallback(() => {
    const element = document.getElementsByClassName(
      "cityInput"
    )[0] as HTMLInputElement;
    const inputValue = element.value.trim();
    handleSearch(inputValue);
  }, [handleSearch]);

  return (
    <div className="container">
      <h2 className="title">
        Weather Today
        <WiDaySprinkle />
      </h2>
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search (City)" />

        <div
          className="search-icon"
          onClick={onSearchClick}
          onKeyUp={onSearchClick}
        >
          <TiWeatherStormy />
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {isLoading && (
        <div className="loading-message">
          <Spinner loading={isLoading} />
        </div>
      )}
      {isError && <div className="error-message">Error fetching data</div>}
      {data && <WeatherData data={data} />}
    </div>
  );
};

export default Weather;
