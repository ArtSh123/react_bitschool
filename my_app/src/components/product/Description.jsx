import React, { Component } from 'react'

export class Description extends Component {
  render() {
    const {description} = this.props;

    return (
      <p>{description}</p>
    )
  }
}

export default Description