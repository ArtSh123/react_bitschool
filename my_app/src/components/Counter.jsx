import React, { Component } from 'react'

export class Counter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value: props.defaultValue
    }
  }

  handleClickPlus = () => {
    this.setState({
        value: this.state.value + 1
    }, 
    () => {
      console.log(this.state.value)
    })
  }

  handleClickMinus = () => {
    this.setState((state) => {
      return {
        value: state.value - 1
    }})
  }

  render() {
    return (
      <div>
        <h1>The count is: {this.state.value}</h1>
        <button
            onClick={this.handleClickMinus}
        >
            <b>-</b>
        </button>
        <button
            onClick={this.handleClickPlus}
        >
            <b>+</b>
        </button>
      </div>
    )
  }
}

export default Counter