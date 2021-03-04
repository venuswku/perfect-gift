import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  queryByLabelText,
  screen,
} from "@testing-library/react";
import Landing from "../../pages/Landing/Landing";
import Home from "../../pages/Home/Home";
import { MemoryRouter } from "react-router-dom";

// Test for Landing Nav Bar
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

// Test for Logo Nav Bar
test("LogoNavBar", () => {
  // // Setup Testing Fixture
  // render(
  //   <MemoryRouter>
  //     <Landing />
  //   </MemoryRouter>
  // );

  // Test that Landing NavBar links to Sign In page
  // expect(screen.getByText('Sign In').closest('a')).toHaveAttribute('href', '/sign_in')

});

// Test for Home Nav Bar
test("HomeNavBar", () => {
  //Setup Testing Fixture
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  //Test that Home NavBar links to respective pages
  expect(screen.getByText('Find Gift').closest('a')).toHaveAttribute('href', '/home')
  expect(screen.getByText('My Profile').closest('a')).toHaveAttribute('href', '/profile')
  expect(screen.getByText('Sign Out').closest('a')).toHaveAttribute('href', '/')

  //Add Test that Sign Out Calls SignOut FUnction?

  //Add test that clicking logo goes to /home?

});