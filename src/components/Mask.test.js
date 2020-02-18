import React from "react";
import Mask from "./Mask";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Mask />).toJSON();
  expect(tree).toMatchSnapshot();
});
