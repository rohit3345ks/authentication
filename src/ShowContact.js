import React from 'react';
import './showContact.css';
class ShowContact extends React.Component {
    
    render() {
        console.log(this.props.contact);
        return (
        <div className="chatWrapper" style={{
            background: "url('/whatsappBackground.png')"
        }}>
            <div className="contactDetail">
                <div className="contactWrapper">
                    <div className="contactAvatarWrapper">
                        <img src={this.props.contact.contactImageURL} alt={this.props.contact.contactName} />
                    </div>
                    <div className="contactName">
                        <h3>{this.props.contact.contactName}</h3>
                    </div>
                </div>
            </div>
            <div className="chatBox">

            </div>
            <div className="chatInputBoxWrapper">
                <div className="inputIconWrapper">
                    <img src="/smileyIcon.svg" alt="Smiley" /> 
                </div>
                <div className="inputIconWrapper">
                    <img src="/attachment.svg" alt="Attachment" /> 
                </div>
                <input type="text" placeholder="Type your message..." />
                <div className="inputIconWrapper">
                    <img src="/send.svg" alt="Send" /> 
                </div>
            </div>
        </div> 
        )
    }
}

export default ShowContact;