import React from 'react';
import './App.css';
import './App.css';
import Dashboard from './Dashboard';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { Switch, Route, withRouter } from 'react-router-dom';

var errorString={
  firstName: "Between 3 to 20 characters",
  lastName: "Between 3 to 25 characters",
  email: "Invalid Email Address",
  pw: "Weak Password",
  confirmPw: "Passwords Mismatch",
  DOB: "Please enter a Valid Date",
  contactNumber: "Must contain 10 numbers"
}
if(localStorage.users===undefined) localStorage.setItem("users",JSON.stringify([]));
var initialErrors= {
    firstName: "",
    lastName: "",
    email: "",
    pw: "",
    confirmPw: "",
    DOB: "",
    contactNumber: ""
}
var today=new Date();
var minDate;
var maxDate;
if(today.getMonth()<10) {
  minDate=today.getFullYear()-50+"-0"+(today.getMonth()+1)+"-"+today.getDate();
  maxDate=today.getFullYear()-18+"-0"+(today.getMonth()+1)+"-"+today.getDate();
}
else {
  minDate=today.getFullYear()-40+"-"+(today.getMonth()+1)+"-"+today.getDate();
  maxDate=today.getFullYear()-18+"-"+(today.getMonth()+1)+"-"+today.getDate();
}
//The Parent Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoggedIn: false,
      isLoggingIn: false,
      isValidated: false,
      firstName: "",
      lastName: "",
      email: "",
      pw: "",
      confirmPw: "",
      DOB: "",
      contactNumber: "",
      avatarURL: "",
      errorMessages: {
        firstName: "",
        lastName: "",
        email: "",
        pw: "",
        confirmPw: "",
        DOB: "",
        contactNumber: ""
      },
      currentUser: {}
    }
    this.handleLogIn=this.handleLogIn.bind(this);
    this.handleLogOut=this.handleLogOut.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleSignUp=this.handleSignUp.bind(this);
    this.handleForm=this.handleForm.bind(this);
    this.handleFormForSignUp=this.handleFormForSignUp.bind(this);
    this.validateForm=this.validateForm.bind(this);
    this.validateIndividialInputs=this.validateIndividialInputs.bind(this);
    this.setErrorMessages=this.setErrorMessages.bind(this);
  }

  setErrorMessages(errorMessages) {
    this.setState(()=>({
      errorMessages
    }));
}



validateIndividialInputs(tempErrorMessages,Regex,inputField) {
  if(!Regex.test(this.state[inputField])) {
    this.setErrorMessages(tempErrorMessages);
  }
  else {
    tempErrorMessages[inputField]="";
    this.setErrorMessages(tempErrorMessages);
  }
}





validateForm(inputField) {
  if(!this.state.isLoggingIn) {
  let tempErrorMessages=JSON.parse(JSON.stringify(this.state.errorMessages));  
  switch(inputField) {
      case "firstName":
        var firstNameRegex=/^[A-Za-z]{3,20}$/g;
        if(this.state[inputField].length===0) {
          tempErrorMessages[inputField]="First name cannot be empty";
        }
        else if(this.state[inputField].includes(" ")) {
          tempErrorMessages[inputField]="Space is not allowed";
        }
        else if((/(?=.*\d)/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Digits are not allowed";
          
        }
        else {
          tempErrorMessages[inputField]="Between 3 to 20 characters"
        }
        this.validateIndividialInputs(tempErrorMessages,firstNameRegex,inputField);
      break;
      case "lastName":
        var lastNameRegex=/^[A-Za-z]{3,25}$/g;
        if(this.state[inputField].length===0) {
          tempErrorMessages[inputField]="Last name cannot be empty";
        }
        else if(this.state[inputField].includes(" ")) {
          tempErrorMessages[inputField]="Space is not allowed";
        }
        else if((/(?=.*\d)/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Digits are not allowed";
        }
        else { 
          tempErrorMessages[inputField]="Between 3 to 25 characters";
        }
        this.validateIndividialInputs(tempErrorMessages,lastNameRegex,inputField);
      break;
      case "email":
        var emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state[inputField].length===0) {
          tempErrorMessages[inputField]="Email Field Cannot be empty";
        }
        else if(!this.state[inputField].includes("@")) {
          tempErrorMessages[inputField]="Please include '@' in the email";
        }
        else if(!this.state[inputField].includes(".")) {
          tempErrorMessages[inputField]="Please include '.' in the email";
        }
        else if(this.state[inputField].includes("..")) {
          tempErrorMessages[inputField]="Consecutive dots are not allowed";
        }
        else if(this.state[inputField].startsWith("@") || this.state[inputField].startsWith(".") || this.state[inputField].endsWith("@") || this.state[inputField].endsWith(".")) {
          tempErrorMessages[inputField]="'@' or '.' not allowed at beginning or end";
        }
        else if(this.state[inputField].split('.')[this.state[inputField].split('.').length-1].length<2) {
          tempErrorMessages[inputField]="Please enter a valid domain";
        }
        else if([...(this.state[inputField].match(/@/g)|| [])].length>1) {
          tempErrorMessages[inputField]="Only one '@' allowed";
        }
        else {
          tempErrorMessages[inputField]="Invalid Email Address"
        }
        this.validateIndividialInputs(tempErrorMessages,emailRegex,inputField);
      break;
      case "pw":
        var pwRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
        if(this.state[inputField].length===0) {
          tempErrorMessages[inputField]="Password cannot be empty";
        }
        else if(!(/(?=.*\d)/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Please include atleast one digit";
        }
        else if(!(/(?=.*[a-z])/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Please include atleast one lowercase letter";
        }
        else if(!(/(?=.*[A-Z])/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Please include atleast one uppercase letter";
        }
        else if(!(/(?=.*[!@#$%^&*])/g.test(this.state[inputField]))) {
          tempErrorMessages[inputField]="Pleae include atleast one special Character/Symbol";
        }
        else if(this.state[inputField].length<8) {
          tempErrorMessages[inputField]="Minimum length 8 characters"
        }
        else {
          tempErrorMessages[inputField]="Please use a stronger password";
        }
        this.validateIndividialInputs(tempErrorMessages,pwRegex,inputField);
      break;
      case "confirmPw":
        if(this.state.pw!==this.state.confirmPw) {
          tempErrorMessages[inputField]=errorString[inputField];
          this.setState(()=>({
            errorMessages: tempErrorMessages
          }))
        } 
        else {
          tempErrorMessages[inputField]="";
          this.setState(()=>({
            errorMessages: tempErrorMessages
          }));
        }
      break;
      case "DOB":
        let tempDate=new Date(this.state.DOB+"Z");
        let currentDate=new Date();
        let ageInDays=(currentDate-tempDate)/(24*60*60*1000);
        if(ageInDays<6574.5) {
          tempErrorMessages[inputField]=errorString[inputField];
          this.setState(()=>({
            errorMessages: tempErrorMessages
          }));
        } 
        else {
          tempErrorMessages[inputField]="";
          this.setState(()=>({
            errorMessages: tempErrorMessages
          }));
        }
      break;
      case "contactNumber":
         var isContactNumberValid;
         if(this.state[inputField].length===0) {
           tempErrorMessages[inputField]="Contact Number cannot be empty";
           isContactNumberValid=false;
         }
         else if(this.state[inputField].length!==10) {
           tempErrorMessages[inputField]="Contact number must be of 10 digits";
           isContactNumberValid=false;
         }
         else if(/([0-9])\\1*/.test(this.state[inputField])) {
           tempErrorMessages[inputField]="All digits should not be same";
           isContactNumberValid=false;
         }
         else {
           isContactNumberValid=true;
           tempErrorMessages[inputField]="";
         }
         if(!isContactNumberValid) {
         this.setState(()=>({
          errorMessages: tempErrorMessages
        }))
        }
        else {
          tempErrorMessages[inputField]="";
          this.setState(()=>({
            errorMessages: tempErrorMessages
          }));
        }
      break;
      default:
      break;
    }
  }
    
}

handleChange(event) {
      this.setState({
          [event.target.name]: event.target.value
      },()=>{
        if(!this.state.isLoggingIn) {
          this.validateForm(event.target.name);
        }
      })
  }



handleSignUp(event) {
  event.preventDefault();
  var isAlreadyRegistered;
  if((this.state.errorMessages.firstName==="" 
       && this.state.errorMessages.lastName==="" 
       && this.state.errorMessages.email==="" 
       && this.state.errorMessages.pw==="" 
       && this.state.errorMessages.confirmPw==="" 
       && this.state.errorMessages.DOB==="" 
       && this.state.errorMessages.contactNumber==="") &&
       (this.state.firstName!=="" && this.state.lastName!=="" && this.state.email!=="" && this.state.pw!=="" 
       && this.state.confirmPw!=="" && this.state.DOB!=="" && this.state.contactNumber!=="")) {
         this.setState(()=>({
           isValidated: true
         }),()=>{
           console.log("True: ",this.state.isValidated);
           console.log(this.props.history);
           if(localStorage.users!==undefined) {
            let existing_users_data=JSON.parse(localStorage.users);
            isAlreadyRegistered=existing_users_data.some(user=> user.email===this.state.email);
          }
          if(isAlreadyRegistered) {
            alert("This email Address is already Registered with us.");
            return;
          }
          let user={
            userID: JSON.parse(localStorage.users).length,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            pw: this.state.pw,
            DOB: this.state.DOB,
            avatarURL: this.state.avatarURL,
            contactNumber: this.state.contactNumber
          }
          let tempusers=JSON.parse(localStorage.users);
          tempusers.push(user);
          event.target.reset();
            localStorage.setItem("users",JSON.stringify(tempusers));
            alert("Signed Up successfully. You can now Log in.");
            console.log(JSON.parse(localStorage.users));
            this.setState(()=>({
              isLoggingIn: true
            }),()=>{
              this.props.history.push('/user/login');
            });
         });
       }
      else {
        this.setState(()=>({
          isValidated: false
        }),()=>{
          console.log("False: ",this.state.isValidated);
          alert("Sorry! You can't sign up because form is not validated.");
        });
        return;
      }
}




handleForm() {
  this.setState((state)=>({
    isLoggingIn: true,
    errorMessages: initialErrors
  }),()=>{
    document.querySelector(".formContainer").classList.add("loginForm");
  })
}



handleFormForSignUp() {
  this.setState(()=>({
    isLoggingIn: false,
    isValidated: false,
    errorMessages: initialErrors
  }),()=>{
    document.querySelector(".formContainer").classList.remove("loginForm");
  })
}
  handleLogIn(event) {
    event.preventDefault();
      let existing_users_data=JSON.parse(localStorage.users);
      let currentUserIndex=Number.MIN_VALUE;
      let isAuthenticated=existing_users_data.some((user,index)=>{
        currentUserIndex=index;
        return user.email=== event.target.email.value && user.pw === event.target.pw.value
      });
      if(isAuthenticated) {
        localStorage.setItem("currentUser",JSON.stringify(existing_users_data[currentUserIndex]));
        
        console.log(`User Authentication: ${isAuthenticated?"Successful":"Unsuccessful"}`);  
        this.setState(()=>({
          isLoggedIn: true,
          currentUser: existing_users_data[currentUserIndex]
        }),()=>{
          console.log("Currentuser: ",this.state.currentUser);
        });
        
        this.props.history.push('/dashboard');
      }
      else {
        alert("Sorry! Invalid Email or Password. You cannot log in. :(");
      }
  }

  handleLogOut() {
    localStorage.setItem("currentUser","");
    document.querySelector(".application").classList.remove("dashboardWrapper");
    this.setState(()=>({
      isLoggedIn: false
    }));

    this.props.history.push("/user/login");
  }
  render() {
    return (
      <div className="application">
        {/* <Router> */}
          <Switch>
            <Route path='/dashboard'>
              <Dashboard 
              isLoggedIn={this.state.isLoggedIn} 
              user={this.state.currentUser} 
              handleLogOut={this.handleLogOut} />
            </Route>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path="/user/login">
              <Login className="formContainer"
                handleChange={this.handleChange} 
                handleSubmit={this.handleLogIn} 
                backToSignUp={this.handleFormForSignUp}
              />
            </Route>
            <Route path="/user/register">
              <Register className="formContainer"
                handleChange={this.handleChange} 
                handleSubmit={this.handleSignUp} 
                errorMessages={this.state.errorMessages}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Route>
          </Switch>
      </div>
    )
  }
}

 
export default withRouter(App);
