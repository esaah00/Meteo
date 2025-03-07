import "../styles/Weather.css";
import WeatherData from "./WeatherData";
import useWeather from "../Hooks/useWeather";
import { TiWeatherStormy } from "react-icons/ti";
import { WiDaySprinkle } from "react-icons/wi";
import Spinner from "../Spinner";
import { useCallback, useState } from "react";
import translate from "../../fr.json";
import { SlClose } from "react-icons/sl";

const Weather: React.FC = () => {
  const { data, isLoading, isError, error, handleSearch } = useWeather();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSearchClick = useCallback(() => {
    const element = document.getElementsByClassName(
      "cityInput"
    )[0] as HTMLInputElement;
    const inputValue = element.value.trim();
    handleSearch(inputValue);
  }, [handleSearch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearchClick();
      }
    },
    [onSearchClick]
  );

  const handleClose = () => {
    const element = document.getElementsByClassName(
      "cityInput"
    )[0] as HTMLInputElement;
    element.value = "";
    setIsInputFocused(false);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="title">
        {translate.weatherToday}
        <WiDaySprinkle />
      </h2>
      <div className="top-bar">
        <div className="input-container">
          <input
            type="text"
            className={`cityInput ${isInputFocused ? "focused" : ""}`}
            placeholder={translate.searchCity}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={inputValue} // Bind input value to state
            onChange={handleInputChange} // Handle input changes
          />
          {inputValue && (
            <SlClose className="close-inside" onClick={handleClose} />
          )}{" "}
          {/* Conditionally render close icon */}
        </div>

        <div
          className="search-icon"
          onClick={onSearchClick}
          onKeyDown={handleKeyDown}
        >
          <TiWeatherStormy />
        </div>
      </div>
      {error && (
        <div className="error-message">{translate.errorFetchingData}</div>
      )}
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
