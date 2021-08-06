import React, { Component } from 'react';
import closeButton from "../images/close-icon.webp"
import { withRouter} from 'react-router-dom';


class ProductCard extends Component {

    state={
        cursor: "default"
    }

    handleDeleteClick = () =>{
        this.props.handleImgClick(this.props.id, this.props.name);
    }

    handleClick = () =>{
        this.props.history.push("/product/" + this.props.id);
    }

    handleMouseEnter = () => {
        this.setState({cursor: "pointer"});
    }

    handleMouseLeave = () => {
        this.setState({cursor: "default"});
    }
    

    render() {
        const {img, name, price, deleteButton} = this.props;
        const {cursor} = this.state;
        return (
            <div className="product-card">
                {deleteButton?<img style={{cursor: cursor}} className="product-card-img" src={closeButton} onClick={this.handleDeleteClick} height="20" width="20"
                onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>:""}
                <div className="d-inline-block" style={{cursor: cursor}} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                    <img src={img} height="300" width="200" onClick={this.handleClick}></img>
                    <div className="text-center">
                        {name} {price}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductCard);