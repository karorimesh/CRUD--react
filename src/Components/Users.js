// A simple table displaying the users
import React, {Component} from "react";

const TableHeader = () => {
    return(
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Favourite Color</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {

    const users = props.usersList.map((user) => {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.colour}</td>
            </tr>
        )
    })
    return(
        <tbody>
            {users}
        </tbody>
    )
}

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            users : [],
            IsDataAvailable : false
        }
    }

    componentDidMount(){
        fetch("https://crudcrud.com/api/dc0963c770fb4403be8cfaf470ee2da2/users")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                users : json,
                IsDataAvailable : true
            });
        })
    }


    render() { 
        const {IsDataAvailable, users} = this.state;
        
        if(!IsDataAvailable){
            return(
                <div><p>Please wait/ Check API</p></div>
            )
        }

        return (
            <div>
                <h1>Users Table</h1>
                <table>
                    <TableHeader/>
                    <TableBody usersList = {users}/>
                </table>
            </div>
        );
    }
}
 
export default Users;