import React from "react";
import './profile.css';

class Profile extends React.Component {
    render() {
        return (
            <div className="profileWrapper" style={{
                opacity: this.props.view ? "1" : "0",
                display: this.props.view ? "flex" : "none",
                transform: this.props.view ? "translateY(0vh)": "translateY(-100vh)"
            }}>
                <button onClick={this.props.hide} id="closeProfile"> Close </button>
                <h2> {this.props.user.firstName+ " "+this.props.user.lastName} </h2>
                <img src={this.props.user.avatar} alt={this.props.user.firstName} />
                <h4>Email: {this.props.user.email} </h4>
                <h4>Contact Number: {this.props.user.contactNumber} </h4>
                <h4>Date of Birth: {this.props.user.DOB}</h4>
            </div>
        )
    }
}

export default Profile;