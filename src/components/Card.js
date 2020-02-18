import React from "react";
import Mask from "./Mask";

const Card = ({
  name,
  cost,
  length,
  speed,
  crew,
  passengers,
  capacity,
  hyperdrive,
  reveal
}) => (
  <div>
    <h3>{name}</h3>
    <ul>
      <li>
        Cost: <Mask reveal={reveal}>{cost}</Mask>
      </li>
      <li>
        Length: <Mask reveal={reveal}>{length}</Mask>
      </li>
      <li>
        Speed: <Mask reveal={reveal}>{speed}</Mask>
      </li>
      <li>
        Crew: <Mask reveal={reveal}>{crew}</Mask>
      </li>
      <li>
        Passengers: <Mask reveal={reveal}>{passengers}</Mask>
      </li>
      <li>
        Capacity: <Mask reveal={reveal}>{capacity}</Mask>
      </li>
      <li>
        Hyperdrive: <Mask reveal={reveal}>{hyperdrive}</Mask>
      </li>
    </ul>
  </div>
);

Card.defaultProps = {
  name: "Name",
  costInCredits: 0,
  length: 0,
  speed: 0,
  crew: 0,
  passengers: 0,
  capacity: 0,
  hyperdrive: 0,
  reveal: false,
  winner: false
};

export default Card;
