// A simple table displaying the users
import React, {Component, useState} from "react";
import ApiUtil from "./ApiUtil";

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
                <td><button onClick={Users.editUser(user.user_id)}>Edit</button></td>
                <td><button onClick={deleteUser(user._id)}>Delete</button></td>
            </tr>
        )
    })
    return(
        <tbody>
            {users}
        </tbody>
    )
}

// Function to update a user


// Delete a user from their user Id
function deleteUser(id){
    fetch(ApiUtil.api + '/' + id,{
        method:'DELETE'
    }).then((res) => {
        if(res.status === 200){
            alert('deletion successfull');
        }
    });
}

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            user : {},
            toUpdate : false,
            isUpdated : false,
            users : [],
            IsDataAvailable : false
        }
        this.editUser = this.editUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount(){
        fetch(this.props.api)
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                users : json,
                IsDataAvailable : true
            });
        })

        
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    submitForm(username, age, colour, id) {
        // Do submit actions
        fetch(this.props.api + '/' + id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: username,
                age: age,
                colour: colour
            }),
        }).then(res => {
            if (res.status === 200) {
                this.setState({ isUpdated: true });
            }
        })

    }

    editUser(id){
        
        fetch(ApiUtil.api + '/' + id,{
            method:'GET'
        }).then((res) => {
            if(res.status === 200){
                res.json();
            }
        }).then((json) => {
            this.setState({
                user : json,
                toUpdate : true
            })
        });
    
    }

    submitEditedUser


    render() { 
        const {IsDataAvailable, users, user, toUpdate, isUpdated} = this.state;
        
        if(!IsDataAvailable){
            return(
                <div><p>Please wait/ Check API {ApiUtil.api}</p></div>
            )
        }

        return (
            <div>
                <h1>Users Table</h1>
                <table>
                    <TableHeader/>
                    <TableBody usersList = {users}/>
                </table>

                {toUpdate ?
                    <div>
                        <h1>Update Page</h1>
                        <form onSubmit={e => {
                            e.preventDefault();
                            this.submitForm(user.name, user.age, user.colour, user._id);
                        }}>
                            <input placeholder="Name" name="username" value={user.name} onChange={this.handleChange} /><br />
                            <input placeholder="Age" name="age" type="number" value={user.age} onChange={this.handleChange} /><br />
                            <input placeholder="Favourite Color" name="colour" value={user.colour} onChange={this.handleChange} /><br />
                            <button type="submit" >Create</button>
                            {isUpdated ?
                                <div>
                                    <p>User Updated successfully </p>
                                    {this.setState({
                                        toUpdate: false
                                    })}
                                    {this.componentDidMount()}
                                </div>
                                :
                                <p>Failed to update</p>
                            }
                        </form>
                    </div> :
                    <p>No such user/ problem with API</p>
                }

                {this.props.children}
            </div>
        );
    }
}
 
export default Users;