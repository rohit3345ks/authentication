import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class Register extends React.Component {
    
    render() {
        return (
            <div className="formContainer">
                <h2 className="title" id="heading"> SignUp </h2>
                <h3> Already have an account? 
                    <Link to="/user/login">
                        <button className="btn"> Log In </button>
                    </Link>
                </h3>
                <form className="formBox signUpForm" onSubmit={this.props.handleSubmit}>
                    
                    
                    <label className="inputContainer">
                        <span className="label"> First Name: </span>
                        <input autoComplete="off" placeholder="First Name*" name="firstName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                    </label>
                    <span className="error">{this.props.errorMessages['firstName']}</span>
                    
                    
                    
                    
                    <label className="inputContainer">
                        <span className="label">Last Name:  </span>
                        <input autoComplete="off" placeholder="Last Name*" name="lastName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                    </label>
                    <span className="error">{this.props.errorMessages['lastName']}</span>
                    
                    
                    
                    <label className="inputContainer">
                        <span className="label">Email:  </span>
                        <input autoComplete="false" placeholder="Email Address*" name="email" type="email" value={this.props.value} onChange={this.props.handleChange} />                     
                    </label>
                    <span className="error">{this.props.errorMessages['email']}</span>
                    
                    
                    <label className="inputContainer">
                        <span className="label">Password:  </span>
                        <input autoComplete="off" placeholder="Password*" name="pw" type="password" value={this.props.value} onChange={this.props.handleChange} />
                    </label>
                    <span className="error">{this.props.errorMessages['pw']}</span>
                    
                    
                    
                    <label className="inputContainer">
                        <span className="label">Confirm Password:  </span>
                        <input autoComplete="off" placeholder="Re-Enter Password" name="confirmPw" type="password" value={this.props.value} onChange={this.props.handleChange} />    
                    </label>
                    <span className="error">{this.props.errorMessages['confirmPw']}</span>
                    
                    
                    <label className="inputContainer">
                        <span className="label">Date of Birth:  </span>
                        <input autoComplete="off" placeholder="" name="DOB" type="date" min={this.props.minDate} max={this.props.maxDate} value={this.props.value} onChange={this.props.handleChange} />     
                    </label>
                    <span className="error">{this.props.errorMessages['DOB']}</span>

                    
                    <label className="inputContainer">
                        <span className="label">Avatar Image:  </span>
                        <input id="inputFile" autoComplete="off" accept="image/*" placeholder="Uplaod File" name="avatar" type="file" value={this.props.value} onChange={this.props.handleChange} />     
                    </label>
                    <span className="error">{this.props.errorMessages['avatar']}</span>


                    <label className="inputContainer">
                        <span className="label">Contact Number:  </span>
                        <input autoComplete="off" placeholder="Phone Number" name="contactNumber" type="number" value={this.props.value} onChange={this.props.handleChange} />     
                    </label>
                    <span className="error">{this.props.errorMessages['contactNumber']}</span>


                    <input className="btn signUp" type="submit" value="Sign Up" />
                </form>
            </div>
        )
    }
}


export default Register;