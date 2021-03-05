import React from "react";
import "./Card.css";

export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    taskTitle : "",
                    // showTitleChangeBox: false
                    }
    }
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

    changeTitle(event) {
        this.setState({taskTitle: event.target.value})
    }

    handleClick(i) {
        const name = document.getElementById("title" + i).innerHTML;
        document.getElementById("titleChange" + i).className = "displayed titleChangeBox";
        document.getElementById("dimmer").className="displayed";
        this.setState({ taskTitle: name});
    }


    saveTitle(i) {
        let changedTitle = this.state.taskTitle;
        let titleName = document.getElementById("title" + i).innerHTML;
        this.props.changeTaskTitle(titleName, changedTitle, this.props.category);
        this.setState({ taskTitle: ""}); 
        document.getElementById("titleChange" + i).className="hidden titleChangeBox";
        document.getElementById("dimmer").className="hidden";
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
                             onDragStart={context.startDrag.bind(context)}
                        >
                            <span className="title"
                                  id={"title"+ i}>
                                      {task.title}
                            </span>
                            <button className="hidden renameBtn"
                                    id={"renameBtn" + i}
                                    onClick={context.handleClick.bind(context, i)}
                            ><i className="fas fa-pen"></i>
                            </button>
                        
                            <div className="titleChangeBox hidden"
                                 id={"titleChange" + i}
                                >
                                <textarea   name="titleChange"
                                            className="titleBox"
                                            rows="3"
                                            cols="30"
                                            maxLength="200"
                                            value={this.state.taskTitle}
                                            onChange={context.changeTitle.bind(context)}
                                            >
                                </textarea>
                                <button onClick={context.saveTitle.bind(context, i)}
                                        id={"saveBtn" + i}
                                        className="saveBtn"
                                        >Save</button>
                            </div>
                           
                        </div>
                    )
                } 
            })        
        )
    }
}