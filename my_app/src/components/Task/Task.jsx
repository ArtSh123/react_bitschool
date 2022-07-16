import React, { Component } from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from './styles.module.css'

export class Task extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       selected: false
    }
  }

  handleCheck = () => {
    const {task, handleTaskCheck} = this.props;
    const {selected} = this.state;

    handleTaskCheck(task._id);
    this.setState({
        selected: !selected
    })
  }

  render() {
    const {task, handleTaskRemove} = this.props;
    const {selected} = this.state;

    return (
        <div
            className={`${styles.task} ${selected ? styles.selectedTask : ''}`}
        >
            <FormCheck 
                onChange={this.handleCheck} 
            />

            <h4
                className={`${styles.taskTitle} mt-3`}
            >
                {task.title}
            </h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto dolorum error natus perferendis quos ad cupiditate, dignissimos quidem dolorem reiciendis, autem facilis minus voluptates est mollitia, unde odio veritatis deleniti laborum at eaque nisi iure expedita! Dignissimos perferendis aspernatur suscipit magni eius.
            </p>
            <span
                className={styles.taskCheckIcon}
                onClick={this.handleTaskStatusChange}
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
                onClick={() => handleTaskRemove(task._id)}
            >
                ❌
            </span>
        </div>
    )
  }
}

export default Task