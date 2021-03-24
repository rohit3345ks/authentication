import React from "react";
import './modal.css';
class Modal extends React.Component {
    render() {
        return (
            <div className="modalWrapper" style={{
                opacity: this.props.view ? "1" : "0",
                display: this.props.view ? "flex" : "none"
            }}>
                <div className="modalHeader">
                    Add New Contact
                    <button onClick={this.props.hide} id="closeModal"> Close </button>
                </div>
                <div className="modalBody">
                    <form className="modalForm">
                        <label className="modalInput">
                            <span className="modalInputLabel"> Name: </span>
                            <input type="text" placeholder="Enter Contact Name" /> 
                        </label>
                        <label className="modalInput">
                            <span className="modalInputLabel"> Image URL: </span>
                            <input type="text" placeholder="e.g. https://......." /> 
                        </label>
                        <button className="modalFormSubmit"> Add User </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Modal;