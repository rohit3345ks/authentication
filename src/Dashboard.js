import React from 'react';
import './dashboard.css';
import Modal from './modal';
import ContactList from './ContactList';
import Nochat from './Nochat';
import Profile from './Profile';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            contactName: "",
            contactImageURL: "",
            viewModal: false,
            viewProfile: false,
            tempContacts: {},
            userTempContacts: [],
            currentUser: JSON.parse(localStorage.currentUser)
        }
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.addContact=this.addContact.bind(this);
        this.showProfile=this.showProfile.bind(this);
        this.hideProfile=this.hideProfile.bind(this);
    }

    showModal() {
        this.setState(()=>({
            viewModal: true
        }))
    }
    hideModal() {
        this.setState(()=>({
            viewModal: false
        }))
    }


    showProfile() {
        this.setState(()=>({
            viewProfile: true
        }))
    }
    hideProfile() {
        this.setState(()=>({
            viewProfile: false
        }))
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    addContact(event) {
        let tempContacts=this.state.tempContacts;
        let userTempContacts=this.state.userTempContacts;
        let currentUser=this.state.currentUser;
        event.preventDefault();
        let tempContact={
            contactName: this.state.contactName,
            contactImageURL: this.state.contactImageURL
        }
        userTempContacts.push(tempContact);
        tempContacts[currentUser.email]=userTempContacts;
        localStorage.setItem("contacts",JSON.stringify(tempContacts));
        this.setState(()=>({
            userTempContacts,
            tempContacts,
            viewModal: false
        }));
        console.log("After Pushing (userTempContacts): ",JSON.parse(localStorage.contacts));
    }


    
    componentDidMount() {
        document.querySelector(".application").classList.add("dashboardWrapper");
        var tempContacts;
        var userTempContacts;
        var tempContactsKeys;
        var currentUser=JSON.parse(localStorage.currentUser);
        if(localStorage.contacts===undefined) {
            localStorage.setItem("contacts",JSON.stringify({
                [currentUser.email]: []
            }));
            tempContacts=JSON.parse(localStorage.contacts);
            userTempContacts=tempContacts[currentUser.email];
        }
        else{
            tempContacts=JSON.parse(localStorage.contacts);
            tempContactsKeys=Object.keys(tempContacts);
            if(tempContactsKeys.includes(currentUser.email)) {

                userTempContacts=tempContacts[currentUser.email];
            }
            else {
                console.log("Contacts are there. but user is not in contacts list");
                console.log("currentUser.email: ",currentUser.email);
                tempContacts[currentUser.email]=[];
                userTempContacts=tempContacts[currentUser.email];
            }
        }
        this.setState(()=>({
            tempContacts,
            userTempContacts,
            currentUser
        }));
    }


    render() {
        return ( 
            <div className="dashboard">
                <div className="contactListWrapper">
                    <div className="userDetail">
                        <div className="userWrapper">
                            <div className="avatarWrapper" onClick={this.showProfile} >
                                <img src={this.state.currentUser.avatarURL} alt={this.state.currentUser.firstName} />
                            </div>
                        </div>
                        <button className="addUser" onClick={this.showModal} > <img src="/plus-circle-solid.svg" alt="Add User" /> </button>
                        <button className="logOut" onClick={this.props.handleLogOut}> <img src="/logout.svg" alt="Log Out" /> </button>
                    </div>
                    <div className="contactList">
                        {this.state.userTempContacts.length===0 ? <Nochat /> : <ContactList contacts={this.state.userTempContacts} /> }
                    </div>
                </div>
                <div className="chatWrapper">
                    <div className="contactHeader">

                    </div>
                    <div className="chatInputBox">

                    </div>
                </div> 
                <div>
                {this.state.viewModal ? <div className="backDrop" onClick={this.hideModal}></div> : null }
                    <Modal 
                    view={this.state.viewModal} 
                    hide={this.hideModal} 
                    handleChange={this.handleChange} 
                    addContact={this.addContact} />

                {this.state.viewProfile ? <div className="backDrop" onClick={this.hideModal}></div> : null }
                    <Profile 
                    user={this.state.currentUser}
                    view={this.state.viewProfile} 
                    hide={this.hideProfile} />
                </div>
            </div>
        )
    }
}


export default Dashboard;