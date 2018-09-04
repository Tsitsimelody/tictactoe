import React from "react";
import Picker from "./Picker";
import { expect } from "chai";
import { shallow } from "enzyme";

describe("<Picker />", () => {
  it("renders a title", () => {
    const wrapper = shallow(<Picker />);
    expect(wrapper.find("h4").text()).equal(" Pick a selector ");
  });

  it("renders an `.picks`", () => {
    const wrapper = shallow(<Picker />);
    expect(wrapper.find(".picks")).to.have.lengthOf(1);
  });
});
