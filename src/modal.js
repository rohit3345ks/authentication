import React from "react";
import './modal.css';

class Modal extends React.Component {
    render() {
        return (
            <div className="modalWrapper" style={{
                opacity: this.props.view ? "1" : "0",
                display: this.props.view ? "flex" : "none",
                transform: this.props.view ? "translateY(0vh)": "translateY(-100vh)"
            }}>


                <div className="modalHeader">
                    Add New Contact
                    <button onClick={this.props.hide} id="closeModal"> Close </button>
                </div>


                <div className="modalBody">
                    <form className="modalForm" onSubmit={this.props.addContact} >
                        
                        <label className="modalInput">
                            <span className="modalInputLabel"> Name: </span>
                            <input type="text" name="contactName" placeholder="Enter Contact Name" 
                                onChange={this.props.handleChange}
                                /> 
                        </label>


                        <label className="modalInput">
                            <span className="modalInputLabel"> Image URL: </span>
                            <input type="url" name="contactImageURL" placeholder="e.g. https://url/..." 
                                onChange={this.props.handleChange} /> 
                        </label>

                        <button className="modalFormSubmit"> Add User </button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;