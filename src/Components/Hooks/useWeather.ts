import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
    throw new Error("City not found. Please enter a valid city.");
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
    enabled: false,
  });

  const handleSearch = (inputValue: string) => {
    const regex = /^[a-zA-Z\s]+(,\s*[a-zA-Z\s]+)?$/;
    if (!regex.test(inputValue)) {
      setError("Please enter a valid city and optionally a state or country.");
      return;
    }

    const [city, country] = inputValue.split(",").map((str) => str.trim());
    setCity(city);
    setCountry(country || "");
    refetch();
  };

  return { data, isLoading, isError, error, handleSearch };
};

export default useWeather;
