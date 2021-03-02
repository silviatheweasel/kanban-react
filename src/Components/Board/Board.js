import React from "react";
import "./Board.css";
import { Card } from "../Card/Card";

export class Board extends React.Component {

    handleClick(event) {
        this.props.addTask(event.target.className);
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
        return (<div>
            <h2>{header}</h2>
            <div>
                <Card tasks={this.props.tasks}
                      category={this.props.category}
                >
                </Card>
            </div>
            <button onClick={this.handleClick.bind(this)}
                    className={this.props.category}
            >
                + Add another card
            </button>
        </div>)
    }

};