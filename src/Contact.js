import React from 'react';
import './contact.css';

class Contact extends React.Component {
    render() {
        console.log(`this.props.select: ${this.props.select} this.props.index: ${this.props.index}`);
        return (
            <div className="contact" onClick={()=>this.props.select(this.props.index) } >
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