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
    handleAddCard() {
        this.setState({ isClicked: true });
    }

    //updates the local state when the textarea changes
    updateTaskTitle(event) {
        this.setState({ newTitle: event.target.value })
    }

    //if a new task has been input, passes the title of the new task and its category to the global state
    //updates the local state to reset the textarea
    handleClick() {
        if (this.state.newTitle !== "") {
            this.props.addTask(this.state.newTitle, this.props.category);
            this.setState({newTitle : "",
                           isClicked: false 
                        });
        } else {
            return;
        }
    }

    //resets the local state
    handleCancel() {
        this.setState({newTitle : "",
                       isClicked: false 
                      });
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

    changeTaskTitle(oldName, newName, category) {
        this.props.changeTaskTitle(oldName, newName, category);
    }

    renderNewTaskBox() {
        if (this.state.isClicked) {
            return (<div>
                <textarea name="newTaskInput"
                          placeholder="Enter a title for this card..."
                          rows="3"
                          cols="30"
                          maxLength="200"
                          onChange={this.updateTaskTitle.bind(this)}
                          value={this.state.newTitle} 
                          autoFocus                            
                    >
                </textarea>
                <button onClick={this.handleClick.bind(this)}>Add Card</button>
                <button onClick={this.handleCancel.bind(this)}> X</button>
            </div>)
        }      
    }

    render() {
        //get header name based on the category
        let header;
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

                        >
                        </Card>

                        {this.renderNewTaskBox()}

                    </div>
                    <button onClick={this.handleAddCard.bind(this)}
                            name={this.props.category}
                            className="addBtn"
                    >
                        + Add another card
                    </button>
                </div>)
    }
};