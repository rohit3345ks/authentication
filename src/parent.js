import React from 'react';
import Register from './register';
import Login from './login';
var userId=0;
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          users: [],
          isLoggedIn: false,
          isLoggingIn: false,
          firstName: "",
          lastName: "",
          email: "",
          pw: "",
          confirmPw: "",
          DOB: "",
          contactNumber: "",
          errorMessages: {
            firstName: "",
            lastName: "",
            email: "",
            pw: "",
            confirmPw: "",
            DOB: "",
            contactNumber: ""
          }
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSignUp=this.handleSignUp.bind(this);
        this.handleForm=this.handleForm.bind(this);
        this.handleFormForSignUp=this.handleFormForSignUp.bind(this);
        this.handleLogIn=this.handleLogIn.bind(this);
        this.validateForm=this.validateForm.bind(this);
        this.setErrorMessages=this.setErrorMessages.bind(this);
      } 
      
      
      
      setErrorMessages(errorMessages) {
          this.setState(()=>({
            errorMessages
          }));
      }
      
      validateForm() {
          var firstNameRegex=/^[A-Za-z ]{5,20}$/;
          var lastNameRegex=/^[A-Za-z]{5,25}$/;
          let tempErrorMessages=JSON.parse(JSON.stringify(this.state.errorMessages));
          
          
          
          if(!firstNameRegex.test(this.state.firstName) || this.state.firstName.trim().length<=0) {
            tempErrorMessages.firstName="First Name must be between 5 to 20 Characters.";
            this.setErrorMessages(tempErrorMessages);
          }
          else {
            tempErrorMessages.firstName="";
            this.setErrorMessages(tempErrorMessages);
          }
          
          if(!lastNameRegex.test(this.state.lastName) || this.state.firstName.trim().length<=0) {
            tempErrorMessages.lastName="Last Name must be between 5 to 20 Characters.";
            this.setErrorMessages(tempErrorMessages);
          }
        
      }

      handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            },()=>{
              this.validateForm();
            })
        }
    
    
      
      handleSignUp(event) {
        event.preventDefault();
        let user={
          userID: userId++,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          pw: this.state.pw,
          DOB: this.state.DOB,
          contactNumber: this.state.contactNumber
        }
        let tempusers=JSON.parse(JSON.stringify(this.state.users));
        tempusers.push(user);
        this.setState(()=> ({
          users: tempusers
        }),()=>{
          localStorage.setItem("users",JSON.stringify(this.state.users));
          console.log(JSON.parse(localStorage.users));
        });
      }

      handleLogIn(event) {
        event.preventDefault();
        let existing_users_data=JSON.parse(localStorage.users);
        let currentUserIndex=Number.MIN_VALUE;
        let isAuthenticated=existing_users_data.some((user,index)=>{
          currentUserIndex=index;
          return user.email===this.state.email && user.pw === this.state.pw
        });
        localStorage.setItem("currentUser",JSON.stringify(existing_users_data[currentUserIndex]));
        console.log(localStorage.currentUser);
        if(isAuthenticated) {
          console.log(`User Authentication: ${isAuthenticated?"Successful":"Unsuccessful"}`)  
          this.setState({
            isLoggedIn: true
          })
        }
      }
    
      
      handleForm() {
        this.setState({
          isLoggingIn: true
        })
      }
      


      handleFormForSignUp() {
        this.setState(()=>({
          isLoggingIn: false
        }))
      }


    render() {
    return (
        <div>
            <h2>Login / SignUp </h2>
            <h4>Already Have an Account? <button onClick={this.state.isLoggingIn? this.handleFormForSignUp:this.handleForm} > {this.state.isLoggingIn?" Sign Up ": " Log In "} </button></h4>
            {this.state.isLoggingIn
            ?<Login 
            handleChange={this.handleChange} 
            handleSubmit={this.handleLogIn} 
            errorMessages={this.state.errorMessages}
            />
            :
            <Register 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSignUp} 
            errorMessages={this.state.errorMessages}
            />}
        </div>
        )
    }
}


export default Parent;