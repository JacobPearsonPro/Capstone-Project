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
  draw(st);
  stay(st);
  shuffle(st);
  computerStartingHand(st);
  startingHand(st);
  computerDraws(st);
}

function newDeck(st) {
  //If the page is Game, then make the button ID'd as newDeck into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    console.log("it worked: newDeck");
    //Send a get request to the API to get a Deck to work with.
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
        `
      )
      //Then create an object in Game's page in Store called deck so that I can save things there. Save my deck id from the get request so I can target it, then set up handValue so I can add together the values of all the cards I draw later. Also, by setting it to 0 here whenever I get a new deck that resets.
      .then(response => {
        state.Game.deck = {};
        state.Game.deck.deck_id = response.data.deck_id;
        console.log(state.Game.deck.deck_id);
        state.Game.deck.computerHandValue = 0;
        state.Game.deck.handValue = 0;

        //Async Await functions don't like the combination of Ifs, EventListener, Axios, and Render I think

        //If this is true, which it won't be until the above has triggered, thus it'll wait, do things to the returned info from the above Axios API call, like using its response for targeting data for the next one.
        if (state.Game.deck.deck_id) {
          console.log("it's alive!");
        }
      })
      .catch(err => console.log("this is the one", err));
  }
}

function computerStartingHand(st) {
  //Draw your first two cards.
  if (st.page === "Game") {
    document.querySelector("#startingHand").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: newDeck");
      //get the cards from the API that holds the deck.
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=2`
        )
        //Then save their images to state/store so I can use it later.
        .then(response => {
          console.log(response.data.cards);
          state.Game.deck.computerCardImage0 = response.data.cards[0].image;
          console.log(state.Game.deck.computerCardImage0);
          state.Game.deck.computerCardImage1 = response.data.cards[1].image;
          console.log(state.Game.deck.computerCardImage1);

          let computerCardCreation0 = document.createElement("img");
          computerCardCreation0.className = "card";
          computerCardCreation0.src = state.Game.deck.computerCardImage0;
          document.getElementById("aiCards").appendChild(computerCardCreation0);
          let computerCardCreation1 = document.createElement("img");
          computerCardCreation1.className = "card";
          computerCardCreation1.src = state.Game.deck.computerCardImage1;
          document.getElementById("aiCards").appendChild(computerCardCreation1);

          if (response.data.cards[0].value == "ACE") {
            state.Game.deck.computerCardValue0 = 10;
          } else if (response.data.cards[0].value == "JACK") {
            state.Game.deck.computerCardValue0 = 10;
          } else if (response.data.cards[0].value == "QUEEN") {
            state.Game.deck.computerCardValue0 = 10;
          } else if (response.data.cards[0].value == "KING") {
            state.Game.deck.computerCardValue0 = 10;
          } else
            state.Game.deck.computerCardValue0 = parseInt(
              response.data.cards[0].value,
              10
            );

          if (response.data.cards[1].value == "ACE") {
            state.Game.deck.computerCardValue1 = 10;
          } else if (response.data.cards[1].value == "JACK") {
            state.Game.deck.computerCardValue1 = 10;
          } else if (response.data.cards[1].value == "QUEEN") {
            state.Game.deck.computerCardValue1 = 10;
          } else if (response.data.cards[1].value == "KING") {
            state.Game.deck.computerCardValue1 = 10;
          } else
            state.Game.deck.computerCardValue1 = parseInt(
              response.data.cards[1].value,
              10
            );

          console.log(response.data.cards[0].value);
          console.log(response.data.cards[1].value);

          console.log(state.Game.deck.computerHandValue);
          state.Game.deck.computerHandValue +=
            state.Game.deck.computerCardValue0 +
            state.Game.deck.computerCardValue1;
          console.log(state.Game.deck.computerHandValue);
        });
    });
  }
}

function computerDraws(st) {
  //If the page is Game, then make the button ID'd as draw into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    document.querySelector("#root").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: computerDraw");
      //Hey axios, get me a single card from the API please.
      if (
        state.Game.deck.computerHandValue <= 16 &&
        state.Game.deck.computerHandValue > 0
      )
        axios
          .get(
            `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=2`
          )
          //Then save their images to state/store so I can use it later.
          .then(response => {
            console.log(
              "log the response from the above axios call",
              response.data.cards
            );
            state.Game.deck.computerCardImage0 = response.data.cards[0].image;
            console.log(
              "log that it successfully saved the image to state",
              state.Game.deck.computerCardImage0
            );

            let computerCardCreation0 = document.createElement("img");
            computerCardCreation0.className = "card";
            computerCardCreation0.src = state.Game.deck.computerCardImage0;
            document
              .getElementById("aiCards")
              .appendChild(computerCardCreation0);

            if (response.data.cards[0].value == "ACE") {
              state.Game.deck.computerCardValue0 = 10;
            } else if (response.data.cards[0].value == "JACK") {
              state.Game.deck.computerCardValue0 = 10;
            } else if (response.data.cards[0].value == "QUEEN") {
              state.Game.deck.computerCardValue0 = 10;
            } else if (response.data.cards[0].value == "KING") {
              state.Game.deck.computerCardValue0 = 10;
            } else {
              state.Game.deck.computerCardValue0 = parseInt(
                response.data.cards[0].value,
                10
              );
            }
            console.log(response.data.cards[0].value);

            console.log(state.Game.deck.computerHandValue);
            state.Game.deck.computerHandValue +=
              state.Game.deck.computerCardValue0;
            console.log(state.Game.deck.computerHandValue);
          });
    });
  }
}

function startingHand(st) {
  //Draw your first two cards.
  if (st.page === "Game") {
    document.querySelector("#startingHand").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: double test");
      //get the cards from the API that holds the deck.
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=2`
        )
        //Then save their images to state/store so I can use it later.
        .then(response => {
          console.log(response.data.cards);
          state.Game.deck.cardImage0 = response.data.cards[0].image;
          console.log(state.Game.deck.cardImage0);
          state.Game.deck.cardImage1 = response.data.cards[1].image;
          console.log(state.Game.deck.cardImage1);

          document.getElementById("aiText").innerHTML = "Computer's Hand";
          document.getElementById("playerText").innerHTML = "Your Hand";

          let cardCreation0 = document.createElement("img");
          cardCreation0.className = "card";
          cardCreation0.src = state.Game.deck.cardImage0;
          document.getElementById("playerCards").appendChild(cardCreation0);
          let cardCreation1 = document.createElement("img");
          cardCreation1.className = "card";
          cardCreation1.src = state.Game.deck.cardImage1;
          document.getElementById("playerCards").appendChild(cardCreation1);

          if (response.data.cards[0].value == "ACE") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "JACK") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "QUEEN") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "KING") {
            state.Game.deck.cardValue0 = 10;
          } else
            state.Game.deck.cardValue0 = parseInt(
              response.data.cards[0].value,
              10
            );

          if (response.data.cards[1].value == "ACE") {
            state.Game.deck.cardValue1 = 10;
          } else if (response.data.cards[1].value == "JACK") {
            state.Game.deck.cardValue1 = 10;
          } else if (response.data.cards[1].value == "QUEEN") {
            state.Game.deck.cardValue1 = 10;
          } else if (response.data.cards[1].value == "KING") {
            state.Game.deck.cardValue1 = 10;
          } else
            state.Game.deck.cardValue1 = parseInt(
              response.data.cards[1].value,
              10
            );

          console.log(response.data.cards[0].value);
          console.log(response.data.cards[1].value);

          console.log(state.Game.deck.handValue);
          state.Game.deck.handValue +=
            state.Game.deck.cardValue0 + state.Game.deck.cardValue1;
          console.log(state.Game.deck.handValue);
          document.getElementById("textHolder").innerHTML = "";
        });
    });
  }
}

function draw(st) {
  //If the page is Game, then make the button ID'd as draw into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    document.querySelector("#draw").addEventListener("click", event => {
      event.preventDefault();
      console.log("it worked: draw");
      //Hey axios, get me a single card from the API please.
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/draw/?count=1`
        )
        //Then save the image to state/store so I can use it later.
        .then(response => {
          console.log(response.data.cards);
          state.Game.deck.cardImage0 = response.data.cards[0].image;
          console.log(state.Game.deck.cardImage0);

          //put the card's image on the screen so people can see their cards.
          let cardCreation = document.createElement("img");
          cardCreation.className = "card";
          cardCreation.src = state.Game.deck.cardImage0;
          document.getElementById("playerCards").appendChild(cardCreation);

          //Transform the data I get back into numbers I can use.
          if (response.data.cards[0].value == "ACE") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "JACK") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "QUEEN") {
            state.Game.deck.cardValue0 = 10;
          } else if (response.data.cards[0].value == "KING") {
            state.Game.deck.cardValue0 = 10;
          } else
            state.Game.deck.cardValue0 = parseInt(
              response.data.cards[0].value,
              10
            );

          console.log(typeof state.Game.deck.cardValue0);
          console.log(state.Game.deck.cardValue0);

          //Add the value of a drawn card to the value of your hand so we can play blackjack later.
          console.log(state.Game.deck.handValue);
          state.Game.deck.handValue += state.Game.deck.cardValue0;
          console.log(state.Game.deck.handValue);
        });
    });
  }
}

function stay(st) {
  //If the page is Game, then make the button ID'd as stay into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    document.querySelector("#stay").addEventListener("click", event => {
      event.preventDefault();
      if (state.Game.deck.handValue === 21) {
        document.getElementById("textHolder").innerHTML = "Blackjack";
      } else if (
        state.Game.deck.handValue == state.Game.deck.computerHandValue
      ) {
        document.getElementById("textHolder").innerHTML = "Tie";
      } else if (
        state.Game.deck.handValue > state.Game.deck.computerHandValue &&
        state.Game.deck.handValue <= 21
      ) {
        document.getElementById("textHolder").innerHTML = "You Win";
      } else if (state.Game.deck.handValue > 21) {
        document.getElementById("textHolder").innerHTML = "You Busted";
      } else if (
        state.Game.deck.handValue < state.Game.deck.computerHandValue &&
        state.Game.deck.computerHandValue <= 21
      ) {
        document.getElementById("textHolder").innerHTML = "You Lose";
      }

      //Then remove cards from the page and reset hand values so we can play a new round.
      document.getElementById("playerCards").innerHTML = "";
      document.getElementById("aiCards").innerHTML = "";
      document.getElementById("aiText").innerHTML = "";
      document.getElementById("playerText").innerHTML = "";

      state.Game.deck.handValue = 0;
      state.Game.deck.computerHandValue = 0;
    });
  }
}

function shuffle(st) {
  //If the page is Game, then make the button ID'd as draw into a button that does a thing when clicked. Console.log to show that it worked.
  if (st.page === "Game") {
    document.querySelector("#shuffle").addEventListener("click", event => {
      event.preventDefault();
      //use Axios to send the get request to make it shuffle our chosen deck and send a response.
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${state.Game.deck.deck_id}/shuffle/
          `
        )
        .then(response => console.log(response));
      //Then remove cards from the page so we can play a new round.
      document.getElementById("playerCards").innerHTML = "";
    });
  }
}

router
  .on({
    "/": () => render(state.Home),
    ":page": params => render(state[capitalize(params.page)])
  })
  .resolve();
