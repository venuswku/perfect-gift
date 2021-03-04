import React from "react";
import {
    render,
    fireEvent,
    queryByText,
    queryByLabelText,
    screen,
} from "@testing-library/react";
import Sign_In from "../../pages/Sign_In/Sign_In";
import { BrowserRouter } from "react-router-dom";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Sign_In page test', () => {

    //check if page has all the words we expect it to have
    test("Sign_In: Renders the page without errors", () => {
        //render the Sign_In page
        render(
            <BrowserRouter>
                <Sign_In />
            </BrowserRouter>
        );

        const signin = screen.getByText("Sign In");
        expect(signin).toBeInTheDocument();

        const description = screen.getByText("Get personalized gift suggestions and share your own gift wishlist!");
        expect(description).toBeInTheDocument();

        const login_button = screen.getByLabelText("userInput");
        expect(login_button).toBeInTheDocument();

    });

    let wrapper;
    //test the username textbox
    test('username check', async () => {
        wrapper = shallow(<Sign_In />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'sobyrne' } });
        expect(wrapper.state('username')).toEqual('sobyrne');
    })
    //test the password textbox
    it('password check', () => {
        wrapper = shallow(<Sign_In />);
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'userpassword', value: 'sean' } });
        expect(wrapper.state('password')).not.toEqual('');
    })

    //test click submit with correct username + password
    it('login check with right data', () => {
        wrapper = shallow(<Sign_In />);
        wrapper.find('input[type="text"]').simulate('change', { target: { name: 'username', value: 'sobyrne' } });
        wrapper.find('input[type="password"]').simulate('change', { target: { name: 'userpassword', value: 'sean' } });
        wrapper.find('input[type="submit"]').simulate('click');
        expect(wrapper.state('wrongPassword')).toBe("");
    })

})



