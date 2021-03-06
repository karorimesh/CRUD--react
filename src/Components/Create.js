// A Simple form to perform create operations
import React, {Component} from "react";



class Create extends Component {

    constructor(props){
        super(props);
        this.state = {
            username : 'Someone',
            age : 15,
            colour : 'Pink',
            isCreated : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    

    submitForm(username, age, colour){
        // Do submit actions
    fetch(this.props.api,{
            method : "POST",
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                name : username,
                age : age,
                colour : colour
            }),
        }).then(res => {
            if(res.status === 201){
                this.setState({isCreated : true});
            }
        })        

    }


    render() { 
        var {username, age, colour, isCreated} = this.state;
        
        return (
            <div>
                <h1>Create Page</h1>
                <form onSubmit={e => {
                    e.preventDefault();
                    this.submitForm(username, age, colour);
                }}>
                    <input placeholder="Name" name="username" value={username} onChange = {this.handleChange}/><br />
                    <input placeholder="Age" name="age" type="number" value={age} onChange = {this.handleChange}/><br />
                    <input placeholder="Favourite Color" name="colour" value={colour} onChange = {this.handleChange}/><br />
                    <button type="submit" >Create</button>
                    {isCreated ?
                        <p>User Created successfully</p> :
                        null
                    }
                </form>
            </div>
        );
    }
}
 
export default Create;