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
  addTask(category) {
    const newTask = {title: "task", category: category};
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


  render() {
    return (<div className="page">
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             updateDroppedItem={this.updateDroppedItem.bind(this)}
             category="todo"
 
             
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             updateDroppedItem={this.updateDroppedItem.bind(this)}
             category="wip"
             
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             updateDroppedItem={this.updateDroppedItem.bind(this)}
             category="done"
      >
      </Board>

    </div>)
  }
}

export default App;
