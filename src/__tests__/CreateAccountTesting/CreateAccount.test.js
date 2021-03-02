import React from "react";
import {
    render,
    fireEvent,
    queryByText,
    queryByLabelText,
    screen,
} from "@testing-library/react";
import Create_Account from "../../pages/Create_Account/Create_Account";
import { BrowserRouter } from "react-router-dom";
import { shallow } from 'enzyme';

describe('Testing Create_Account page', () => {
    //test rendering the page
    test("Create_Account: Renders the page without errors", () => {
        // Setup Testing Fixture
        render(
            <BrowserRouter>
                <Create_Account />
            </BrowserRouter>
        );
        
    });
})


