import React from 'react';

class Login extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <label>
                    Email: 
                    <input name="email" type="email" value={this.props.email} onChange={this.props.handleChange} /> 
                </label>
                <br />
                <label>
                    Password: 
                    <input name="pw" type="password" value={this.props.value} onChange={this.props.handleChange} /> 
                </label> <br />
                
                <input type="submit" value="Log In" />
            </form>
        )
    }
}


export default Login;