import React from "react";
import { FaBomb } from "react-icons/fa";
import "./home.scss";
import { useNavigate } from "react-router-dom";
import { GiUnlitBomb } from "react-icons/gi";

const rules = [
  "🐱 Cat Card: Draw a cute cat card, and it's simply whisked away from the deck.",
  "💣 Exploding Kitten Card: Encounter a bomb, and it's game over unless you have a defuse card!",

  "🙅‍♂️ Defuse Card: Use this card strategically to defuse a bomb and keep the game going.",

  "🔀 Shuffle Card: Shake things up by shuffling the deck and starting anew.",
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="packer">
        <div className="title">
          <h1>
            Welcome to <span>Explode Kittens</span>: The Online Card Game
          </h1>
          <p>
            <GiUnlitBomb />
          </p>
        </div>

        <div className="intro">
          <h3>Introduction: </h3>
          <p>
            Are you ready for an adrenaline-pumping adventure? Welcome to
            Exploding Kittens, the online single-player card game that will keep
            you on the edge of your seat! Test your luck and strategy as you
            navigate through a deck filled with quirky cards, each with its own
            unique ability.
          </p>
        </div>

        <div className="object">
          <h3>Game Objective:</h3>
          <p>
            Your objective is simple: Draw all 5 cards from the deck without
            encountering an exploding kitten! But beware, one wrong move and
            BOOM! You'll be greeted by a furry explosion.
          </p>
        </div>

        <div className="gameRules">
          <h3>Game Rules:</h3>
          <ul className="rules">
            {rules.map((r, i) => (
              <li key={i}>
                <p>{r}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate("/game")}
          type="button"
          className="playButton"
        >
          <p>Play</p>
          <GiUnlitBomb />
        </button>
      </div>
    </div>
  );
};

export default Home;
