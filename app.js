const apiKey = "11d9a9a0c8e6463287c63348262703";

async function fetchAPIData() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Miami&days=3&aqi=no&alerts=no`,
  );
  const data = await response.json();

  console.log(data);
  displayMainData(data);
}

fetchAPIData();

function displayMainData(data) {
  const div = document.createElement("div");
  div.classList.add("main-text-container");

  div.innerHTML = ` <p class="main-date">Fri, 27 Mar 2026</p>
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
