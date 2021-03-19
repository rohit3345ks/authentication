import React from 'react';
import './App.css';
import Parent from './parent';
import Home from './home';



//The Parent Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoggedIn: false
    }
    this.handleLogIn=this.handleLogIn.bind(this);
    this.handleLogOut=this.handleLogOut.bind(this);
  }


  handleLogIn(event) {
    event.preventDefault();
      let existing_users_data=JSON.parse(localStorage.users);
      let currentUserIndex=Number.MIN_VALUE;
      let isAuthenticated=existing_users_data.some((user,index)=>{
        currentUserIndex=index;
        console.log("user.email: ",user.email);
        console.log("event.target.email.value: ",event.target.email.value);
        console.log("user.pw: ",user.pw);
        console.log("event.target.pw.value: ",event.target.pw.value);
        return user.email=== event.target.email.value && user.pw === event.target.pw.value
      });
      console.log("isAuthenticated: ",isAuthenticated);
      if(isAuthenticated) {
        localStorage.setItem("currentUser",JSON.stringify(existing_users_data[currentUserIndex]));
        console.log(`User Authentication: ${isAuthenticated?"Successful":"Unsuccessful"}`);  
        this.setState({
          isLoggedIn: true
        })
      }
  }

  handleLogOut() {
    localStorage.setItem("currentUser","");
    this.setState(()=>({
      isLoggedIn: false
    }))
  }
  render() {
    return (
      <div className="application">
        {this.state.isLoggedIn?<Home handleLogOut={this.handleLogOut}/>:<Parent handleLogIn={this.handleLogIn}/>}
      </div>
    )
  }
}

 
export default App;
