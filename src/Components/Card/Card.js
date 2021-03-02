import React from "react";
import "./Card.css";

export class Card extends React.Component {

    enterHover(i) {
        document.getElementById("renameBtn" + i).className="displayed renameBtn";
    }

    leaveHover(i) {
        document.getElementById("renameBtn" + i).className="hidden renameBtn";
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
                             className="card"
                        >
                            <span className="title">{task.title}</span>
                            <button className="hidden renameBtn"
                                    id={"renameBtn" + i}
                            ><i class="fas fa-pen"></i>
                            </button>
                        </div>
                    )
                }
            })        
        )
    }
}