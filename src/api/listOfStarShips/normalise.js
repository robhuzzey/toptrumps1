const normalise = cards => {
  return cards.map(card => {
    return {
      name: card.name,
      attributes: {
        cost: card.cost_in_credits / 1 || 0,
        length: card.length / 1 || 0,
        speed: card.max_atmosphering_speed / 1 || 0,
        crew: card.crew / 1,
        passengers: card.passengers / 1 || 0,
        capacity: card.cargo_capacity / 1 || 0,
        hyperdrive: card.hyperdrive_rating / 1 || 0
      }
    };
  });
};

export default normalise;
