import React, { Component } from 'react';

class ProductCard extends Component {
    render() {
        const {img, name, price} = this.props;
        return (
            <div>
                <img src={img}></img>
                <div>
                    {name} {price}
                </div>
            </div>
        );
    }
}

export default ProductCard;