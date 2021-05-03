import React from "react";
import { Board } from "../Board/Board";
import { AddList } from "../AddList/AddList";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isClicked: false,
      listName: "",
    };
  }

  addNewList() {
    this.setState({isClicked: true});
    document.getElementById("addBtn").style.display="none";

  }

  handleListNameUpdate(inputName) {
    this.setState({listName: inputName});
  }

  handleListNameSave(inputName) {
    const newList = {category: inputName, items: [] };
    this.state.tasks.push(newList);
    this.setState({ tasks: this.state.tasks,
                    isClicked: false,
                    listName: ""
                  })
    document.getElementById("addBtn").style.display="block";
  }

  handleEnter(inputName) {
      const newList = {category: inputName, items: [] };
      this.state.tasks.push(newList);
      this.setState({ tasks: this.state.tasks,
                      listName: ""
                    })
    document.getElementById("addBtn").style.display="none";
  }

  cancelAddList() {
    this.setState({isClicked: false,
                   listName: ""})
    document.getElementById("addBtn").style.display="block";
  }

  //creates a new task and updates the state
  addTask(task, category) {
    const tasks = this.state.tasks;
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (tasks[i].category === category) {
        tasks[i].items.push(task);
      }
    }
    this.setState({tasks: this.state.tasks});
  }

  //replaces the tasks in the state with the tasks updated with new categories
  updateDroppedItem(originalCategory, newCategory, taskName) {

        const tasks = this.state.tasks;
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].category === originalCategory) {
            const index = tasks[i].items.indexOf(taskName);
            tasks[i].items.splice(index, 1);
          }
          if (tasks[i].category === newCategory) {
            tasks[i].items.push(taskName);          
          }
        }
        this.setState({ tasks: tasks}); 
  }

  //finds the index of the task that needs updating and replaces its name with the new name, and then updates the state
  changeTaskTitle(oldName, newName, category) {
    const tasks = this.state.tasks;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].category === category) {
        const index = tasks[i].items.findIndex(item => item === oldName);
        tasks[i].items.splice(index, 1, newName);
      }
    }
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

  renderBoards() {
  return this.state.tasks.map(task => 
    {return <Board  tasks={this.state.tasks}  
                    key={task.category}
                    addTask={this.addTask.bind(this)}
                    updateDroppedItem={this.updateDroppedItem.bind(this)}
                    category={task.category}
                    changeTaskTitle={this.changeTaskTitle.bind(this)}  
                    autoExpand={this.autoExpand.bind(this)}   
                >
            </Board>})
  }


  render() {

 
    return (<div className="page">

              <div id="dimmer"
                   className="hidden"
                   onClick={this.handleClosePopUp.bind(this)}
              ></div>

              {this.renderBoards()}

              {this.state.isClicked 
              && <AddList
                    listName={this.state.listName}
                    handleNameUpdate={this.handleListNameUpdate.bind(this)}
                    handleListNameSave={this.handleListNameSave.bind(this)}
                    cancelAddList={this.cancelAddList.bind(this)}
                    handleEnter={this.handleEnter.bind(this)}
                >
                </AddList>}
              
              <button className="newListBtn"
                      id="addBtn"
                      onClick={this.addNewList.bind(this)}
                    >+ Add a list</button>
            </div>)
          }
}

export default App;
