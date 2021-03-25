import React from 'react';
import Contact from './Contact';
const ContactList=({contacts,selectContact})=>{

    return (
        contacts.map((contact,index)=>{
            console.log(`Contact: ${contact.contactName}, Index: ${index}`);
        return (
        <React.Fragment key={index}>
            <Contact select={selectContact} index={index} imgSrc={contact.contactImage} name={contact.contactName} />
            <hr />
        </React.Fragment>
        )
    })
    )
}

export default ContactList;