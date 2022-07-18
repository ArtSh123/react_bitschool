import React, { Component } from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import Confirm from '../Confirm'

export class Task extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       selected: false,
       confirmModalShow: false,
       modalShow: false
    }
  }

//   static propTypes = {
//     task: PropTypes.object.isRequired,
//     handleTaskCheck: PropTypes.func.isRequired,
//     handleTaskRemove: PropTypes.func.isRequired
//   };

  handleCheck = () => {
    const {task, handleTaskCheck} = this.props;
    const {selected} = this.state;

    handleTaskCheck(task._id);
    this.setState({
        selected: !selected
    })
  }

  openConfirm = (taskid) => {
    this.setState({
        confirmModalShow: true
    })
  }

  confirmDeleting = (taskid) => {
    const {handleTaskRemove} = this.props;

    this.setState({
        confirmModalShow: false
    })

    handleTaskRemove(taskid);
  }

  hideConfirmModal = () => {
    const {selectedTasksDelete, selectedTasksConfirmClose} = this.props;

    if(selectedTasksDelete) {
        selectedTasksConfirmClose();
    } else {
        this.setState({
            confirmModalShow: false
        })
    }
  }

  render() {
    const {task, selectedTasksDelete, deleteselected} = this.props;
    const {selected, confirmModalShow} = this.state;

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
                onClick={() => this.openConfirm(task._id)}
            >
                ❌
            </span>

            <Confirm
                show={selectedTasksDelete ? selectedTasksDelete : confirmModalShow}
                onHide={this.hideConfirmModal}
                confirmdeleting={selectedTasksDelete ? deleteselected : this.confirmDeleting}
                taskid={task._id}
                confirmtext={
                    selectedTasksDelete ?
                        'Are you sure to remove the selected tasks ?'
                    :
                        'Are you sure to remove the task ?'
                }
            />
        </div>
    )
  }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
    handleTaskCheck: PropTypes.func.isRequired,
    handleTaskRemove: PropTypes.func.isRequired,
    selectedTasksDelete: PropTypes.bool.isRequired,
    selectedTasksConfirmClose: PropTypes.func.isRequired,
    deleteselected: PropTypes.func.isRequired
};

export default Task