import React from 'react';


class NoContact extends React.Component {
    render() {
        return (
            <div className="chatWrapper" style={{
                background: "url('/WhatsAppBackgroundNoChat.png')",
                backgroundPosition: "50%"
            }}>
            </div> 
        )
    }
}

export default NoContact;