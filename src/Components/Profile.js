// Simple Class component to display the details of a user
import React, {Component} from "react";

const UserProfile = () => {
    return(
        <div>
            <p>Id: </p>
            <p>Name: </p>
            <p>Age: </p>
            <p>Favourite color: </p>
            <button >Edit User</button>
        </div>
    )
}

class Profile extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <h1>Profile Page</h1>
                <UserProfile/>
            </div>
        );
    }
}
 
export default Profile;