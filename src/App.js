import React, { useEffect, useReducer } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Alert,
  Button,
  ButtonGroup
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import listOfStarShips from "./api/listOfStarShips";
import Card from "./components/Card";

const pickCards = (deck, count = 2) => {
  if (deck.length === 0) return [];
  const mutatedDeck = [...deck];
  const cards = [...Array(count)].map(player => {
    const randomIndex = Math.floor(Math.random() * mutatedDeck.length);
    const card = mutatedDeck.splice(randomIndex, 1)[0];
    return card;
  });
  return { cards, deck: mutatedDeck };
};

const chooseRandomAttribute = attributes => {
  return attributes[Math.floor(Math.random() * attributes.length)];
};

const compare = ({ cards, attribute }) => {
  const player1 = cards[0].attributes[attribute];
  const player2 = cards[1].attributes[attribute];
  if (player1 === player2) return -1;
  return player1 > player2 ? 0 : 1;
};

const defaultState = {
  deck: [],
  cards: [],
  scores: [0, 0],
  winner: null,
  reveal: false,
  playingAttribute: null,
  gameLoaded: false
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_CARDS": {
      const { cards, deck } = pickCards(action.data);
      const playingAttribute = chooseRandomAttribute(
        Object.keys(deck[0].attributes)
      );
      return { ...state, deck, cards, playingAttribute, gameLoaded: true };
    }
    case "NEXT_GAME": {
      const { cards, deck } = pickCards(state.deck);
      const playingAttribute = chooseRandomAttribute(
        Object.keys(cards[0].attributes)
      );
      return {
        ...state,
        reveal: false,
        deck,
        cards,
        playingAttribute,
        winner: null
      };
    }
    case "SET_WINNER": {
      const winner = compare({
        cards: state.cards,
        attribute: state.playingAttribute
      });
      const scores = [...state.scores];
      scores[winner]++;
      return {
        ...state,
        winner,
        scores,
        reveal: true
      };
    }
    case "GAME_OVER": {
      return { ...state, gameOver: true };
    }
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const {
    scores,
    cards,
    deck,
    winner,
    reveal,
    playingAttribute,
    gameLoaded
  } = state;

  const nextGame = () => dispatch({ type: "NEXT_GAME" });
  const findWinner = () => dispatch({ type: "SET_WINNER" });

  useEffect(() => {
    const getData = async () => {
      const ships = await listOfStarShips();
      dispatch({ type: "GET_CARDS", data: ships });
    };
    getData();
  }, []);

  if (!gameLoaded) {
    return <p>...Loading</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          {winner !== null && (
            <Alert variant="success">Player {winner + 1} Wins!</Alert>
          )}
        </Col>
      </Row>
      <Row>
        {cards.map((card, index) => {
          return (
            <Col>
              <p>
                Player {index + 1} score:{" "}
                <Badge variant="success">{scores[index]}</Badge>
              </p>
              <Card
                reveal={reveal}
                name={card.name}
                costInCredits={card.attributes.costInCredits}
                length={card.attributes.length}
                speed={card.attributes.speed}
                crew={card.attributes.crew}
                passengers={card.attributes.passengers}
                capacity={card.attributes.capacity}
                hyperdrive={card.attributes.hyperdrive}
              />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            {deck.length > 0 && winner !== null && (
              <Button onClick={nextGame} variant="outline-primary">
                Next Game
              </Button>
            )}
            {winner === null && (
              <Button onClick={findWinner} variant="outline-success">
                Compare {playingAttribute}
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
