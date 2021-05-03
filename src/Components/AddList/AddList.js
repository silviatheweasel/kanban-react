import React from "react";

export class AddList extends React.Component {

    handleChange(event) {
        const input = event.target.value;
        this.props.handleNameUpdate(input);
    }

    handleClick() {
        if (this.props.listName !== "") {
            this.props.handleListNameSave(this.props.listName);
        } else {
            return;
        }
    }

    handleEnter(event) {
        const inputName = event.target.value;
        if (event.keyCode === 13 && inputName !== "") {
        this.props.handleEnter(inputName);
        }
    }

    handleCancel() {
        this.props.cancelAddList();
    }

    render() {
        return (<div className="board"> 
                                            
                        <input  name="newListInput"
                                className="newListInput"
                                type="text"
                                placeholder="Enter list title..."                              
                                maxLength="100"
                                value={this.props.listName} 
                                autoFocus
                                autoComplete="off"     
                                onChange={this.handleChange.bind(this)}
                                onKeyUp={this.handleEnter.bind(this)}                       
                                >
                        </input>

                        <div className="buttons">
                            <button className="saveBtn"
                                    onClick={this.handleClick.bind(this)}
                                    >Add List</button>
                            <button className="cancelBtn"
                                    onClick={this.handleCancel.bind(this)}
                                    ><i className="fas fa-times fa-lg"></i></button>
                        </div>

                </div>)
    }

};