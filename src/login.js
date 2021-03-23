import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="formContainer">
                <h2 className="title" id="heading">Login / SignUp </h2>
                <h3>New User? 
                    <Link to="/user/register">
                        <button className="btn" onClick={this.props.backToSignUp}> Sign Up </button>
                    </Link>
                </h3>
                <form className="formBox loginForm" onSubmit={this.props.handleSubmit}>
                    <label className="inputContainer">
                    <span className="label"> Email:  </span>
                        <input required name="email" placeholder="Email Address" type="email" value={this.props.email} onChange={this.props.handleChange} /> 
                    </label>
                    
                    <label className="inputContainer">
                    <span className="label"> Password:  </span>
                        <input required name="pw" type="password" placeholder="Password" value={this.props.value} onChange={this.props.handleChange} /> 
                    </label>
                    <input className="btn login" type="submit" value="Log In" />
                </form>
            </div>
        )
    }
}


export default Login;