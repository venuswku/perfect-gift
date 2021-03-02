import React from "react";
import {
    render,
    fireEvent,
    queryByText,
    queryByLabelText,
    screen,
} from "@testing-library/react";
import Home from "../../pages/Home/Home";
import { BrowserRouter } from "react-router-dom";


test("Home: Renders the page without errors", () => {
    // Setup Testing Fixture
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    );
});