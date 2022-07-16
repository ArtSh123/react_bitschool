import React, { Component } from 'react'
import {Button, Card, Col, Container, FormCheck, Row} from 'react-bootstrap'
import Task from '../Task/Task';
import styles from './styles.module.css'

export class ToDo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      newTaskText: '',
      tasks: [],
      selectedTasks: new Set()
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

    const newTaskId = tasks.length ? tasks[tasks.length - 1]._id + 1 : 0;
    const newTask = {
      _id: newTaskId,
      title: newTaskText,
      createdDate: new Date()
    };

    this.setState({
      tasks: [...tasks, newTask],
      newTaskText: ''
    })
  }

  handleTaskRemove = (_id) => {
    const tasksCopy = [...this.state.tasks];
    const newTasks = tasksCopy.filter((task) => task._id !== _id);

    // const selectedTasks = [...this.state.selectedTasks];
    // const newSelectedTasks = selectedTasks.includes(_id) ? selectedTasks.filter((id) => id !== _id) : null;
    const selectedTasks = new Set(this.state.selectedTasks);
    if(selectedTasks.has(_id)) {
      selectedTasks.delete(_id)
    }
    
    this.setState({
      tasks: newTasks,
      selectedTasks
    })
  }

  handleTaskCheck = (_id) => {
    // const selectedTasks = [...this.state.selectedTasks];
    // const newSelectedTasks = selectedTasks.includes(_id) ? selectedTasks.filter((id) => id !== _id) : [...selectedTasks, _id];
    const selectedTasks = new Set(this.state.selectedTasks);
    if(selectedTasks.has(_id)) {
      selectedTasks.delete(_id)
    } else {
      selectedTasks.add(_id);
    }

    this.setState({
      selectedTasks
    })
    
  }

  handleDeleteSelected = () => {
    const {selectedTasks} = this.state;
    const tasks = [...this.state.tasks];

    const newTasks = tasks.filter((task) => !selectedTasks.has(task._id))

    this.setState({
      tasks: newTasks,
      selectedTasks: new Set()
    })
  }

  render() {
    const {newTaskText, tasks, selectedTasks} = this.state;
    
    return (
      <div className={`${styles.container} container`}>
        <h1 
          className='text-center mt-3'
        >
          ToDo List
        </h1>

        <div className={`mb-3 px-1 ${styles.newTaskInputContent}`}>
          <input 
            type="text" 
            value={newTaskText} 
            onChange={this.handleChange}
            className={`form-control ${styles.newTaskInput}`} 
            disabled={!!selectedTasks.size}
            placeholder='Task title'
            onKeyDown={(event) => {
              if(event.key === "Enter") this.handleNewTaskAdd()
            }}
          />
          <button
            onClick={this.handleNewTaskAdd}
            className="btn btn-primary"
          >
            Add task
          </button>
        </div>
        {
          selectedTasks.size ? 
          <div className='text-center mb-2'>
            <Button
              variant='danger'
              onClick={this.handleDeleteSelected}
            >
              Delete selected
            </Button>
          </div>
          : ''
        }

        {
          tasks.length 
          ?
          <Row>
            {
              tasks.map((task) => {
                return (
                  <Col 
                    key={task._id}
                    xl={1.5}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                  >
                    <Task 
                      task={task} 
                      handleTaskCheck={this.handleTaskCheck} 
                      handleTaskRemove={this.handleTaskRemove} 
                    />
                  </Col>
                );
              })
            }
          </Row>
          :
          null
        }
      </div>
    )
  }
}

export default ToDo