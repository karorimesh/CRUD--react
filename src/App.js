import React from "react";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Users from "./Components/Users";

class App extends React.Component{
    
    

    render(){
        const api = 'https://crudcrud.com/api/ca7e07ff426c4902aba5dd3d9cd13e4b';
        // const characters = [
        //     {
        //         name: 'John',
        //         job: 'Developer'
        //     },
        //     {
        //         name: 'Jane',
        //         job: 'Designer'
        //     }
        // ];

        return(
            // <Table characterData = {characters}/>
            <div>
                <Users api = {api}/>
                <Create api = {api}/>
                <Profile api = {api}/>
            </div>            
        )
    }
}

export default App;