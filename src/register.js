import React from 'react';

class Register extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    First Name: 
                    <input name="firstName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                    <span>{this.props.errorMessages['firstName']}</span>
                </label> <br />
                <label>
                    Last Name: 
                    <input name="lastName" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                <label>
                    Email: 
                    <input name="email" type="email" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <br />
                <label>
                    Password: 
                    <input name="pw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                <label>
                    Confirm Password: 
                    <input name="confirmPw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                <label>
                    Date of Birth: 
                    <input name="DOB" type="date" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                <label>
                    Contact Number: 
                    <input name="contactNumber" type="text" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                <input type="submit" value="Sign Up" />
            </form>
        )
    }
}


export default Register;