import React from 'react';
import Register from './register';
import Login from './login';
import './parent.css'
var userId=0;
var errorString={
  firstName: "Between 3 to 20 characters",
  lastName: "Between 3 to 25 characters",
  email: "Invalid Email Address",
  pw: "Weak Password",
  confirmPw: "Passwords Mismatch",
  DOB: "Please enter a Valid Date",
  contactNumber: "Must contain 10 numbers"
}
var initialErrors= {
    firstName: "",
    lastName: "",
    email: "",
    pw: "",
    confirmPw: "",
    DOB: "",
    contactNumber: ""
}
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          users: [],
          isLoggingIn: false,
          isValidated: false,
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
        
        this.validateForm=this.validateForm.bind(this);
        this.validateIndividialInputs=this.validateIndividialInputs.bind(this);
        this.setErrorMessages=this.setErrorMessages.bind(this);
      } 
      
      


      setErrorMessages(errorMessages) {
          console.log("Setting Error Message");
          this.setState(()=>({
            errorMessages
          }));
      }
      


      validateIndividialInputs(tempErrorMessages,Regex,inputField) {
        console.log("Validate Individual Inputs");
        if(!Regex.test(this.state[inputField])) {
          this.setErrorMessages(tempErrorMessages);
        }
        else {
          console.log("Else of Individual Inputs is running");
          tempErrorMessages[inputField]="";
          this.setErrorMessages(tempErrorMessages);
        }
      }





      validateForm(inputField) {
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
               console.log("Contact Number type: ",typeof this.state[inputField],", Length: ",this.state[inputField].length);
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
          if(   this.state.errorMessages.firstName===""
             && this.state.errorMessages.lastName===""
             && this.state.errorMessages.email===""
             && this.state.errorMessages.pw===""
             && this.state.errorMessages.confirmPw===""
             && this.state.errorMessages.DOB===""
             && this.state.errorMessages.contactNumber==="") {
               this.setState(()=>({
                 isValidated: true
               }));
             }
      }

      handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            },()=>{
              console.log(this.state[event.target.name]);
              if(!this.state.isLoggingIn) {
                this.validateForm(event.target.name);
              }
            })
        }
    
    
      
      handleSignUp(event) {
        event.preventDefault();
        var isAlreadyRegistered;
        if(this.state.isValidated) {
          if(localStorage.users!==undefined) {
            let existing_users_data=JSON.parse(localStorage.users);
            isAlreadyRegistered=existing_users_data.some(user=> user.email===this.state.email)
          }
          if(isAlreadyRegistered) {
            alert("This email Address is already Registered with us.");
            return;
          }
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
            alert("Signed Up successfully. You can now Log in.");
            this.setState(()=>({
              isLoggingIn: true
            }));
          });
        }
        else {
          alert("Sorry! You can't sign up because form is not validated.");
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
          errorMessages: initialErrors
        }),()=>{
          document.querySelector(".formContainer").classList.remove("loginForm");
        })
      }


    render() {
    return (
        <div className="parent">
            <h2 className="title" id="heading">Login / SignUp </h2>
            <h4 className="title" id="sub-heading">Already Have an Account? <button className="btn formControl" onClick={this.state.isLoggingIn? this.handleFormForSignUp:this.handleForm} > {this.state.isLoggingIn?" Sign Up ": " Log In "} </button></h4>
            {this.state.isLoggingIn
            ?<Login className="register formContainer"
            handleChange={this.handleChange} 
            handleSubmit={this.props.handleLogIn} 
            errorMessages={this.state.errorMessages}
            />
            :
            <Register className="login formContainer"
            handleChange={this.handleChange} 
            handleSubmit={this.handleSignUp} 
            errorMessages={this.state.errorMessages}
            />}
        </div>
        )
    }
}


export default Parent;