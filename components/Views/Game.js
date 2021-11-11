import html from "html-literal";
export default st => html`
  <main id="Game">
    <h2>Instructions are at the bottom of the page</h2>
    <div class="cardArea">
      <div class="blackjackCardText" id="aiText"></div>
      <div class="cards" id="aiCards"></div>
    </div>
    <h1 class="textHolder" id="textHolder"></h1>

    <div class="cardArea">
      <div class="blackjackCardText" id="playerText"></div>
      <div class="cards" id="playerCards"></div>
    </div>

    <div class="buttonHolder">
      <div class="button" id="startingHand">
        <p>Starting Hand</p>
      </div>
      <div class="button" id="draw">
        <p>Hit</p>
      </div>
      <div class="button" id="stay">
        <p>Stay</p>
      </div>
      <div class="button" id="shuffle">
        <p>Shuffle</p>
      </div>
    </div>

    <h3>
      Instructions: Click the Starting Hand button to draw your initial hand.
      Click the Hit button to draw another card, or click the Stay button when
      you're okay with the cards in your hand. Click the Shuffle button to
      shuffle all drawn cards back into the deck for a new game. Clicking
      anywhere after the initial hands are drawn to have the computer check its
      hand, and then draw if needed.
    </h3>
    <h4>
      Your goal is to get the value of your hand as close to 21 as you can, but
      watch out! If your hand is worth more than 21 points you bust and
      automatically lose. Should you be closer to 21 than the AI's hand, you
      win. If they go over 21, well they just busted so you win there too.
    </h4>
    <h5>
      Aces are currently worth 11, as I haven't yet yet written up the if/else
      chain to make them worth 1 or 11 according to your desire or the face
      cards presence.
    </h5>
    <h5>
      Face cards are the Jack, Queen, and King, and they're all worth 10 points.
    </h5>
  </main>
`;
