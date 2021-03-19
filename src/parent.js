import React from 'react';
import Register from './register';
import Login from './login';
import './parent.css'
var userId=0;
var errorString={
  firstName: "Between 3 to 20 characters.",
  lastName: "Between 3 to 20 characters.",
  email: "Invalid Email Address",
  pw: "Min. 8 chacters long including atleast one uppercase, lowercase, number and Symbol.",
  confirmPw: "Passwords Mismatch.",
  DOB: "Please enter a Valid Date.",
  contactNumber: "Must contain 10 numbers."
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
          this.setState(()=>({
            errorMessages
          }));
      }
      


      validateIndividialInputs(tempErrorMessages,Regex,inputField) {
        if(!Regex.test(this.state[inputField]) || this.state[inputField].trim().length<=0) {
          tempErrorMessages[inputField]=errorString[inputField];
          this.setErrorMessages(tempErrorMessages);
          return false;
        }
        else {
          tempErrorMessages[inputField]="";
          this.setErrorMessages(tempErrorMessages);
          return true;
        }
      }





      validateForm(inputField) {
        let tempErrorMessages=JSON.parse(JSON.stringify(this.state.errorMessages));  
        let isFormValidated=false;
        switch(inputField) {
            case "firstName":
              var firstNameRegex=/^[A-Za-z ]{3,20}$/g;
              isFormValidated=this.validateIndividialInputs(tempErrorMessages,firstNameRegex,inputField);
            break;
            case "lastName":
              var lastNameRegex=/^[A-Za-z]{3,25}$/g;
              isFormValidated=this.validateIndividialInputs(tempErrorMessages,lastNameRegex,inputField);
            break;
            case "email": 
              var emailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
              isFormValidated=this.validateIndividialInputs(tempErrorMessages,emailRegex,inputField);
            break;
            case "pw":
              var pwRegex=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
              // var pwRegex=/[A-Za-z0-9@#$%^&*!]{8,}/g;
              isFormValidated=this.validateIndividialInputs(tempErrorMessages,pwRegex,inputField);
            break;
            case "confirmPw":
              if(this.state.pw!==this.state.confirmPw) {
                tempErrorMessages[inputField]=errorString[inputField];
                this.setState(()=>({
                  errorMessages: tempErrorMessages
                }))
                isFormValidated=false;
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
                isFormValidated=false;
              } 
              else {
                tempErrorMessages[inputField]="";
                this.setState(()=>({
                  errorMessages: tempErrorMessages
                }));
              }
            break;
            case "contactNumber":
               let contactNumberRegex=/(((\+){1}91){1})?[98765]{1}[0-9]{9}/g;
               isFormValidated=this.validateIndividialInputs(tempErrorMessages,contactNumberRegex,inputField);
            break;
            default:
            break;
          }
          this.setState(()=>({
            isValidated: isFormValidated
          }))
          
          
      }

      handleChange(event) {
            this.setState({
                [event.target.name]: event.target.value
            },()=>{
              this.validateForm(event.target.name);
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
            console.log("Sign Up Data from Local Storage: ",JSON.parse(localStorage.users));
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