import React from "react";
import { Board } from "../Board/Board";
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
    };
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

  //filters out the task whose name needs to be changed, updates the name, and then updates the state
  changeTaskTitle(oldName, newName, category) {
    const unchangedTasks = this.state.tasks.filter(task => task.title !== oldName);
    const updatedTask = {title : newName, category: category};
    unchangedTasks.push(updatedTask);
    this.setState({tasks: unchangedTasks});
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

  render() {
    return (<div className="page">
      <div id="dimmer"
           className="hidden"
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

    </div>)
  }
}

export default App;
