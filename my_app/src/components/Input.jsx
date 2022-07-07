import React, { Component } from 'react'

export class Input extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       text: '',
       inputValue: '',
    }
  }
  
  handleChange = (event) => {
    this.setState({
        inputValue: event.target.value
    })
  }
  
  handleClick = () => {
    const {inputValue} = this.state;
    
    this.setState({
        text: inputValue,
        inputValue: ''
    })
  }

  render() {
    const {text, inputValue} = this.state;

    return (
      <div>
        <input 
            type="text"
            value={inputValue}
            onChange={this.handleChange} />
        <button
            onClick={this.handleClick}
        >
            Click me
        </button>
        <h2>{text}</h2>
      </div>
    )
  }
}

export default Input