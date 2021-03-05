import React from "react";
import {
    render,
    screen,
} from "@testing-library/react";
import Profile from "../../pages/Profile/Profile";
import { BrowserRouter } from "react-router-dom";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// Testing for editing the username, questionnaire, and wishlist

configure({ adapter: new Adapter() });

describe("Profile testing", () => {

    test("Profile: Renders the page without errors", () => {
        // Setup Testing Fixture
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );

        const username = screen.getByText("Username");
        expect(username).toBeInTheDocument();

        const interests = screen.getByText("Interests");
        expect(interests).toBeInTheDocument();

        const wishlist = screen.getByText("Wishlist");
        expect(wishlist).toBeInTheDocument();
    });
})
