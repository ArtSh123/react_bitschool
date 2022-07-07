import React, { Component } from 'react'

export class Name extends Component {
  render() {
    const {name} = this.props;

    return (
      <h3>{name}</h3>
    )
  }
}

export default Name