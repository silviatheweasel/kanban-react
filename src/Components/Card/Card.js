import React from "react";

export class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                    taskTitle : "",
                    }
    }
    //toggles the className of the remain button
    enterHover(i) {
        document.getElementById("renameBtn-" + this.props.category + i).className="displayed renameBtn";
    }

    //toggles the className of the remain button
    leaveHover(i) {
        document.getElementById("renameBtn-" + this.props.category + i).className="hidden renameBtn";
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
        const name = document.getElementById("title-"+ this.props.category + i).innerHTML;  
        document.getElementById("titleChange-" + this.props.category + i).className = "displayed titleChangeBox";
        document.getElementById("dimmer").className="displayed";
        this.selectText(i); 
        this.setState({ taskTitle: name}); 
    }

    //passes the old title and new title of the task and the category of the column up to the parent component
    //resets the local state, and hides the pop-up box and dimmer
    saveTitle(i) {
        const changedTitle = this.state.taskTitle;
        const titleName = document.getElementById("title-"+ this.props.category + i).innerHTML;
        if (changedTitle !== "") {
            this.props.changeTaskTitle(titleName, changedTitle, this.props.category);
            this.setState({ taskTitle: ""}); 
            document.getElementById("titleChange-" + this.props.category + i).className="hidden titleChangeBox";
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
        const input = document.getElementById("titleBox-" + this.props.category + i);
        input.focus();
        input.select();
    }
        

    render() {
        const context = this;
        const tasks = this.props.tasks;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].category === this.props.category) {
                return tasks[i].items.map ((item, i) => {
                    return (<div key={"task" + item}
                                 className="card-container"
                                >

                                <div    id={"card" + this.props.category + "-" + i}
                                        className="card"
                                        draggable="true"
                                        onDragStart={context.startDrag.bind(context)}
                                        onMouseEnter={context.enterHover.bind(context, i)}
                                        onMouseLeave={context.leaveHover.bind(context, i)}
                                        onClick={context.enterHover.bind(context, i)}
                                        >

                                    <span className="title"
                                          id={"title-"+ this.props.category + i}
                                        >
                                            {item}
                                    </span>

                                    <button className="hidden renameBtn"
                                            id={"renameBtn-" + this.props.category + i}
                                            onClick={context.handleClick.bind(context, i)}
                                        ><i className="fas fa-pen"></i>
                                    </button>
                                </div>

                                <div className="titleChangeBox hidden"
                                        id={"titleChange-" + this.props.category + i}
                                        draggable="false"                               
                                    >
                                    <textarea   name="titleChange"
                                                className="titleBox"
                                                id={"titleBox-" + this.props.category + i}
                                                rows="5"
                                                cols="35"
                                                maxLength="200"
                                                value={this.state.taskTitle}
                                                onChange={context.changeTitle.bind(context)}
                                                onInput={context.handleInput.bind(context)}
                                            >
                                    </textarea>
                                    <button id={"saveBtn-" + this.props.category + i}
                                            className="saveBtn"
                                            onClick={context.saveTitle.bind(context, i)}
                                        >Save</button>                      
                                </div>
                            </div>)})
                            }
                        }
        }   
}