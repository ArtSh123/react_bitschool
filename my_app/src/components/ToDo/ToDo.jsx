import React, { Component } from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
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

  handleTaskRemove = (id) => {
    const tasksCopy = [...this.state.tasks];
    const newTasks = tasksCopy.filter((task) => task._id !== id);
    
    this.setState({
      tasks: newTasks
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

        <div className={`mb-3 px-1 ${styles.newTaskInputContent}`}>
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
                    <div
                      className={`${styles.task} `}
                    >
                      <h4
                        className={`${styles.taskTitle} `}
                      >{task.title}</h4>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto dolorum error natus perferendis quos ad cupiditate, dignissimos quidem dolorem reiciendis, autem facilis minus voluptates est mollitia, unde odio veritatis deleniti laborum at eaque nisi iure expedita! Dignissimos perferendis aspernatur suscipit magni eius.
                      </p>
                      <span
                        className={styles.taskCheckIcon}
                        onClick={this.handleTaskCheck}
                      >
                        ✅
                      </span>
                      <span
                        className={styles.taskEditIcon}
                        onClick={this.handleTaskEdit}
                      >
                        ✏️
                      </span>
                      <span
                        className={styles.taskRemoveIcon}
                        onClick={() => this.handleTaskRemove(task._id)}
                      >
                        ❌
                      </span>
                    </div>
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