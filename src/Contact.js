import React from 'react';
import './contact.css';

class Contact extends React.Component {
    render() {
        return (
            <div className="contact">
                <div className="contactAvatarWrapper">
                    <img src={this.props.imgSrc} alt={this.props.name} />
                </div>
                <div  className="contactName">
                    <h4>{this.props.name}</h4>
                </div>
            </div>
        );
    }
}

export default Contact;