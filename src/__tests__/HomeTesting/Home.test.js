import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  queryByLabelText,
  screen,
  getByText,
} from "@testing-library/react";
import Home from "../../pages/Home/Home";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });

// Test Suite for Home Page
describe("Home: Component Test", () => {
  // Test 1 : Home: Renders the page without errors"
  test("Renders text without errors", () => {
    // Setup Testing Fixture
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Test 1.1: Checking to see if the greeting in the home page is displayed
    const greeting = screen.queryByText("What gift are you looking for today?");
    expect(greeting).toBeInTheDocument();

    // Test 1.2: Checking to see if unwanted text is not displayed to the home page
    const rude_remark = screen.queryByText("We don't have gifts for you!?");
    expect(rude_remark).not.toBeInTheDocument();
  });

  // Test 2 Search button can be clicked
  test("Renders Login Button Correctly", () => {
    //Texting Fixture
    let wrapper = shallow(<Home />);
    wrapper.find('input[type="text"]').simulate("keypress", { key: "Enter" });
    const ANS = screen.getByText(
      "Please select a way to search in the dropdown menu above."
    );
    console.log(wrapper);

    // Test 2.1: Changing input bar value and checking to see if it worked
    wrapper
      .find('input[type="text"]')
      .simulate("change", { target: { name: "typedInput", value: "user" } });
    expect(wrapper.state("typedInput")).toEqual("user");
    wrapper.find('input[type="text"]').simulate("keypress", { key: "Enter" });

    // Test 2.?: Checking to see if unwanted text is not displayed to the home page
    let reminder = screen.queryByText("Sign In");
    expect(reminder).not.toBeInTheDocument();

    wrapper.find('input[type="text"]').simulate("keypress", { key: "Enter" });
    wrapper.find('input[type="text"]').simulate("keypress", { key: "Enter" });

    expect(wrapper.find("select").props().value).toBe("Select a way to search");
    wrapper.find("select").props().value = "Search by username/email";
    expect(wrapper.find("select").props().value).toBe("Select a way to search");
    // Test 2.2:
    // wrapper = shallow(<Home />);
    // wrapper.find('input[type="text"]').simulate("change", {
    //   target: { name: "randomInput", value: "user" },
    // });
    // expect(wrapper.state("typedInput")).toEqual("user");

    //wrapper.find('input[type="text"]').simulate("keypress", { key: "Enter" });
  });
});
