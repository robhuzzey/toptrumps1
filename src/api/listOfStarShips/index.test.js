import listOfStarShips, { CDATA } from "./";
import normalise from "./normalise";

jest.mock("./normalise", () => ({
  __esModule: true, // this property makes it work
  default: jest.fn(() => {
    return [{}];
  })
}));

describe("listOfStarShips", () => {
  it("should return an array", async () => {
    const list = await listOfStarShips(CDATA.results);
    expect(list).toBeDefined();
    expect(list.length).toBe(1);
  }, 20000);

  it("should call the normalise method with expected arguments", async () => {
    await listOfStarShips(CDATA.results);
    expect(normalise).toHaveBeenCalledWith(CDATA.results);
  }, 20000);
});
