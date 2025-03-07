import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import translate from "../../fr.json";

interface WeatherData {
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
  cod: number;
}

interface ForecastData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
    }[];
  }[];
}

const fetchWeather = async (
  city: string,
  country?: string
): Promise<WeatherData> => {
  const API_KEY = "a5f5160760d24e8a7c944d52cc2c9cc9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${
    country ? `,${country}` : ""
  }&units=Metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(translate.cityNotFound);
  }
  return response.json();
};

const fetchForecast = async (
  city: string,
  country?: string
): Promise<ForecastData> => {
  const API_KEY = "a5f5160760d24e8a7c944d52cc2c9cc9";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}${
    country ? `,${country}` : ""
  }&units=Metric&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(translate.cityForecasrNotfound);
  }
  return response.json();
};

const useWeather = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const { data, isLoading, isError, refetch } = useQuery<WeatherData, Error>({
    queryKey: ["weather", city, country],
    queryFn: () => fetchWeather(city, country),
    staleTime: 50000,
    enabled: !!city,
  });

  const {
    data: forecastData,
    isLoading: isForecastLoading,
    isError: isForecastError,
  } = useQuery<ForecastData, Error>({
    queryKey: ["forecast", city, country],
    queryFn: () => fetchForecast(city, country),
    staleTime: 50000,
    enabled: !!city,
  });

  const handleSearch = (inputValue: string) => {
    const regex = /^[a-zA-Z\s]+(,\s*[a-zA-Z\s]+)?$/;
    if (!regex.test(inputValue)) {
      setError(translate.validCityCountry);
      return;
    }

    const [city, country] = inputValue.split(",").map((str) => str.trim());
    setCity(city);
    setCountry(country || "");
    refetch();
  };

  return {
    data,
    isLoading,
    isError,
    error,
    handleSearch,
    forecastData,
    isForecastLoading,
    isForecastError,
  };
};

export default useWeather;
