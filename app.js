const API_KEY = `c8e3bd9e9da5dfeb0b4d4dffac5a321c`;

const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
  weather.innerHTML = `
  <div>
    <h4>Loading...</h4>
    <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Icon">
  </div>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `
    <div>
      <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Icon">
    </div>
    <div>
      <h4>City not found, Please enter a valid city!</h4>
    </div> `;
    return;
  }
  weather.innerHTML = `
  <div>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Icon">
  </div>
  <div>
    <h2>${data.main.temp} ℃</h2>
    <h4>${data.weather[0].main}</h4>
  </div> `;
};
form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
