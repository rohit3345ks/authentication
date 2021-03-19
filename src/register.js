import React from 'react';
import './parent.css';
class Register extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <form className="formContainer" onSubmit={this.props.handleSubmit}>
                <label className="inputContainer">
                    <span className="label"> First Name: </span>
                    <input required placeholder="First Name*" name="firstName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['firstName']}</span>
                <label className="inputContainer">
                    <span className="label">Last Name:  </span>
                    <input required placeholder="Last Name*" name="lastName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['lastName']}</span>
                <label className="inputContainer">
                    <span className="label">Email:  </span>
                    <input required placeholder="Email Address*" name="email" type="email" value={this.props.value} onChange={this.props.handleChange} />                     
                </label>
                <span className="error">{this.props.errorMessages['email']}</span>
                <label className="inputContainer">
                    <span className="label">Password:  </span>
                    <input required placeholder="Password*" name="pw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['pw']}</span>
                <label className="inputContainer">
                    <span className="label">Confirm Password:  </span>
                    <input required placeholder="Re-Enter Password" name="confirmPw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['confirmPw']}</span>
                <label className="inputContainer">
                    <span className="label">Date of Birth:  </span>
                    <input required placeholder="" name="DOB" type="date" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['DOB']}</span>
                <label className="inputContainer">
                    <span className="label">Contact Number:  </span>
                    <input required placeholder="Phone Number" name="contactNumber" type="tel" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['contactNumber']}</span>
                <input className="btn signUp" type="submit" value="Sign Up" />
            </form>
        )
    }
}


export default Register;