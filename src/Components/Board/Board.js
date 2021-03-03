import React from "react";
import "./Board.css";
import { Card } from "../Card/Card";

export class Board extends React.Component {

    handleClick(event) {
        this.props.addTask(event.target.name);
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
                        >
                        </Card>
                    </div>
                    <button onClick={this.handleClick.bind(this)}
                            name={this.props.category}
                            className="addBtn"
                    >
                        + Add another card
                    </button>
                </div>)
    }

};