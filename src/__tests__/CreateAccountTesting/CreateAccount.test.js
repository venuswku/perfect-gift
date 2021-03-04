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
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios'; //for mock axios calls
configure({ adapter: new Adapter() });


//here are the tests
describe('Create_Account page testing', () => {
    // Adapter.configure({adapter: new Adapter()})
    let wrapper;
    // const mockfn = jest.fn;
    //check if page has the words we expect it to have
    test("Create_Account: Renders the page without errors", () => {
        // render the page
        render(
            <BrowserRouter>
                <Create_Account />
            </BrowserRouter>
        );
        const createaccount = screen.getByText("Create an Account");
        expect(createaccount).toBeInTheDocument();

        const firstname = screen.getByLabelText("firstname");
        expect(firstname).toBeInTheDocument();

    });

    //test the firstname textbox
    test('testing single field: first name', () => {
        wrapper = shallow(<Create_Account />);
        wrapper.find('input[type="text"]').first().simulate('change', { target: { name: 'firstname', value: 'Kelsy' } });
        expect(wrapper.state('firstname')).toEqual('Kelsy');
    })

    // //test email textbox
    test('testing single field: email', () => {
        wrapper = shallow(<Create_Account />);
        wrapper.find('input[type="email"]').simulate('change', { target: { name: 'useremail', value: 'kelsy@mail.com' } });
        expect(wrapper.state('useremail')).toEqual('kelsy@mail.com');
    })

    // //test if create_account works as expected
    test('correct Create_Account: check', async () => {
        wrapper = shallow(<Create_Account />);
        //do wrapper.find for all the required fields + some q responses
        wrapper.find('input[type="text"]').first().simulate('change', { target: { name: 'firstname', value: 'Kelsy' } });
        wrapper.find('input[type="text"]').first().simulate('change', { target: { name: 'lastname', value: 'Lee' } });
        wrapper.find('input[type="email"]').simulate('change', { target: { name: 'useremail', value: 'kelsy@mail.com' } });
        wrapper.find('input[type="text"]').first().simulate('change', { target: { name: 'username', value: 'kelsy' } });
        wrapper.find('input[type="password"]').first().simulate('change', { target: { name: 'userpassword', value: 'kelsy' } });
        wrapper.find('input[type="password"]').first().simulate('change', { target: { name: 'verifypassword', value: 'kelsy' } });
        wrapper.find('input[type="submit"]').simulate('click');

        //user has an input for all the requrired fields and has pressed the submit button 
        //i think to check if the output is correct, you would have to do a mock?

    })

})


