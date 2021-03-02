import React from "react";
import "./Card.css";

export class Card extends React.Component {

    enterHover(i) {
        document.getElementById("renameBtn" + i).className="displayed";
    }

    leaveHover(i) {
        document.getElementById("renameBtn" + i).className="hidden";
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
                        >
                            <span>{task.title}</span>
                            <button className="hidden"
                                    id={"renameBtn" + i}
                            >Rename</button>
                        </div>
                    )
                }
            })        
        )
    }
}