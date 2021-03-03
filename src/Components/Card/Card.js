import React from "react";
import "./Card.css";

export class Card extends React.Component {
    //toggles the className of the remain button
    enterHover(i) {
        document.getElementById("renameBtn" + i).className="displayed renameBtn";
    }

    //toggles the className of the remain button
    leaveHover(i) {
        document.getElementById("renameBtn" + i).className="hidden renameBtn";
    }

    //starts drag by transferring the id of the event target
    startDrag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    render() {
        const context = this;
        return (       
            this.props.tasks.map((task, i) => {
                if (task.category === this.props.category) {
                    return (
                        <div onMouseEnter={context.enterHover.bind(context, i)}
                             onMouseLeave={context.leaveHover.bind(context, i)}
                             key={"task" + i}
                             id={task.title}
                             className="card"
                             draggable="true"
                             onDragStart={this.startDrag.bind(this)}
                        >
                            <span className="title">{task.title}</span>
                            <button className="hidden renameBtn"
                                    id={"renameBtn" + i}
                            ><i className="fas fa-pen"></i>
                            </button>
                        </div>
                    )
                } 
            })        
        )
    }
}