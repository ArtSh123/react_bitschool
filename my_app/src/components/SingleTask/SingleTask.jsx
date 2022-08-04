import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Confirm from '../Confirm';
import EditTask from '../EditTask/EditTask';
import styles from './styles.module.css'

function SingleTask() {
  const {taskId} = useParams();
  const [task, setTask] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/task/${taskId}`, {
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

      setTask(res);
    })
    .catch((error) => {
      console.log('error', error)
    })
    
  }, []);

  const toggleDeleteConfirm = () => {
    setShowDeleteConfirmModal(!showDeleteConfirmModal);
  }

  const confirmDeleting = (_id) => {
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
      
      navigate('/');
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  const toggleTaskEditModal = () => {
    setShowTaskEditModal(!showTaskEditModal);
  }

  const handleTaskEdit = () => {
    const {title, description, date} = task;
    console.log('title, description, date', title, description, date, typeof date)
    
    if(!title.trim())
      return;

    fetch(`http://localhost:3001/task/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title, 
        description, 
        date: (typeof date) === 'string' ? date.slice(0, 10) : date.toISOString().slice(0, 10)
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

      setTask(task);
      toggleTaskEditModal();
    })
    .catch((error) => {
      console.log('error', error)
    })
  }

  const handleChange = (key, value) => {
    const taskCopy = {...task};
    taskCopy[key] = value;

    setTask(taskCopy);
  }

  return (
    <>
      {
        task ?
        <div
          className={styles.task}
        >
          <h2>
              {task.title}
          </h2>
          <p>
              {task.description}
          </p>
          {
              task.date ?
                  <p>
                      { (typeof task.date) === 'string' ? task.date.slice(0, 10) : task.date.toISOString().slice(0, 10) }
                  </p>
              :
              ''
          }

          <Confirm
              show={showDeleteConfirmModal}
              onHide={toggleDeleteConfirm}
              confirmdeleting={confirmDeleting}
              taskid={task._id}
              confirmtext='Are you sure to remove the task ?'
          />

          <span
              className={styles.taskCheckIcon}
              // onClick={this.handleTaskStatusChange}
          >
              ✅
          </span>
          <span
              className={styles.taskEditIcon}
              onClick={() => toggleTaskEditModal()}
          >
              <FontAwesomeIcon icon={faPenToSquare} color='orange' size='lg' />
          </span>
          <span
              className={styles.taskRemoveIcon}
              onClick={toggleDeleteConfirm}
          >
              <FontAwesomeIcon icon={faTrashCan} color='red' size='xl' />
          </span>
        </div>
        : 
        <h3
          className='text-center mt-3'
        >Loading...</h3>
      } 

      <EditTask 
        show={showTaskEditModal}
        task={task}
        edit={handleTaskEdit}
        onHide={toggleTaskEditModal}
        title={task ? task.title : ''}
        description={task ? task.description : ''}
        date={task ? task.date : new Date()}
        change={handleChange}
      />
    </>
  )
}

export default memo(SingleTask)