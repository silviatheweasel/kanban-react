import React from "react";
import { Card } from "../Card/Card";

export class Board extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = { isClicked: false,
                       newTitle: "",
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
    //basically same as the handleClick function but allows a new input box to open
    handleEnter(event) {
        if (event.keyCode === 13 && this.state.newTitle !== "") {
            this.props.addTask(this.state.newTitle, this.props.category);
            this.setState({newTitle : "",
                           isClicked: true 
                        });
            document.getElementById("btn" + this.props.category).className = "addBtn";
        } else {
            return;
        }
    }

    //resets the local state
    handleCancel() {
        this.setState({newTitle : "",
                       isClicked: false 
                      });
        document.getElementById("btn" + this.props.category).className = "addBtn";
    }

    //prevent browser default behavior to allow dropping
    handleDragOver(event) {
        event.preventDefault();
    }
    
    //finds the original category and name of the task that needs to be moved from the id being passed
    //passing the original category, new category, and the name of the task to the state handler in App
    handleDrop(event) {
        const id = event.dataTransfer.getData("text");
        const index = id.indexOf("-");
        const taskIndex = id.slice(index + 1);
        const originalCategory = id.slice(4, index);
        const newCategory = this.props.category;
        const tasksOriginalCategory = this.props.tasks.find(task => task.category === originalCategory);
        const taskName = tasksOriginalCategory.items[taskIndex];

        this.props.updateDroppedItem(originalCategory, newCategory, taskName);
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
            
            return (<div className="newTitleContainer" 
                         id={"container" + this.props.category }
                        >
                         
                        <textarea   name="newTaskInput"
                                    placeholder="Enter a title for this card..."
                                    className="newTaskInput"
                                    rows="3"
                                    cols="35"
                                    maxLength="200"
                                    value={this.state.newTitle} 
                                    autoFocus     
                                    onChange={this.updateTaskTitle.bind(this)}
                                    onInput={this.handleInput.bind(this)}
                                    onKeyUp={this.handleEnter.bind(this)}                       
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
        return (<div className="board">

                    <h2>{this.props.category}</h2>

                    <div className="cardContainer"
                          onDragOver={this.handleDragOver.bind(this)}
                          onDrop={this.handleDrop.bind(this)}>

                        <Card tasks={this.props.tasks}
                              category={this.props.category}
                              changeTaskTitle={this.changeTaskTitle.bind(this)}
                              autoExpand={this.autoExpand.bind(this)}                           
                        >
                        </Card>

                        {this.renderNewTaskBox()}

                    <button name={this.props.category}
                            className="addBtn" 
                            id = {"btn" + this.props.category} 
                            onClick={this.handleAddCard.bind(this)}                        
                    >
                        + Add another card
                    </button>

                    </div>
                </div>)
    }
};