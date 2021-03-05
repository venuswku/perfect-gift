import React, {Fragment} from 'react';
import './DeleteWishlistItem.css';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import axios from 'axios';

class DeleteUserInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: this.props.username,
            item: this.props.info
        };
        this.deleteSpecifiedInfo = this.deleteSpecifiedInfo.bind(this);
        
    };

    // Generic way to delete from a specified table (Wishlist, Questionnaire, etc)
    deleteSpecifiedInfo() {
        console.log(this.state)
         let serverPath = `http://localhost:3010/v0/deleteItem/?item=${this.state.item}`
         console.log(`We are going to delete ${this.props.info}`)
         axios.delete(serverPath, [this.state]).then(res => {
            console.log("Frontend [SUCCESS]: Deleted Wishlist item")
            // call get request to see changes to wishlist items
            axios.get(`http://localhost:3010/v0/getwishlist/${this.state.username}`, [this.state])
            .then(res => {
                console.log('-------------------')
                console.log("Frontend [SUCCESS][DeleteWLItem]: We have received the user's wishlist")
                console.log(res.data)
                console.log(res.data[0].gift)
                console.log(this.state.item)
                this.props.deleteWLItem(this.state.item)
                //this.setState({wlresponse: res.data[0].gift})
                //console.log(this.state.wlresponse)
                console.log('-------------------')
            })
            .catch(err => {
                console.log("Frontend [ERROR]: Retrieving wishlist was unsuccessful.")
                console.log(err)
                this.setState({
                    
                });
            })
         }).catch(err =>{
             console.log("Frontend [ERROR]: Wishlist not deleted.");
             console.log(err)
         })


    };

    render() {
        return(
            <Fragment>
                <DeleteButton className="shake" onClick ={this.deleteSpecifiedInfo} />
            </Fragment>
        );
    };

};

export default DeleteUserInfo;