import React, { PureComponent } from 'react'
// import styles from './styles.module.css'
import PropTypes from 'prop-types'
import { Button, 
  FormControl, 
  Modal 
} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class NewTask extends PureComponent {
  handleTaskAdd = () => {
    const {add, title, description, date} = this.props;

    if(!title) 
      return;

    // const newTaskId = tasks.length ? tasks[tasks.length - 1]._id + 1 : 0;
    const newTask = {
      // _id: newTaskId,
      title,
      description,
      date: date?.toISOString().slice(0, 10)
    };
    
    add(newTask);
  }

  render() {
    const {title, description, date, change} = this.props;

    return (
      <Modal
        {...this.props}
        confirmdeleting={this.props.confirmdeleting}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create new task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormControl 
            type="text" 
            value={title} 
            onChange={(event) => change('title', event.target.value)}
            placeholder='Title'
            onKeyDown={(event) => {
                if(event.key === "Enter") this.handleTaskAdd()
            }}
          />
          <FormControl 
            as="textarea" 
            value={description}
            onChange={(event) => change('description', event.target.value)}
            placeholder='Description'
            rows={3} 
            className='mt-3'
          />
          <DatePicker
            selected={date}
            minDate={new Date()}
            onChange={(date) => change('date', date)}
            className='mt-3'
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
              onClick={this.handleTaskAdd}
              variant="primary"
          >
              Create
          </Button>
          <Button 
            onClick={this.props.onHide}
            variant="danger"
          >
            Cancel
          </Button>
        </Modal.Footer>

      </Modal>
    )
  }
}

NewTask.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    add: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
};

export default NewTask