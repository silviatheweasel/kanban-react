import React from "react";
import "./AddList.css";

export class AddList extends React.Component {

    handleChange(event) {
        const input = event.target.value;
        this.props.handleNameUpdate(input);
    }

    handleClick() {
        if (this.props.listName !== "") {
            this.props.handleListNameSave(this.props.listName);
            // document.getElementById("btn" + this.props.category).className = "addBtn";
        } else {
            return;
        }
    }

    render() {
        return (<div>
                    <div className="newListContainer"> 
                                            
                        <input  name="newListInput"
                                className="newListInput"
                                type="text"
                                placeholder="Enter list title..."                              
                                maxLength="100"
                                value={this.props.listName} 
                                autoFocus     
                                onChange={this.handleChange.bind(this)}
                                // onInput={this.handleInput.bind(this)}
                                // onKeyUp={this.handleEnter.bind(this)}                       
                                >
                        </input>

                        <div className="buttons">
                            <button className="saveBtn"
                                    onClick={this.handleClick.bind(this)}
                                    >Add List</button>
                            <button className="cancelBtn"
                                    ><i className="fas fa-times fa-lg"></i></button>
                        </div>

                    </div>
        </div>)
    }

};