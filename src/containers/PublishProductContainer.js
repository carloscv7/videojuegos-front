import React, { Component } from 'react';
import {createVideogame} from "../services/videogameWs"
import {catchError} from "../utils/error";
import AppContext from "../AppContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {verifyToken} from "../services/userWs"

class PublishProductContainer extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = { inputList:[] , imgQuantityError: "", data: {}};
        this.i=1;
    }
    
    componentDidMount(){
        verifyToken()
            .catch(e=>{
                catchError(e, this.context.logout);
            });
    }

    handleChange = (event) =>{
        const {value, name} = event.target;
        let {data} = this.state;

        data[name] = value;

        this.setState({data});

    }
    
    handleClick = () =>{
        const {data} = this.state;
        this.i++;
        if(this.i >= 6){
            this.setState({imgQuantityError: <span className="error">Solo 5 imagenes permitidas</span>});
        }else{
            const inputName = ("image" + this.i).toString();
            var joined = this.state.inputList.concat(inputName);
            this.setState({inputList: joined});
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const data = Object.assign({}, this.state.data);
        const dataKeys = Object.keys(data);
        data["images"] = [];
        for(let i = 0; i < dataKeys.length; i++){
            if(dataKeys[i].includes("image")){
                data["images"].push(data[dataKeys[i]]);
                delete data[dataKeys[i]];
            }
        }
        createVideogame(data).then(response =>{
            console.log(response.data);
            this.props.history.push("/products/1")
        }).catch(e=>{
            catchError(e, this.context.logout);
        })

    }

    render() {
        const {handleChange, handleSubmit} = this;
        const {data} = this.state;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type="text" name="name" onChange={handleChange} value={data["name"]?data["name"]:""}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Descripcion: </Form.Label>
                        <Form.Control as="textarea" name="description" onChange={handleChange} value={data["description"]?data["description"]:""}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Precio: </Form.Label>
                        <Form.Control type="number" name="price" onChange={handleChange} value={data["price"]?data["price"]:""}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="stock">
                        <Form.Label>Cantidad: </Form.Label>
                        <Form.Control type="number" name="stock" onChange={handleChange} value={data["stock"]?data["stock"]:""}></Form.Control>
                    </Form.Group>
                    <Form.Label>Imagenes: </Form.Label>
                    <Form.Control type="text" name="image1" onChange={handleChange} value={data["image1"]?data["image1"]:""}></Form.Control>
                    {this.state.inputList.map(inputName => <Form.Control type="text" name={inputName} onChange={handleChange} value={data[inputName]?data[inputName]:""}></Form.Control>)}
                    <Button type="button" onClick={this.handleClick}>Cargar mas imagenes</Button>
                    {this.state.imgQuantityError}
                    <Form.Control type="submit" value="Publicar" />
                </Form>
            </div>
        );
    }
}

export default PublishProductContainer;