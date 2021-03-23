import React from 'react';
import './dashboard.css';

class Home extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="chatListWrapper">
                    <div className="userDetail">

                    </div>
                    <div className="chatList">

                    </div>
                </div>
                <div className="chatWrapper">
                    <div className="contactHeader">

                    </div>
                    <div className="chatInputBox">

                    </div>
                </div>
                <button className="btn" onClick={this.props.handleLogOut}> LogOut </button>
            </div>
        )
    }
}


export default Home;