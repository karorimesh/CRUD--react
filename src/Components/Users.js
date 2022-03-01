// A simple table displaying the users, update and delete
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

// const TableBody = (props) => {

//     const users = props.usersList.map((user) => {
//         return (
//             <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.age}</td>
//                 <td>{user.colour}</td>
//                 <td><button onClick={e => props.editUser(user._id)} >Edit</button></td>
//                 <td><button onClick = {e => deleteUser(user._id, props.api)}>Delete</button></td>
//             </tr>
//         )
//     })
//     return(
//         <tbody>
//             {users}
//         </tbody>
//     )
// }

// Function to update a user


// Delete a user from their user Id




class Users extends Component {

    constructor(props){
        super(props)
        this.state = {

            id: '',
            name: '',
            age: 0,
            colour: '',
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
                this.setState({
                    isUpdated : true,
                    toUpdate : false 
                 });
            }
        })

    }

    editUser(id){        
        fetch(this.props.api + '/' + id)
        .then((res) => {
            if(res.status === 200){
               return res.json();
            }
        }).then((json) => {
            console.log(json)
            this.setState({
                name : json.name,
                age : json.age,
                colour : json.colour,
                id : json._id,
                toUpdate : true
            })
        });
    
    }

    deleteUser(id){
        fetch(this.props.api + '/' + id,{
            method:'DELETE'
        }).then((res) => {
            if(res.status === 200){
                alert('deletion successfull');
            }
        });
    }


    render() { 
        const {IsDataAvailable, users, toUpdate, isUpdated, name, age, colour, id} = this.state;
        
        if(!IsDataAvailable){
            return(
                <div><p>Please wait/ Check API </p></div>
            )
        }

        return (
            <div>
                <h1>Users Table</h1>
                <table>
                    <TableHeader/>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.colour}</td>
                                    <td><button onClick={e => this.editUser(user._id)} >Edit</button></td>
                                    <td><button onClick={e => this.deleteUser(user._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    
                </table>

                {toUpdate ?
                    <div>
                        <h1>Update Page</h1>
                        <form onSubmit={e => {
                            e.preventDefault();
                            this.submitForm(name, age,colour, id);
                        }}>
                            <input placeholder="Name" name="name" value={name} onChange={this.handleChange} /><br />
                            <input placeholder="Age" name="age" type="number" value={age} onChange={this.handleChange} /><br />
                            <input placeholder="Favourite Color" name="colour" value={colour} onChange={this.handleChange} /><br />
                            <button type="submit" >Update</button>
                            
                        </form>
                        {isUpdated ?
                            <div>
                                <p>User Updated successfully </p>
                                {this.setState({
                                    toUpdate: false
                                })}
                            </div>
                            :
                            null
                        }
                    </div> :
                    null
                }
                
                {this.props.children}
            </div>
        );
    }
}
 
export default Users;