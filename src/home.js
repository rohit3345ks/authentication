import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';
class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <h2 className="title" id="heading"> Login / SignUp </h2>
                <div className="btn-group">
                    <Link to="/user/register">
                            <button className="btn"> Sign Up</button>
                    </Link>
                    <Link to="/user/login">
                            <button className="btn"> Log In </button>
                    </Link>
                </div>
            </div>
        )
    }
}


export default Home;