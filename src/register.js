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
                    <input required autoComplete="off" placeholder="First Name*" name="firstName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['firstName']}</span>
                <label className="inputContainer">
                    <span className="label">Last Name:  </span>
                    <input required autoComplete="off" placeholder="Last Name*" name="lastName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['lastName']}</span>
                <label className="inputContainer">
                    <span className="label">Email:  </span>
                    <input required autoComplete="off" placeholder="Email Address*" name="email" type="email" value={this.props.value} onChange={this.props.handleChange} />                     
                </label>
                <span className="error">{this.props.errorMessages['email']}</span>
                <label className="inputContainer">
                    <span className="label">Password:  </span>
                    <input required autoComplete="off" placeholder="Password*" name="pw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['pw']}</span>
                <label className="inputContainer">
                    <span className="label">Confirm Password:  </span>
                    <input required autoComplete="off" placeholder="Re-Enter Password" name="confirmPw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['confirmPw']}</span>
                <label className="inputContainer">
                    <span className="label">Date of Birth:  </span>
                    <input required autoComplete="off" name="DOB" type="date" min="2013-10-01" max="2013-10-20" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['DOB']}</span>
                <label className="inputContainer">
                    <span className="label">Contact Number:  </span>
                    <input required autoComplete="off" placeholder="Phone Number" name="contactNumber" type="number" value={this.props.value} onChange={this.props.handleChange} /> 
                    
                </label>
                <span className="error">{this.props.errorMessages['contactNumber']}</span>
                <input className="btn signUp" type="submit" value="Sign Up" />
            </form>
        )
    }
}


export default Register;