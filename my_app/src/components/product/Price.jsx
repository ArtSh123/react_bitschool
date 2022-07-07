import React, { Component } from 'react'

export class Price extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       price: props.price,
       currency: '$'
    }
  }

  handleCurrencyChange = () => {
    const {currency, price} = this.state;

    this.setState({
        currency: currency === '$' ? '֏' : '$',
        price: currency === '$' ? price * 500 : (price / 500).toFixed(2),
    })
  }

  render() {
    const {price, currency} = this.state;

    return (
      <>
        Price: {price + currency}
        <button 
            style={{marginLeft: 10}}
            onClick={this.handleCurrencyChange}
        >
            Change the currency
        </button>
      </>
    )
  }
}

export default Price