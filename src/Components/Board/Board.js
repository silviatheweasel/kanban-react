import React from "react";
import "./Board.css";
import { Card } from "../Card/Card";

export class Board extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = { isClicked: false,
                       newTitle: ""
                     };
    }

    //updates the local state when the button is clicked
    handleAddCard(event) {
        this.setState({ isClicked: true });
        event.target.className = "addBtn hidden";
    }

    //updates the local state when the textarea changes
    updateTaskTitle(event) {
        this.setState({ newTitle: event.target.value });
    }

    //if a new task has been input, passes the title of the new task and its category to the global state
    //updates the local state to reset the textarea
    handleClick() {
        if (this.state.newTitle !== "") {
            this.props.addTask(this.state.newTitle, this.props.category);
            this.setState({newTitle : "",
                           isClicked: false 
                        });
            document.getElementById("btn" + this.props.category).className = "addBtn";
        } else {
            return;
        }
    }

    //resets the local state
    handleCancel(event) {
        this.setState({newTitle : "",
                       isClicked: false 
                      });
        document.getElementById("btn" + this.props.category).className = "addBtn";
    }

    //prevent browser default behavior to allow dropping
    handleDragOver(event) {
        event.preventDefault();
    }
    
    //finds tasks whose tasks match the id passed over from the drag event target
    //then updates the category of these tasks to the current category
    handleDrop(event) {
        let id = event.dataTransfer.getData("text");
        let tasks = this.props.tasks.filter(task => 
           task.title === id);
        for (let i = 0; i < tasks.length; i ++) {
            tasks[i].category = this.props.category;
        }
        this.props.updateDroppedItem(tasks);
    }
    
    //passing the state handler down from App to child component
    changeTaskTitle(oldName, newName, category) {
        this.props.changeTaskTitle(oldName, newName, category);
    }

    //event handler that connects with the function that expands the textarea in App
    handleInput(event) {
        const field = event.target;
        this.props.autoExpand(field);
    }

    //passing the AutoExpand function from App to child component
    autoExpand(field) {
        this.props.autoExpand(field);
    }

    //renders a div with a textarea box and two buttons when the state isClicked is true
    renderNewTaskBox() {
        if (this.state.isClicked) {
            return (<div>
                <textarea name="newTaskInput"
                          placeholder="Enter a title for this card..."
                          className="newTaskInput"
                          rows="3"
                          cols="35"
                          maxLength="200"
                          value={this.state.newTitle} 
                          autoFocus     
                          onChange={this.updateTaskTitle.bind(this)}
                          onInput={this.handleInput.bind(this)}                       
                    >
                </textarea>
                <div className="buttons">
                    <button className="saveBtn"
                            onClick={this.handleClick.bind(this)}>Add Card</button>
                    <button className="cancelBtn"
                            onClick={this.handleCancel.bind(this)}><i className="fas fa-times fa-lg"></i></button>
                </div>               
            </div>)
        }      
    }

    render() {
        let header;

        //get header name based on the category
        switch(this.props.category) {
            case "todo": 
                header = "Tasks To Do";
                break;
            case "wip":
                header = "In Progress";
                break;
            case "done":
                header ="Tasks Done";
                break;
            default:
                header = "New Board";
                break;
        }
        return (<div className="board"
                     onDragOver={this.handleDragOver.bind(this)}
                     onDrop={this.handleDrop.bind(this)}
                >
                    <h2>{header}</h2>
                    <div className="cardContainer">
                        <Card tasks={this.props.tasks}
                              category={this.props.category}
                              changeTaskTitle={this.changeTaskTitle.bind(this)}
                              autoExpand={this.autoExpand.bind(this)}
                        >
                        </Card>

                        {this.renderNewTaskBox()}

                    </div>
                    <button name={this.props.category}
                            className="addBtn" 
                            id = {"btn" + this.props.category} 
                            onClick={this.handleAddCard.bind(this)}                        
                    >
                        + Add another card
                    </button>
                </div>)
    }
};