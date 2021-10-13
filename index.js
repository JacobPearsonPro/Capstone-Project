import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
<<<<<<< HEAD
dotenv.config();

const router = new Navigo(window.location.origin);

function render(st = state.home) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer(st)}
  `;
  router.updatePageLinks(st);
}

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty.call("page")
        ? capitalize(params.page)
        : "Home";
    switch (page) {
      case "Home":
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st.%20louis`
          )
          .then(response => {
            state.Home.weather = {};
            // console.log(response, state.Home.weather);
            state.Home.weather.city = response.data.name;
            state.Home.weather.temp = response.data.main.temp;
            state.Home.weather.feelsLike = response.data.main.feels_like;
            state.Home.weather.humidity = response.data.main.humidity;
            state.Home.weather.description =
              response.data.weather[0]["description"];
            done();
          })
          .catch(err => console.log(err));
        break;

      default:
        done();
=======

const router = new Navigo(window.location.origin);

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty("page")
        ? capitalize(params.page)
        : "Home";
    if (page === "Home") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st.%20louis`
        )
        .then(response => {
          state.Home.weather = {};
          state.Home.weather.city = response.data.name;
          state.Home.weather.temp = response.data.main.temp;
          state.Home.weather.feelsLike = response.data.main.feels_like;
          state.Home.weather.description = response.data.weather[0].main;
          done();
        })
        .catch(err => console.log(err));
>>>>>>> acc8f965e4e0656b57c0c384b01dcaf782869187
    }
  }
});

router
  .on({
    "/": () => render(state.Home),
    "_:page": params => {
      const page = capitalize(params.page);
      render(state[page]);
    },
    get ":page"() {
      return this["_:page"];
    },
    set ":page"(value) {
      this["_:page"] = value;
    }
  })
  .resolve();
