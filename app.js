const apiKey = "11d9a9a0c8e6463287c63348262703";

//Global DOM Elements
const form = document.querySelector("form");
const userInput = document.querySelector(".form-input");
const searchedItems = document.querySelector(".searched-items-container");

// event listner(s)
form.addEventListener("submit", searchForm);
searchedItems.addEventListener("click", clickedItem);

// function to get inputvalue
function searchForm(e) {
  e.preventDefault();

  const location = userInput.value;
  fetchAPIData(location);
  setLocalStorageItems(location);
}

// funtion fetches data
async function fetchAPIData(location) {
  // Clears data to prevent overlapping
  document.querySelector("#main-content").innerHTML = "";
  document.querySelector(".day-forecast-container").innerHTML = "";
  document.querySelector(".hourly-forecast-content-items").innerHTML = "";

  // fetches data
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=6&aqi=no&alerts=no`,
  );
  const data = await response.json();

  displayMainData(data);
  displaysAsideData(data);
  displaysHourlyData(data);
}

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
              <div class="sub-info flex-sub-info glass-card">
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
              <div class="sub-info flex-sub-info glass-card">
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
              <div class="sub-info flex-sub-info glass-card">
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
              <div class="sub-info flex-sub-info glass-card">
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
              <div class="sub-info flex-sub-info glass-card">
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
    div.classList.add("day-forecast", "forecast-flex", "glass-card");
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
  data.forecast.forecastday[0].hour.forEach((hour) => {
    const div = document.createElement("div");
    div.classList.add("hourly-forecast-item", "glass-card");
    div.innerHTML = ` 
                <p>${formatTime(hour.time)}</p>
                <img src="${hour.condition.icon}" alt="" class="forecast" />
                <p>${hour.temp_f}&deg;</p>
              `;
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

// takes in userinput and saves it in localstorage
function setLocalStorageItems(location) {
  let itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.push(location);
  if (itemsFromStorage.length > 4) {
    itemsFromStorage.shift();
  }

  localStorage.setItem("locations", JSON.stringify(itemsFromStorage));
  renderLocalStorageItems();
}

// retrieve items from localstorage
function getItemsFromLocalStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("locations") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("locations"));
  }
  return itemsFromStorage;
}

// adds localstorage items to the DOM
function addLocalStorageToDOM(location) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(location));
  li.classList.add("searched-item");
  document.querySelector(".searched-items-container").appendChild(li);

  const btn = document.createElement("button");
  btn.classList.add("rm");
  li.appendChild(btn);

  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-x", "red");
  btn.appendChild(icon);
}

//displays each item in localstorage
function displayLocalStorageItems() {
  const itemsFromStorage = getItemsFromLocalStorage();
  itemsFromStorage.forEach((item) => addLocalStorageToDOM(item));
}

displayLocalStorageItems();

// selects the button through event delegation

function clickedItem(e) {
  if (e.target.closest(".rm")) {
    removeItem(e.target.closest(".searched-item"));
  }
}

function removeItem(selectedItem) {
  selectedItem.remove();
  removeItemFromStorage(selectedItem.firstChild.textContent);
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromLocalStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem("locations", JSON.stringify(itemsFromStorage));

  renderLocalStorageItems();
}

function renderLocalStorageItems() {
  searchedItems.innerHTML = "";

  const items = getItemsFromLocalStorage();

  items.forEach((item) => addLocalStorageToDOM(item));
}
