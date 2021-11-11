import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
async function clickEvent() {
  console.log("it worked: newDeck");
  //Send a get request to the API to get a Deck to work with.
  let response = await axios(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    `
  );
}

clickEvent();

function newDeck(st) {
  //If the page is Game, then make the button ID'd as newDeck into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    async function getData() {
      const data = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
    `);
    }
  }
}

//Todo: use async function to capture API data
async function startingHand() {
  let response = await axios.get(
    `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=2`
  );
}
//todo: then save deck_id to a variable in state
//todo: enter above id into another API call with id in target
