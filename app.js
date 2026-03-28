const apiKey = "11d9a9a0c8e6463287c63348262703";
async function fetchAPIData() {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Tampa&days=3&aqi=no&alerts=no`,
  );
  const data = await response.json();

  console.log(data);
}

fetchAPIData();
