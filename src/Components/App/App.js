import React from "react";
import { Board } from "../Board/Board";
import { AddList } from "../AddList/AddList";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {title: "task 1", category: "todo"},
        {title: "task 2", category: "wip"},
        {title: "task 3", category: "done"},
      ], 
      isClicked: false,
      listName: ""
    };
  }

  addNewList() {
    this.setState({isClicked: true});
  }

  handleListNameUpdate(inputName) {
    this.setState({listName: inputName});
  }

  handleListNameSave(inputName) {
    const newList = {title: "", category: inputName };
    this.state.tasks.push(newList);
    this.setState({ tasks: this.state.tasks,
                    isClicked: false,
                    listName: ""
    })
  }

  //creates a new task and updates the state
  addTask(task, category) {
    const newTask = {title: task, category: category};
    this.state.tasks.push(newTask);
    this.setState({tasks: this.state.tasks});
  }

  //replaces the tasks in the state with the tasks updated with new categories
  updateDroppedItem(tasks) {
    tasks.map(task => {
      const index = parseInt(this.state.tasks.indexOf(task.title), 10);
      this.state.tasks.splice(index, task);
      return this.state.tasks;
    })
    this.setState({tasks: this.state.tasks});
  }

  //finds the index of the task that needs updating and replaces its name with the new name, and then updates the state
  changeTaskTitle(oldName, newName, category) {
    const oldTaskIndex = this.state.tasks.findIndex(task => task.title === oldName);
    const updatedTask = {title : newName, category: category};
    this.state.tasks.splice(oldTaskIndex, 1, updatedTask);
    this.setState({tasks: this.state.tasks});
  }

  //calculates the height of the element and sets the height
  autoExpand(field) {
    field.style.height = 'inherit';
	  const computed = window.getComputedStyle(field);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                + parseInt(computed.getPropertyValue('padding-top'), 10)
                + field.scrollHeight
                + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    field.style.height = height + 'px';
  }

  
  handleClosePopUp(event) {
      const popUps = document.getElementsByClassName("titleChangeBox displayed");
      for (let i = 0; i < popUps.length; i++) {
        popUps[i].className = "titleChangeBox hidden";
        event.target.className = "hidden";
      }
  }



  //cleans up event listeners
  // componentWillUnmount() {
  //   window.removeEventListener();
  // }

  render() {
    return (<div className="page">
              <div id="background">
              </div>

              <div id="dimmer"
                   className="hidden"
                   onClick={this.handleClosePopUp.bind(this)}
              ></div>

              <Board tasks={this.state.tasks}
                     addTask={this.addTask.bind(this)}
                     updateDroppedItem={this.updateDroppedItem.bind(this)}
                     category="todo"
                     changeTaskTitle={this.changeTaskTitle.bind(this)}  
                     autoExpand={this.autoExpand.bind(this)}   
              >
              </Board>

              <Board tasks={this.state.tasks}
                    addTask={this.addTask.bind(this)}
                    updateDroppedItem={this.updateDroppedItem.bind(this)}
                    category="wip"
                    changeTaskTitle={this.changeTaskTitle.bind(this)}
                    autoExpand={this.autoExpand.bind(this)}              
              >
              </Board>

              <Board tasks={this.state.tasks}
                    addTask={this.addTask.bind(this)}
                    updateDroppedItem={this.updateDroppedItem.bind(this)}
                    category="done"
                    changeTaskTitle={this.changeTaskTitle.bind(this)}
                    autoExpand={this.autoExpand.bind(this)}   
              >
              </Board>

              {this.state.isClicked 
              && <AddList
                    listName={this.state.listName}
                    handleNameUpdate={this.handleListNameUpdate.bind(this)}
                    handleListNameSave={this.handleListNameSave.bind(this)}
                >
                </AddList>}
              
              <button onClick={this.addNewList.bind(this)}>Add a list</button>

            </div>)
          }
}

export default App;
