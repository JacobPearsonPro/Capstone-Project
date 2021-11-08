import html from "html-literal";
const kelvinToFahrenheit = kelvinTemp =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

export default st => html`
  <h3>text</h3>

  <main id="Home">
    <h1>Welcome to my Capstone Project.</h1>
    <p>
      I hope you enjoy the games that you'll find here. Feel free to check back
      occasionally, I might add new games or improve their function as time goes
      by!
    </p>
    <h2>Available Games</h2>
    <ul>
      <li>Blackjack</li>
    </ul>
  </main>
`;
