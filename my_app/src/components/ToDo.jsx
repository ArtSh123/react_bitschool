import React, { Component } from 'react'
import styles from './styles.module.css'

export class ToDo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      newTaskText: '',
      tasks: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      newTaskText: event.target.value
    })
  }

  handleNewTaskAdd = () => {
    const {tasks} = this.state;
    const newTaskText = this.state.newTaskText.trim();

    if(!newTaskText) 
      return;

    this.setState({
      tasks: [...tasks, newTaskText],
      newTaskText: ''
    })
  }

  handleTaskRemove = (event) => {
    const index = Number(event.target.attributes.dataid.value);
    const tasksCopy = [...this.state.tasks];
    tasksCopy.splice(index, 1);
    
    this.setState({
      tasks: tasksCopy
    })
  }

  render() {
    const {newTaskText, tasks} = this.state;
    
    return (
      <div className={`${styles.container} container`}>
        <h1 
          className='text-center mt-3'
        >
          ToDo List
        </h1>

        <div className={styles.newTaskInputContent}>
          <input 
            type="text" 
            value={newTaskText} 
            onChange={this.handleChange}
            className={`form-control ${styles.newTaskInput}`} 
          />
          <button
            onClick={this.handleNewTaskAdd}
            className="btn btn-primary"
          >
            Add task
          </button>
        </div>

        {
          tasks.length 
          ?
          <ul className={styles.tasks}>
            {
              tasks.map((task, index) => {
                return (
                  <li 
                    key={index}
                    className={styles.task}
                  >
                    {index + 1 + '. ' + task}
                    <span
                      className={styles.taskRemoveIcon}
                      onClick={this.handleTaskRemove}
                      dataid={index}
                    >
                      ❌
                    </span>
                  </li>
                );
              })
            }
          </ul> 
          :
          null
        }
      </div>
    )
  }
}

export default ToDo