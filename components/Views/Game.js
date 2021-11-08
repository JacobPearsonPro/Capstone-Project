import html from "html-literal";

export default st => html`
  <main id="Game">
    <div class="cards" id="aiCards">AI Cards to go here</div>
    <div class="cards" id="playerCards"></div>
    <div class="buttonHolder">
      <div class="button" id="newDeck">
        <p>New Deck</p>
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
  </main>
`;
