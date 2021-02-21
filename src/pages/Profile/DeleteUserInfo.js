import React, {Fragment} from 'react';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import './DeleteUserInfo.css'
import axios from 'axios';

class DeleteUserInfo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            item: this.props.info
        };
        this.DeleteSpecifiedInfo = this.DeleteSpecifiedInfo.bind(this);
        
    };

    // Generic way to delete from a specified table (Wishlist, Questionnaire, etc)
    DeleteSpecifiedInfo() {
        console.log(this.state)
         let serverPath = `http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/deleteItem/?item=${this.state.item}`
         console.log(`We are going to delete ${this.props.info}`)
         axios.delete(serverPath, [this.state]).then(res => {
            console.log("Frontend [SUCCESS]: Deleted Wishlist item")
            // call get request to see changes to wishlist items
            axios.get(`http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/getwishlist/${this.state.username}`, [this.state])
            .then(res => {
                console.log("Frontend [SUCCESS]: We have received the user's wishlist")
                console.log(res.data)
                console.log(res.data[0].gift)
                this.setState({wlresponse: res.data[0].gift})
                console.log(this.state.wlresponse)
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
                <DeleteButton className="shake" onClick ={this.DeleteSpecifiedInfo} />
            </Fragment>
        );
    };

};

export default DeleteUserInfo;