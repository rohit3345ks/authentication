import React from 'react';


class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome {JSON.parse(localStorage.currentUser).firstName} </h1>
                <br />
                <button className="btn" onClick={this.props.handleLogOut}> LogOut </button>
            </div>
        )
    }
}


export default Home;