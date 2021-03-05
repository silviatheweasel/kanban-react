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

  changeTaskTitle(oldName, newName, category) {
    const unchangedTasks = this.state.tasks.filter(task => task.title !== oldName);
    const updatedTask = {title : newName, category: category};
    unchangedTasks.push(updatedTask);
    this.setState({tasks: unchangedTasks});
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
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             updateDroppedItem={this.updateDroppedItem.bind(this)}
             category="wip"
             changeTaskTitle={this.changeTaskTitle.bind(this)}
             
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             updateDroppedItem={this.updateDroppedItem.bind(this)}
             category="done"
             changeTaskTitle={this.changeTaskTitle.bind(this)}
      >
      </Board>

    </div>)
  }
}

export default App;
