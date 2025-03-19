const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
const getWeatherButton = document.getElementById('getWeather');
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('city');

// Function to fetch weather data
const getWeather = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherInfo.innerHTML = `<p>City not found!</p>`;
      weatherInfo.style.display = 'block';
      return;
    }

    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Display weather data
    weatherInfo.innerHTML = `
      <p>Temperature: ${temperature}°C</p>
      <p>Description: ${weatherDescription}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    weatherInfo.style.display = 'block';
  } catch (error) {
    weatherInfo.innerHTML = `<p>Something went wrong! Please try again later.</p>`;
    weatherInfo.style.display = 'block';
  }
};

// Event listener for the Get Weather button
getWeatherButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    weatherInfo.innerHTML = '<p>Please enter a city name!</p>';
    weatherInfo.style.display = 'block';
  }
});
