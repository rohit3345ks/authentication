import React from 'react';
import './dashboard.css';
import Modal from './modal';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            contactName: "",
            contactImageURL: "",
            viewModal: false
        }
        this.showModal=this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
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
    addContact() {

    }
    componentDidMount() {
        document.querySelector(".application").classList.add("dashboardWrapper");
    }
    render() {
        
        return (
            <>
                <button onClick={this.showModal} > Add User </button>
                {this.state.viewModal ? <div className="backDrop" onClick={this.hideModal}></div> : null }
                    <Modal view={this.state.viewModal} hide={this.hideModal} />
                
            </>
            // <div className="dashboard">
            //     <div className="chatListWrapper">
            //         <div className="userDetail">
            //             <div className="userWrapper">
            //                 <div className="avatarWrapper">
            //                     <img src="/user-solid.svg" alt="user" />
            //                 </div>
            //             </div>
            //             <button className="logOut" onClick={this.props.handleLogOut}> <img src="/logout.svg" alt="Log Out" /> </button>
            //         </div>
            //         <div className="chatList">
                        
            //         </div>
            //     </div>
            //     <div className="chatWrapper">
            //         <div className="contactHeader">

            //         </div>
            //         <div className="chatInputBox">

            //         </div>
            //     </div> 
            // </div>
        )
    }
}


export default Dashboard;