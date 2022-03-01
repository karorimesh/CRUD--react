import React from "react";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Users from "./Components/Users";

class App extends React.Component{
    
    

    render(){
        const api = 'https://crudcrud.com/api/aacee7d4ec2742cabe99daafddb3904b/users';        

        return(
            <div>
                <Users api = {api}/>
                <Create api = {api}/>
            </div>            
        )
    }
}

export default App;