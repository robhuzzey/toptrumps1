import normalise from "./normalise";
describe("normalise", () => {
  const input = {
    count: 37,
    next: "https://swapi.co/api/starships/?page=2",
    previous: null,
    results: [
      {
        name: "Executor",
        model: "Executor-class star dreadnought",
        manufacturer: "Kuat Drive Yards, Fondor Shipyards",
        cost_in_credits: "1143350000",
        length: "19000",
        max_atmosphering_speed: "n/a",
        crew: "279144",
        passengers: "38000",
        cargo_capacity: "250000000",
        consumables: "6 years",
        hyperdrive_rating: "2.0",
        MGLT: "40",
        starship_class: "Star dreadnought",
        pilots: [],
        films: [
          "https://swapi.co/api/films/2/",
          "https://swapi.co/api/films/3/"
        ],
        created: "2014-12-15T12:31:42.547000Z",
        edited: "2017-04-19T10:56:06.685592Z",
        url: "https://swapi.co/api/starships/15/"
      }
    ]
  };

  const output = [
    {
      name: "Executor",
      attributes: {
        cost: 1143350000,
        length: 19000,
        speed: 0,
        crew: 279144,
        passengers: 38000,
        capacity: 250000000,
        hyperdrive: 2
      }
    }
  ];

  it("should convert strings to numbers & filter only needed attributes", () => {
    const result = normalise(input.results);
    expect(result).toStrictEqual(output);
  });
});
