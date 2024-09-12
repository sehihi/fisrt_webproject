import React, { useEffect, useState } from "react";
import './Weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const apiKey = '12cbb94c69458b0c45a01c760c2e7bf1';
    const latitude = 34.883;
    const longitude = 128.620;

    async function fetchWeatherAndForecast() {
      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        ]);

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setWeatherData(weatherData);
        setForecastData(forecastData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }

    fetchWeatherAndForecast();
  }, []);

  const translateDescription = (description) => {
    const descriptionMap = {
      "clear sky": "맑음",
      "few clouds": "조금 흐림",
      "scattered clouds": "조금 흐림",
      "broken clouds": "흐림",
      "overcast clouds": "많이 흐림",
      "light rain": "이슬비",
      "moderate rain": "비",
      "heavy intensity rain": "폭우",
      "very heavy rain": "폭우",
      "extreme rain": "폭우",
      "freezing rain": "어는 비",
      "light intensity shower rain": "가벼운 소나기",
      "shower rain": "소나기",
      "heavy intensity shower rain": "강한 소나기",
      "ragged shower rain": "거센 소나기",
      "light intensity drizzle": "약한 이슬비",
      "drizzle": "이슬비",
      "heavy intensity drizzle": "강한 이슬비",
      "light intensity drizzle rain": "가벼운 이슬비와 비",
      "drizzle rain": "이슬비와 비",
      "heavy intensity drizzle rain": "강한 이슬비와 비",
      "shower drizzle": "소나기성 이슬비",
      "thunderstorm with light rain": "가벼운 비를 동반한 천둥번개",
      "thunderstorm with rain": "비를 동반한 천둥번개",
      "thunderstorm with heavy rain": "강한 비를 동반한 천둥번개",
      "light snow": "가벼운 눈",
      "snow": "눈",
      "heavy snow": "강한 눈",
      "sleet": "진눈깨비",
      "light shower sleet": "가벼운 소나기성 진눈깨비",
      "shower sleet": "소나기성 진눈깨비",
      "light rain and snow": "가벼운 비와 눈",
      "rain and snow": "비와 눈",
      "light shower snow": "가벼운 소나기성 눈",
      "shower snow": "소나기성 눈",
      "heavy shower snow": "강한 소나기성 눈",
      "mist": "안개",
      "smoke": "연기",
      "haze": "연무",
      "sand, dust whirls": "모래, 먼지 소용돌이",
      "fog": "짙은 안개",
      "sand": "모래",
      "dust": "먼지",
      "volcanic ash": "화산재",
      "squalls": "돌풍",
      "tornado": "토네이도",
      "tropical storm": "열대성 폭풍",
      "hurricane": "허리케인",
      "cold": "추운 날씨",
      "hot": "더운 날씨",
      "windy": "바람이 많이 부는 날씨",
      "hail": "우박",
      "calm": "고요한 날씨",
      "light breeze": "약한 산들바람",
      "gentle breeze": "부드러운 바람",
      "moderate breeze": "보통 바람",
      "fresh breeze": "신선한 바람",
      "strong breeze": "강한 바람",
      "high wind, near gale": "강한 바람, 갤바람 근처",
      "gale": "갤바람",
      "severe gale": "심한 갤바람",
      "storm": "폭풍",
      "violent storm": "격렬한 폭풍"
    };

    return descriptionMap[description] || description;
  };

  if (!weatherData || weatherData.cod !== 200) {
    return <p>Loading weather...</p>;
  }

  const { description, icon } = weatherData.weather[0];
  const { temp, humidity, feels_like } = weatherData.main;
  const { speed } = weatherData.wind;
  const rainPop = forecastData?.list[0]?.pop || 0;

  return (
    <div class="weather">
      <img class="icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
      <div class="temperature">{temp.toFixed(1)}°</div>

      <div class="weather-description">
        <p>{translateDescription(description)}</p>
      </div>
      <div class="weather-details">
        <p><span class="label">체감</span> <span class="value">{feels_like.toFixed(1)}°</span></p>
        <p><span class="label">습도</span> <span class="value">{humidity}%</span></p>
        <p><span class="label">풍속</span> <span class="value">{speed}m/s</span></p>
      </div>
    </div>
  );
};

export default Weather;
