import React from 'react';
import './dashboard.css';
import Modal from './modal';
import ContactList from './ContactList';
import Nochat from './Nochat';
import Profile from './Profile';
import NoContact from './Nocontact';
import ShowContact from './ShowContact';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            contactName: "",
            contactImage: "",
            viewModal: false,
            viewProfile: false,
            tempContacts: {},
            userTempContacts: [],
            currentUser: JSON.parse(localStorage.currentUser),
            selectedContact: null
        }
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.addContact=this.addContact.bind(this);
        this.showProfile=this.showProfile.bind(this);
        this.hideProfile=this.hideProfile.bind(this);
        this.handleContactSelection=this.handleContactSelection.bind(this);
        this.fetchApiContacts=this.fetchApiContacts.bind(this);
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
        if(event.target.name==="contactImage") {
            console.log(event.target.files[0]);
            var image=event.target.files[0];
            const reader=new FileReader();
            reader.readAsDataURL(image);
            reader.onload=()=>{
            image=reader.result;
            this.setState(()=>({
                    contactImage: image
                }));
            }
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        
    }
    addContact(event) {
        let tempContacts=this.state.tempContacts;
        let userTempContacts=this.state.userTempContacts;
        let currentUser=this.state.currentUser;
        event.preventDefault();
        let tempContact={
            contactName: this.state.contactName,
            contactImage: this.state.contactImage
        }
        userTempContacts.push(tempContact);
        tempContacts[currentUser.email]=userTempContacts;
        localStorage.setItem("contacts",JSON.stringify(tempContacts));
        this.setState(()=>({
            userTempContacts,
            tempContacts,
            viewModal: false
        }));
    }


    handleContactSelection(index) {
        this.setState({
            selectedContact: this.state.userTempContacts[index]
        });
    }


    handleContactDelete(index) {
        let tempContacts=this.state.userTempContacts;
        tempContacts.splice(index,1);
        
    }

        fetchApiContacts=async ()=>{
        let usersResponse=await fetch("https://jsonplaceholder.typicode.com/users");
        let usersData=await usersResponse.json();
        let imageApiResponse=await fetch("https://randomuser.me/api/?results=10");
        let imageApiData=await imageApiResponse.json();
        let ApiContacts=usersData.map((user,index)=>{
            return {
                contactName: user.name,
                contactImage: imageApiData.results[index].picture.thumbnail
            }
        });
        this.setState((state)=>({
            userTempContacts: [...state.userTempContacts,...ApiContacts]
        }));
    }; 

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
                tempContacts[currentUser.email]=[];
                userTempContacts=tempContacts[currentUser.email];
            }
        }
          

        this.fetchApiContacts();

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
                                <img src={this.state.currentUser.avatar} alt={this.state.currentUser.firstName} />
                            </div>
                        </div>
                        <button className="addUser" onClick={this.showModal} > <img src="/plus-circle-solid.svg" alt="Add User" /> </button>
                        <button className="logOut" onClick={this.props.handleLogOut}> <img src="/logout.svg" alt="Log Out" /> </button>
                    </div>
                    <div className="contactList">

                        {this.state.userTempContacts.length===0 ? <Nochat /> : <ContactList contacts={this.state.userTempContacts} selectContact={this.handleContactSelection} /> }
                    </div>
                </div>
                {this.state.selectedContact===null ? <NoContact />: <ShowContact contact={this.state.selectedContact} />}
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