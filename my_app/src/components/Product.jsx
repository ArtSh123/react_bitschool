import React, { Component } from 'react'
import Description from './product/Description'
import Name from './product/Name'
import Price from './product/Price'

export class Product extends Component {
    render() {
        const cardStyles = {
                        border: "1px solid red",
                        width: 400,
                        margin: '30px auto'
                    };
        const {name, price, description} = this.props;
        
        return (
            <div 
                className="card" 
                style={cardStyles}
            >
                <Name name={name} />
                <Price price={price} />
                <Description description={description} />
            </div>
        )
    }
}

export default Product