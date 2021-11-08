import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = new Navigo(window.location.origin);

function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header(st)}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer(st)}
  `;
  router.updatePageLinks(st);
  newDeck(st);
  // drawTwo(st);
  draw(st);
  stay(st);
  shuffle(st);
}

function newDeck(st) {
  if (st.page === "Game") {
    document.querySelector("#newDeck").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: newDeck");
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
        `
        )
        .then(response => {
          state.Game.deck = {};
          state.Game.deck.deck_id = response.data.deck_id;
          console.log(state.Game.deck.deck_id);
        })
        .catch(err => console.log("this is the one", err));
      // drawTwo();
    });
  }
}

// function drawTwo(st) {
//   if (st.page === "Game") {
//     document.querySelector("#newDeck").addEventListener("click", event => {
//       event.preventDefault();
//       console.log("it worked: drawTwo");
//       axios
//         .get(
//           `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=2`
//         )
//         .then(response => {
//           console.log(response.data.cards);
//           state.Game.deck.cardImage1 = response.data.cards[0].image;
//           state.Game.deck.cardImage2 = response.data.cards[1].image;
//           console.log(state.Game.deck.cardImage1);
//           console.log(state.Game.deck.cardImage2);
//         });
//     });
//   }
// }

function draw(st) {
  if (st.page === "Game") {
    document.querySelector("#draw").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: draw");
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=1`
        )
        .then(response => {
          console.log(response.data.cards);
          state.Game.deck.cardImage = response.data.cards[0].image;
          console.log(state.Game.deck.cardImage);
          let cardCreation = document.createElement("img");
          cardCreation.className = "card";
          cardCreation.src = state.Game.deck.cardImage;
          document.getElementById("playerCards").appendChild(cardCreation);
        });
    });
  }
}

function stay(st) {
  if (st.page === "Game") {
    document.querySelector("#stay").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: stay");
      document.getElementById("playerCards").innerHTML = "";
    });
  }
}

function shuffle(st) {
  if (st.page === "Game") {
    document.querySelector("#shuffle").addEventListener("click", event => {
      event.preventDefault();
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/shuffle/
          `
        )
        .then(response => console.log(response));
      document.getElementById("playerCards").innerHTML = "";
    });
  }
}

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty.call("page")
        ? capitalize(params.page)
        : "Home";
    if (page === "Home") {
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
        .catch(err => console.log("1", err));
    }
    if (page === "Game") {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
        `
        )
        .then(response => {
          console.log(response);
          done();
        })
        .catch(err => console.log("this is the one", err));
    }
  }
});

router
  .on({
    "/": () => render(state.Home),
    ":page": params => render(state[capitalize(params.page)])
  })
  .resolve();
