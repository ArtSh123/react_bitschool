import React, { Component } from 'react'
import {Button, Col, Row} from 'react-bootstrap'
import EditTask from '../EditTask/EditTask';
import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import styles from './styles.module.css'

export class ToDo extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tasks: [],
      selectedTasks: new Set(),
      isSelectedTasksDeleteClicked: false,
      selectAll: false,
      selectAllText: 'Select all',
      showNewTaskModal: false,
      title: '',
      description: '',
      date: new Date(),
      taskForEdit: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/task', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(async (response) => {
      const res = await response.json();

      if(response.status >= 400 && response.status < 600) {
        if(res.error) {
          throw res.error;
        }
        else {
          throw new Error('Something went wrong!');
        }
      }

      this.setState({
        tasks: res
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
  }
  
  handleChange = (key, value) => {
    const obj = {};
    obj[key] = value;

    this.setState(obj);
  }
  
  handleNewTaskAdd = (task) => {
    fetch('http://localhost:3001/task', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(async (response) => {
      const res = await response.json();

      if(response.status >= 400 && response.status < 600) {
        if(res.error) {
          throw res.error;
        }
        else {
          throw new Error('Something went wrong!');
        }
      }

      const {tasks} = this.state;

      this.setState({
        tasks: [...tasks, res],
        showNewTaskModal: false,
        title: '',
        description: '',
        date: new Date()
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  handleTaskRemove = (_id) => {
    fetch(`http://localhost:3001/task/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(async (response) => {
      const res = await response.json();

      if(response.status >= 400 && response.status < 600) {
        if(res.error) {
          throw res.error;
        }
        else {
          throw new Error('Something went wrong!');
        }
      }
      
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
    })
    .catch((error) => {
      console.log('error', error)
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

    fetch(`http://localhost:3001/task`, {
      method: 'PATCH',
      body: JSON.stringify({
        tasks: Array.from(selectedTasks)
      }),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(async (response) => {
      const res = await response.json();

      if(response.status >= 400 && response.status < 600) {
        if(res.error) {
          throw res.error;
        }
        else {
          throw new Error('Something went wrong!');
        }
      }

      const newTasks = tasks.filter((task) => !selectedTasks.has(task._id))

      this.setState({
        tasks: newTasks,
        selectedTasks: new Set(),
        isSelectedTasksDeleteClicked: false
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  handleSelectedTasksConfirmClose = () => {
    this.setState({
      isSelectedTasksDeleteClicked: false
    })
  }

  handleSelectAll = () => {
    const taskIds = this.state.tasks.map((task) => task._id);
    const selectedAll = this.state.selectAll;

    this.setState({
      selectedTasks: selectedAll ? new Set() : new Set(taskIds),
      selectAllText: selectedAll ? 'Select all' : 'Unselect all',
      selectAll: !selectedAll,
    })
  }

  hideNewTaskModal = () => {
    const {showNewTaskModal} = this.state;

    this.setState({
      showNewTaskModal: !showNewTaskModal,
      title: '',
      description: ''
    })
  }

  showTaskEditModal = (task) => {
    const {title, description, date} = task;

    this.setState({
      taskForEdit: task,
      title,
      description,
      date: date ? new Date(((typeof date) === 'string') ? date.slice(0, 10) : date) : new Date()
    })
  }

  hideTaskEditModal = () => {
    this.setState({
      taskForEdit: null
    })
  }

  handleTaskEdit = () => {
    const tasks = [...this.state.tasks];
    const {title, description, date} = this.state;
    const taskForEdit = {...this.state.taskForEdit};
    
    if(!title.trim())
      return;

    fetch(`http://localhost:3001/task/${taskForEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title, 
        description, 
        date: date?.toISOString().slice(0, 10)
      }),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(async (response) => {
      const res = await response.json();

      if(response.status >= 400 && response.status < 600) {
        if(res.error) {
          throw res.error;
        }
        else {
          throw new Error('Something went wrong!');
        }
      }

      taskForEdit.title = title;
      taskForEdit.description = description;
      taskForEdit.date = date;

      tasks[tasks.findIndex((task) => task._id === taskForEdit._id)] = taskForEdit;

      this.setState({
        tasks,
        taskForEdit: null,
        title: '',
        description: ''
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  render() {
    const {tasks, selectedTasks, isSelectedTasksDeleteClicked, selectAllText, showNewTaskModal, title, description, date, taskForEdit} = this.state;
    
    return (
      <div className={`${styles.container} container`}>
        <h1 
          className='text-center mt-3'
        >
          ToDo List
        </h1>
        <hr />

        
        <div className='mb-2 mt-3'>
          <Button
            variant='primary'
            onClick={this.hideNewTaskModal}
          >
            + New task
          </Button>
          {
            tasks.length ?
            <Button
              variant='warning'
              onClick={this.handleSelectAll}
              style={{ marginLeft: 10 }}
            >
              {selectAllText}
            </Button>
            : null
          }
        </div>

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
                      selected={selectedTasks.has(task._id)}
                      showTaskEditModal={this.showTaskEditModal}
                    />
                  </Col>
                );
              })
            }
          </Row>
          :
          null
        }
        
        <NewTask 
          tasks={tasks}
          add={this.handleNewTaskAdd}
          show={showNewTaskModal}
          onHide={this.hideNewTaskModal}
          title={title}
          description={description}
          date={date}
          change={this.handleChange}
        />
        
        <EditTask 
          show={taskForEdit}
          task={taskForEdit}
          edit={this.handleTaskEdit}
          onHide={this.hideTaskEditModal}
          title={title}
          description={description}
          date={date}
          change={this.handleChange}
        />

      </div>
    )
  }
}

export default ToDo