import React, { Component } from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import styles from './styles.module.css'

export class ToDo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tasks: [],
      selectedTasks: new Set(),
      isSelectedTasksDeleteClicked: false
    };
  }
  
  handleNewTaskAdd = (task) => {
    const {tasks} = this.state;

    this.setState({
      tasks: [...tasks, task]
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

  showDeleteSelectedConfirmModal = () => {
    this.setState({
      isSelectedTasksDeleteClicked: true
    })
  }

  handleDeleteSelected = () => {
    const {selectedTasks} = this.state;
    const tasks = [...this.state.tasks];

    const newTasks = tasks.filter((task) => !selectedTasks.has(task._id))

    this.setState({
      tasks: newTasks,
      selectedTasks: new Set(),
      isSelectedTasksDeleteClicked: false
    })
  }

  handleSelectedTasksConfirmClose = () => {
    this.setState({
      isSelectedTasksDeleteClicked: false
    })
  }

  render() {
    const {tasks, selectedTasks, isSelectedTasksDeleteClicked} = this.state;
    
    return (
      <div className={`${styles.container} container`}>
        <h1 
          className='text-center mt-3'
        >
          ToDo List
        </h1>

        <NewTask 
          selectedTasksSize={selectedTasks.size}
          tasks={tasks}
          newTaskAdd={this.handleNewTaskAdd}
        />

        {
          selectedTasks.size ? 
          <div className='text-center mb-2'>
            <Button
              variant='danger'
              onClick={this.showDeleteSelectedConfirmModal}
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
                      selectedTasksDelete={isSelectedTasksDeleteClicked}
                      selectedTasksConfirmClose={this.handleSelectedTasksConfirmClose}
                      deleteselected={this.handleDeleteSelected}
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