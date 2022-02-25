import React from "react";
import Create from "./Components/Create";
import Profile from "./Components/Profile";
import Users from "./Components/Users";
import Table from "./Table";

class App extends React.Component{
    

    render(){
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
                <Users/>
                <Create/>
                <Profile/>
            </div>            
        )
    }
}

export default App;