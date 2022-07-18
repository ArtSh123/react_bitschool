import React, { Component } from 'react'
import styles from './styles.module.css'
import PropTypes from 'prop-types'

export class NewTask extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        title: '',
        description: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleTaskAdd = () => {
    const {newTaskAdd, tasks} = this.props;
    const title = this.state.title.trim();

    if(!title) 
      return;

    const newTaskId = tasks.length ? tasks[tasks.length - 1]._id + 1 : 0;
    const newTask = {
      _id: newTaskId,
      title,
      createdDate: new Date()
    };
    
    newTaskAdd(newTask);

    this.setState({
        title: ''
    })
  }

  render() {
    const {title} = this.state;
    const {selectedTasksSize} = this.props;

    return (
        <div className={`mb-3 px-1 ${styles.newTaskInputContent}`}>
            <input 
                type="text" 
                value={title} 
                onChange={this.handleChange}
                className={`form-control ${styles.newTaskInput}`} 
                disabled={!!selectedTasksSize}
                placeholder='Task title'
                onKeyDown={(event) => {
                    if(event.key === "Enter") this.handleTaskAdd()
                }}
            />
            <button
                onClick={this.handleTaskAdd}
                className="btn btn-primary"
            >
                Add task
            </button>
        </div>
    )
  }
}

NewTask.propTypes = {
    selectedTasksSize: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    newTaskAdd: PropTypes.func.isRequired
};

export default NewTask