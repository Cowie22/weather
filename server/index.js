const path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { getAllCities, addCity } = require("../database/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/public")));

const PORT = process.env.PORT || 2222;

app.get("/weather/:lat/:long", async function(req, res) {
  const { lat, long } = req.params;
  let locationID;
  try {
    const getLocation = await axios.get(
      `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`
    );
    locationID = getLocation.data[0].woeid;
  } catch (err) {
    res.send(err);
  }

  try {
    const weatherData = await axios.get(
      `https://www.metaweather.com/api/location/${locationID}`
    );
    res.send(JSON.stringify(weatherData.data));
  } catch (err) {
    res.send(err);
  }
});

app.get("/city", async function(req, res) {
  try {
    const getCityInfo = await getAllCities();
    let reducedCityInfo = getCityInfo[0]
      .slice(getCityInfo[0].length - 10, getCityInfo[0].length)
      .reverse();
    res.send(reducedCityInfo);
  } catch (err) {
    res.send(err);
  }
});

app.post("/city", async function(req, res) {
  const info = req.body;
  try {
    const postCityInfo = await addCity(info);
    res.send(postCityInfo);
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
