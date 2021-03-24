import React from 'react';
import './dashboard.css';
import Modal from './modal';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            contactName: "",
            contactImageURL: "",
            viewModal: false,
            contacts: {}
        }
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.addContact=this.addContact.bind(this);
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    addContact(event) {
        var tempContacts;
        var userTempContacts;
        var tempContactsKeys;
        event.preventDefault();
        let currentUser=JSON.parse(localStorage.currentUser);
        if(localStorage.contacts===undefined) {
            localStorage.setItem("contacts",JSON.stringify({
                [currentUser.email]: []
            }));
        }
        else{
            tempContacts=JSON.parse(localStorage.contacts);
            tempContactsKeys=Object.keys(tempContacts);
            if(tempContactsKeys.includes(currentUser.email)) {
                userTempContacts=tempContacts[currentUser.email];
            }
            else {
                tempContacts[currentUser.email]=[];
                userTempContacts=tempContacts[currentUser.email];
            }
        }
        tempContacts=JSON.parse(localStorage.contacts);
        userTempContacts=tempContacts[currentUser.email];
        console.log("Previous Contacts: ",userTempContacts);
        let tempContact={
            contactName: this.state.contactName,
            contactImageURL: this.state.contactImageURL
        }
        userTempContacts.push(tempContact);
        tempContacts[currentUser.email]=userTempContacts;
        localStorage.setItem("contacts",JSON.stringify(tempContacts))
        console.log("After Pushing (userTempContacts): ",userTempContacts);
    }
    componentDidMount() {
        document.querySelector(".application").classList.add("dashboardWrapper");
    }
    render() {
        return ( 
            <div className="dashboard">
                <div className="chatListWrapper">
                    <div className="userDetail">
                        <div className="userWrapper">
                            <div className="avatarWrapper">
                                <img src="/user-solid.svg" alt="user" />
                            </div>
                        </div>
                        <button className="addUser" onClick={this.showModal} > <img src="/plus-circle-solid.svg" alt="Add User" /> </button>
                        <button className="logOut" onClick={this.props.handleLogOut}> <img src="/logout.svg" alt="Log Out" /> </button>
                    </div>
                    <div className="chatList">
                        
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
                </div>
            </div>
        )
    }
}


export default Dashboard;