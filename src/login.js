import React from 'react';
import './parent.css';
class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <form className="formContainer" onSubmit={this.props.handleSubmit}>
                <label className="inputContainer">
                <span className="label"> Email:  </span>
                    <input required name="email" placeholder="Email Address" type="email" value={this.props.email} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['email']}</span>
                
                <label className="inputContainer">
                <span className="label"> Password:  </span>
                    <input required name="pw" type="password" placeholder="Password" value={this.props.value} onChange={this.props.handleChange} /> 
                </label>
                <span className="error">{this.props.errorMessages['pw']}</span>
                <input className="btn login" type="submit" value="Log In" />
            </form>
        )
    }
}


export default Login;