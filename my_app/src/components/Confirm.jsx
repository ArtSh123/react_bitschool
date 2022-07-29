import React, {memo} from 'react'
import { 
  Button, 
  Modal 
} from 'react-bootstrap'
import PropTypes from 'prop-types'

function Confirm(props) {
  return (
    <Modal
      {...props}
      confirmdeleting={props.confirmdeleting}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.confirmtext}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button 
            onClick={() => {
                    props.confirmtext === 'Are you sure to remove the task ?'
                    ?
                        props.confirmdeleting(props.taskid)
                    :
                        props.confirmdeleting()
                }
            }
            variant='danger'
        >
            Delete
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

Confirm.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    confirmdeleting: PropTypes.func.isRequired,
    taskid: PropTypes.string.isRequired,
    confirmtext: PropTypes.string.isRequired
};

export default memo(Confirm)