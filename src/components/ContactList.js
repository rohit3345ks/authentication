import React from 'react';
import Contact from './Contact';
const ContactList=({contacts,selectContact,deleteContact})=>{
    console.log(contacts);
    return (
        
        contacts.map((contact,index)=>{
        return (
        <React.Fragment key={index}>
            <Contact select={selectContact} delete={deleteContact} index={index} imgSrc={contact.contactImage} name={contact.contactName} />
            <hr />
        </React.Fragment>
        )
    })
    )
}

export default ContactList;