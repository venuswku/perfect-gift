import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  queryByLabelText,
  screen,
} from "@testing-library/react";
import Landing from "../../pages/Landing/Landing";
import { MemoryRouter } from "react-router-dom";

// Test for Landing Page
test("LandingNavBar", () => {
  // Setup Testing Fixture
  render(
    <MemoryRouter>
      <Landing />
    </MemoryRouter>
  );

  // Test that Landing NavBar links to Sign In page
  expect(screen.getByText('Sign In').closest('a')).toHaveAttribute('href', '/sign_in')

});
