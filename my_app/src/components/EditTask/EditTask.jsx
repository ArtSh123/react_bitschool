import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, 
  FormControl, 
  Modal 
} from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';

export class EditTask extends PureComponent {
  handleTaskEdit = () => {
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
    const {title, description, date, change, edit} = this.props;

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
            Edit task
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
          <ReactDatePicker
            selected={date ? new Date(((typeof date) === 'string') ? date.slice(0, 10) : date) : new Date()}
            minDate={new Date()}
            onChange={(date) => change('date', date)}
            className='mt-3'
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={edit}
            variant="primary"
          >
            Save
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

EditTask.propTypes = {
    show: PropTypes.any,
    task: PropTypes.object,
    edit: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    change: PropTypes.func.isRequired
};

export default EditTask