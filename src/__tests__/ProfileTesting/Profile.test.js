import React from "react";
import {
    render,
    fireEvent,
    queryByText,
    queryByLabelText,
    screen,
} from "@testing-library/react";
import Profile from "../../pages/Profile/Profile";
import { BrowserRouter } from "react-router-dom";


test("Sign_In: Renders the page without errors", () => {
    // Setup Testing Fixture
    render(
        <BrowserRouter>
            <Profile />
        </BrowserRouter>
    );
});