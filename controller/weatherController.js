const axios = require("axios");
const weatherController = {};
require("dotenv").config();
const API_KEY = process.env.OPEN_WEATHER_KEY;

weatherController.getWeatherData = async (req, res, next) => {
  data1 = await weatherController.getCurrentWeather(req);
  data2 = await weatherController.getHourlyWeather(req, data1.data.coord.lat, data1.data.coord.lon);
  res.send({ current: data1, hourly: data2 });
};

weatherController.getCurrentWeather = async (req) => {
  try {
    const city = req.query.q;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    let response = await axios.get(url);
   
    return { status: "success", data: response.data };
  } catch (err) {
    return { status: "fail", data: err.message };
  }
};
weatherController.getHourlyWeather = async (req, lat, lon) => {
  try {
    const city = req.query.q;
    console.log("city", city);
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API_KEY}&units=metric`;
    console.log("url", url);
    let response = await axios.get(url);

    console.log("hourly weather", response.data);
    return { status: "success", data: response.data };
  } catch (err) {
    return { status: "fail", data: err.message };
  }
};

module.exports = weatherController;
