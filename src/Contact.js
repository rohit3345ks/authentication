import React from 'react';
import './contact.css';

class Contact extends React.Component {
    render() {
        return (
            <div className="contact" onClick={()=>this.props.select(this.props.index) } >
                <div className="contactAvatarWrapper">
                    <img src={this.props.imgSrc} alt={this.props.name} />
                </div>
                <div  className="contactName">
                    <h4>{this.props.name}</h4>
                </div>
                <div className="dashbtn" id="deletebtn" onClick={(event)=>this.props.delete(event,this.props.index)} >
                    <img src="/delete.svg" alt="Delete Contact" />
                </div>
            </div>
        );
    }
}

export default Contact;