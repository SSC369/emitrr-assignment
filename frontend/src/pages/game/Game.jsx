import React, { useEffect, useRef, useState } from "react";
import "./game.scss";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import card from "../../assets/card.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { MdOutlineReplay } from "react-icons/md";
import Cookies from "js-cookie";
import { BsArrowRepeat } from "react-icons/bs";
import Loader from "../../components/loader/Loader";

const cardTypes = ["kitten", "defuse", "shuffle", "bomb"];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Game = () => {
  const [cardCount, setCardCount] = useState(5);
  const [defuseCards, setDefuseCards] = useState(0);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("playing");
  const jwtToken = Cookies.get("kittenToken");
  const navigate = useNavigate();
  const cardCountRef = useRef(cardCount);
  const defuseCardsRef = useRef(defuseCards);
  const gameStatusRef = useRef(status);

  const loadGameState = async () => {
    setLoading(true);
    const host = `${import.meta.env.VITE_SERVER}/game/loadGame`;
    try {
      const res = await axios.get(host, {
        headers: {
          Authorization: jwtToken,
        },
      });

      const { data } = res;
      if (res.status === 200) {
        setCardCount(data.gameState.cardCount);
        setDefuseCards(data.gameState.defuseCards);
      }
    } catch (error) {
      toast.error(error.response.data.message, { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGameState();
  }, []);

  const uploadScore = async () => {
    const host = `${import.meta.env.VITE_SERVER}/api/leaderboard/addscore`;

    try {
      await axios.post(
        host,
        {},
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
    } catch (error) {
      toast.error(error.response.data.message, { duration: 1000 });
    }
  };

  const handleCard = async () => {
    const num = getRandomNumber(0, 3);
    const card = cardTypes[num];

    setCardCount((prevCount) => {
      const count = prevCount - 1;
      //win case
      if (count === 0 && card !== "shuffle") {
        gameStatusRef.current = "completed";
        uploadScore();
      }
      return count;
    });

    if (card === "shuffle") {
      setCardCount(5);
    } else if (card === "defuse") {
      setDefuseCards((prevDefuse) => prevDefuse + 1);
    } else if (card === "bomb") {
      setDefuseCards((prevDefuse) => {
        let count = prevDefuse;
        //lost case
        if (count <= 0 && card === "bomb") {
          gameStatusRef.current = "completed";
          console.log(gameStatusRef);
        }
        count -= 1;
        return count;
      });
    }

    setType(card);
  };

  useEffect(() => {
    cardCountRef.current = cardCount;
  }, [cardCount]);

  useEffect(() => {
    defuseCardsRef.current = defuseCards;
  }, [defuseCards]);

  const saveAction = async () => {
    const host = `${import.meta.env.VITE_SERVER}/game/saveAction`;
    try {
      await axios.post(
        host,
        {
          cardCount: cardCountRef.current,
          defuseCards: defuseCardsRef.current,
          status: gameStatusRef.current,
        },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
    } catch (error) {
      toast.error(error.response?.data.message, { duration: 1000 });
    }
  };

  useEffect(() => {
    return () => {
      saveAction();
    };
  }, []);

  const cards = [];
  for (let i = 0; i <= cardCount - 1; i++) {
    cards.push(
      <li onClick={handleCard} key={i}>
        <img className="card" src={card} />
      </li>
    );
  }

  const resultTitle = (t) => {
    if (t === "kitten") {
      return (
        <>
          <h1>{"Cat Card 😼"}</h1>
          <p>You've made a friendly feline friend! Meow!</p>
        </>
      );
    } else if (t === "bomb") {
      return (
        <>
          <h1>{"Bomb Card 💣"}</h1>
          <p>Uh-oh! Brace yourself for a furry explosion!</p>
        </>
      );
    } else if (t === "defuse") {
      return (
        <>
          <h1>{"Defuse Card 🙅‍♂️"}</h1>
          <p>You've found a lifeline - a Defuse Card to save you from bombs!</p>
        </>
      );
    } else {
      return (
        <>
          <h1>{"Shuffle Card 🔀"}</h1>
          <p>Time to mix things up! Shuffle the deck and start anew!</p>
        </>
      );
    }
  };

  const resultCard = (t) => {
    if (t === "kitten") {
      return "😼";
    } else if (t === "bomb") {
      return "💣";
    } else if (t === "defuse") {
      return "🙅‍♂️";
    } else {
      return "🔀";
    }
  };

  return (
    <>
      <div className="game">
        {loading ? (
          <Loader />
        ) : (
          <div className="packer">
            {cardCount === 0 && type !== "bomb" ? (
              <div className="success">
                <h1>Congratulations !</h1>
                <div className="card">🎉</div>
                <p>
                  Well done! You've successfully drawn all cards from the deck
                  and completed the game.
                </p>
                <h4 onClick={() => navigate("/leaderboard")}>
                  View Leaderboard
                </h4>

                <div
                  onClick={() => {
                    saveAction();
                    setCardCount(5);
                    setDefuseCards(0);
                    setType("");
                  }}
                  className="replay"
                >
                  <p>Replay</p>
                  <MdOutlineReplay className="" />
                </div>
              </div>
            ) : (
              <>
                <h1>Pick a card</h1>
                <ul className="cards">{cards}</ul>
              </>
            )}
          </div>
        )}
      </div>

      {type.length > 0 && (
        <div className="modal">
          {defuseCards < 0 && type === "bomb" ? (
            <div style={{ border: "2px solid crimson" }} className="cardResult">
              <div className="cardTitle">{resultTitle(type)}</div>
              <button
                onClick={() => navigate("/")}
                className="repeatButton"
                type="button"
              >
                <BsArrowRepeat />
              </button>
              <div style={{ boxShadow: "0px 0px 20px red" }} className="card">
                {resultCard(type)}
              </div>
              <p>You Lost :(</p>

              <div
                onClick={() => {
                  saveAction();
                  setCardCount(5);
                  setDefuseCards(0);
                  setType("");
                }}
                className="replay"
              >
                <p>Replay</p>
                <MdOutlineReplay />
              </div>
            </div>
          ) : (
            <div className="cardResult">
              <div className="cardTitle">{resultTitle(type)}</div>

              <button
                onClick={() => {
                  setType("");
                }}
                className="closeButton"
                type="button"
              >
                <IoCloseOutline />
              </button>
              <div className="card">{resultCard(type)}</div>
              {type === "bomb" && (
                <p className="defuseMessage">
                  Defuse card saved you from explosion{" :)"}
                </p>
              )}
              <p className="defuse">Defuse Cards: {defuseCards}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Game;
