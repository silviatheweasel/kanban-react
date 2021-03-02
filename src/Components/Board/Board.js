import React from "react";
import "./Board.css";
import { Card } from "../Card/Card";

export class Board extends React.Component {

    handleClick(event) {
        this.props.addTask(event.target.name);
    }

    render() {
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
        }
        return (<div class="board">
            <h2>{header}</h2>
            <div class="cardContainer">
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