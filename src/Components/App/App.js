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

  addTask(category) {
    const newTask = {title: "task", category: category};
    this.state.tasks.push(newTask);
    this.setState({tasks: this.state.tasks});
  }

  // allowDrop(event) {
  //   event.preventDefault();
  // }

  // handleDrag(event) {
  //   event.dataTransfer.setData("text", event.target.id);
  // }

  // handleDrop(event) {
  //   const id = event.dataTransfer.getData("text");
  //   event.target.appendChild(document.getElementById(id));
  //   event.preventDefault();
  // }


  render() {
    return (<div>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             category="todo"
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             category="wip"
      >
      </Board>
      <Board tasks={this.state.tasks}
             addTask={this.addTask.bind(this)}
             category="done"
      >
      </Board>

    </div>)
  }
}

export default App;
