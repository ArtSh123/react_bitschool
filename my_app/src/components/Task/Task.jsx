import React, { PureComponent } from 'react'
import { FormCheck } from 'react-bootstrap'
import styles from './styles.module.css'
import PropTypes from 'prop-types'
import Confirm from '../Confirm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPenToSquare, 
    faXmark 
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export class Task extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
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
    const {task, selectedTasksDelete, deleteselected, selected, showTaskEditModal} = this.props;
    const {confirmModalShow} = this.state;

    return (
        <div
            className={`${styles.task} ${selected ? styles.selectedTask : ''}`}
        >
            <FormCheck 
                onChange={this.handleCheck} 
                checked={selected ? true : false}
                style={{marginBottom: 15}}
            />

            <Link
                to={`/task/${task._id}`}
                style={{
                    textDecoration: 'none',
                    color: '#000'
                }}
            >
                <h4>
                    {task.title.length < 13 ? task.title : task.title.substr(0, 13) + '...'}
                </h4>
            </Link>
            <p>
                {task.description.length < 20 ? task.description : task.description.substr(0, 20) + '...'}
            </p>
            {
                task.date ?
                    <p>
                        { (typeof task.date) === 'string' ? task.date.slice(0, 10) : task.date.toISOString().slice(0, 10) }
                    </p>
                :
                ''
            }
            <span
                className={styles.taskCheckIcon}
                onClick={this.handleTaskStatusChange}
            >
                ✅
            </span>
            <span
                className={styles.taskEditIcon}
                onClick={() => showTaskEditModal(task)}
            >
                <FontAwesomeIcon icon={faPenToSquare} color='orange' size='lg' />
            </span>
            <span
                className={styles.taskRemoveIcon}
                onClick={() => this.openConfirm(task._id)}
            >
                <FontAwesomeIcon icon={faXmark} color='red' size='xl' />
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
    deleteselected: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    showTaskEditModal: PropTypes.func
};

export default Task