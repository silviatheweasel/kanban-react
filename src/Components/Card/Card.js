import React from "react";
import "./Card.css";

export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    taskTitle : "",
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

    //updates the local state with the input value of the textarea
    changeTitle(event) {
        this.setState({taskTitle: event.target.value})
    }

    //displays the title change pop-up box and the dimmer when button is clicked, and updates the local state
    handleClick(i) {
        const name = document.getElementById("title" + i).innerHTML;  
        document.getElementById("titleChange" + i).className = "displayed titleChangeBox";
        document.getElementById("dimmer").className="displayed";
        this.selectText(i); 
        // const titleChangeArea =  document.getElementById("titleBox" + i);
        // const computed = window.getComputedStyle(titleChangeArea);
        // const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        //         + parseInt(computed.getPropertyValue('padding-top'), 10)
        //         + titleChangeArea.scrollHeight
        //         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        //         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
        // titleChangeArea.style.height= height + "px";
        this.setState({ taskTitle: name}); 
    }

    //passes the old title and new title of the task and the category of the column up to the parent component
    //resets the local state, and hides the pop-up box and dimmer
    saveTitle(i) {
        const changedTitle = this.state.taskTitle;
        const titleName = document.getElementById("title" + i).innerHTML;
        if (changedTitle !== "") {
            this.props.changeTaskTitle(titleName, changedTitle, this.props.category);
            this.setState({ taskTitle: ""}); 
            document.getElementById("titleChange" + i).className="hidden titleChangeBox";
            document.getElementById("dimmer").className="hidden";
        } else {
            return;
        }
    }   
    
    //event handlers that connects with AutoExpand
    handleInput(event) {
        const field = event.target;
        this.props.autoExpand(field);
    }

    //selects and focuses on the text
    selectText(i) {
        const input = document.getElementById("titleBox" + i);
        input.focus();
        input.select();
    }

    // componentWillUnmount() {
    //     window.removeEventListener();
    //   }
        

    render() {
        const context = this;
        return (       
            this.props.tasks.map((task, i) => {
                if (task.category === this.props.category) {
                    return (
                        <div key={"task" + i}
                             className="card-container"
                            >

                            <div    id={task.title}
                                    className="card"
                                    draggable="true"
                                    onDragStart={context.startDrag.bind(context)}
                                    onMouseEnter={context.enterHover.bind(context, i)}
                                    onMouseLeave={context.leaveHover.bind(context, i)}>

                                <span className="title"
                                    id={"title"+ i}
                                    >
                                        {task.title}
                                </span>

                                <button className="hidden renameBtn"
                                        id={"renameBtn" + i}
                                        onClick={context.handleClick.bind(context, i)}
                                    ><i className="fas fa-pen"></i>
                                </button>
                            </div>

                            <div className="titleChangeBox hidden"
                                 id={"titleChange" + i}
                                 draggable="false"                               
                                >
                                <textarea   name="titleChange"
                                            className="titleBox"
                                            id={"titleBox" + i}
                                            rows="5"
                                            cols="35"
                                            maxLength="200"
                                            value={this.state.taskTitle}
                                            onChange={context.changeTitle.bind(context)}
                                            onInput={context.handleInput.bind(context)}
                                        >
                                </textarea>
                                <button id={"saveBtn" + i}
                                        className="saveBtn"
                                        onClick={context.saveTitle.bind(context, i)}
                                    >Save</button>                      
                            </div>
                        </div>
                    )
                } 
            })        
        )
    }
}