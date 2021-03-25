import Contact from './Contact';
const ContactList=({contacts})=>{
    return (
        contacts.map((contact,index)=>{
        return (
        <>
            <Contact key={index} imgSrc={contact.contactImageURL} name={contact.contactName} />
            <hr />
        </>
        )
    })
    )
}

export default ContactList;