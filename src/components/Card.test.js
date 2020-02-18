import React from "react";
import Card from "./Card";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});
