const apiKey = "11d9a9a0c8e6463287c63348262703";

// fetches data
async function fetchAPIData() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=dallas&days=6&aqi=no&alerts=no`,
  );
  const data = await response.json();

  displayMainData(data);
  epochConvert(data);
  displaysAsideData(data);
  displaysHourlyData(data);
}

fetchAPIData();

// displays data
function displayMainData(data) {
  const div = document.createElement("div");
  div.classList.add("main-text-container");

  div.innerHTML = ` <p class="main-date">${epochConvert(data.location.localtime_epoch)}</p>
              <h1>${data.location.name}, ${data.location.region}, ${data.location.country}</h1>
              <div class="flex-main-weather">
                <p class="degrees">${data.forecast.forecastday[0].day.avgtemp_f}&deg; <span class="degree-scale">F</span></p>
                <div class="main-img-container">
                  <img
                    class="main-img"
                    src="${data.current.condition.icon}"
                    alt="Main-weather Display"
                  />
                </div>
              </div>
              <p class="condition">${data.current.condition.text}</p>
              <div class="flex-degrees">
                <p class="highest">H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;</p>
                <p class="lowest">L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;</p>
              </div>
              <div class="sub-info-container">
              <div class="sub-info flex-sub-info">
                <div class="sub-info-icon">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                    <i
                      class="fa-solid fa-droplet-slash fa-stack-1x"
                      style="color: rgb(116, 192, 252)"
                    ></i>
                  </span>
                </div>
                <div class="sub-info-subtext">
                  <p class="sub-info-title">Humidity</p>
                  <p class="sub-info-data">${data.current.humidity}%</p>
                </div>
              </div>
              <div class="sub-info flex-sub-info">
                <div class="sub-info-icon">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                    <i
                      class="fa-solid fa-wind fa-stack-1x"
                      style="color: rgb(116, 192, 252)"
                      style="color: rgb(116, 192, 252)"
                    ></i>
                  </span>
                </div>
                <div class="sub-info-subtext">
                  <p class="sub-info-title">Wind</p>
                  <p class="sub-info-data">${data.current.wind_mph} mph</p>
                </div>
              </div>
              <div class="sub-info flex-sub-info">
                <div class="sub-info-icon">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                    <i
                      class="fa-solid fa-temperature-high fa-stack-1x"
                      style="color: rgb(116, 192, 252)"
                    ></i>
                  </span>
                </div>
                <div class="sub-info-subtext">
                  <p class="sub-info-title">Feels Like</p>
                  <p class="sub-info-data">${data.current.feelslike_f}&deg;</p>
                </div>
              </div>
              <div class="sub-info flex-sub-info">
                <div class="sub-info-icon">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                    <i class="fa-solid fa-fire fa-stack-1x" style="color: rgb(116, 192, 252)"></i>
                  </span>
                </div>
                <div class="sub-info-subtext">
                  <p class="sub-info-title">Heat Index</p>
                  <p class="sub-info-data">${data.current.heatindex_f}&deg;</p>
                </div>
              </div>
              <div class="sub-info flex-sub-info">
                <div class="sub-info-icon">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-circle fa-stack-2x icon-background"></i>
                    <i class="fa-solid fa-eye fa-stack-1x" style="color: rgb(116, 192, 252)"></i>
                  </span>
                </div>
                <div class="sub-info-subtext">
                  <p class="sub-info-title">Vision Miles</p>
                  <p class="sub-info-data">${data.current.vis_miles}m</p>
                </div>
              </div>
            </div>
          </main>
          
              </div>`;
  document.querySelector("#main-content").appendChild(div);
}

function displaysAsideData(data) {
  // Loops through the array within data.forecast.forecastday and executes the following code
  data.forecast.forecastday.slice(1).forEach((day) => {
    const div = document.createElement("div");
    div.classList.add("day-forecast", "forecast-flex");
    div.innerHTML = `  <div class="forecast-img-container">
                  <img
                    src="${day.day.condition.icon}"
                    alt=""
                    class="forecast"
                  />
                </div>
                <div class="aside-div-flex">
                  <div class="aside-temp-container">
                    <p class="aside-date">${epochConvert(day.date_epoch)}</p>
                    <p class="aside-temp">${day.day.avgtemp_f}&deg;</p>
                  </div>
                  <div class="aside-condition">${day.day.condition.text}</div>
                </div>
              `;
    document.querySelector(".day-forecast-container").appendChild(div);
  });
}

function displaysHourlyData(data) {
  console.log(data);
  data.forecast.forecastday[0].hour.slice(0, 6).forEach((hour) => {
    const div = document.createElement("div");
    div.classList.add("hourly-forecast-item");
    div.innerHTML = ` <div class="hourly-forecast-item">
                <p>${formatTime(hour.time)}</p>
                <img src="${hour.condition.icon}" alt="" class="forecast" />
                <p>${hour.temp_f}&deg;</p>
              </div>`;
    document.querySelector(".hourly-forecast-content-items").appendChild(div);
  });
}

//formats the 24 hour time into 12 hours
function formatTime(data) {
  const time = data.split(" ")[1];
  const [hour, minute] = time.split(":");
  const h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";
  const formattedHour = h % 12 || 12;
  const newTime = `${formattedHour}:${minute} ${ampm}`;
  return newTime;
}

// converts epoch date to human readable date

function epochConvert(epoch) {
  const apiDate = new Date(epoch * 1000);

  const today = new Date(); //gives me todays date
  const isToday =
    apiDate.getFullYear() === today.getFullYear() &&
    apiDate.getMonth() === today.getMonth() &&
    apiDate.getDate() === today.getDate();

  if (isToday) {
    return "Today";
  }
  return apiDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
