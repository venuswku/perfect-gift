import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  queryByLabelText,
  screen,
} from "@testing-library/react";
import Landing from "../../pages/Landing/Landing";
import { BrowserRouter } from "react-router-dom";

// Test for Landing Page
test("Landing: Renders the page without errors", () => {
  // Setup Testing Fixture
  render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );

  // First test: Slogan renders on the page
  const slogan = screen.getByText("Simple and Swift, choose");
  expect(slogan).toBeInTheDocument();

  // Second test: Description renders on the page
  const description = screen.getByText(
    "Surprise your family, friends, and loved ones with ideal gifts from their wishlist."
  );
  expect(description).toBeInTheDocument();

  // Third test: Unwanted text does not render on the page
  const not_slogan = screen.queryByText("Complicated and slow, choose");
  expect(not_slogan).not.toBeInTheDocument();

  // Fourth test: Clicking "Get Started"
  const get_started_button = screen.getByText("Get Started!");
  expect(get_started_button).toBeInTheDocument();
  fireEvent(
    get_started_button,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  // Cleanup Testing Fixure
});
