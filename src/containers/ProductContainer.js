import React, { Component } from 'react';
import {getVideogame, updateVideogame} from "../services/videogameWs";
import {verifyToken} from "../services/userWs";
import {catchError} from "../utils/error";
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import AppContext from "../AppContext";
import editButton from "../images/edit-icon.png";



class ProductContainer extends Component {
    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            videogame: {},
            data: {},
            editPrice: false,
            editName: false,
            editDescription: false,
            editImage: [],
            editStock: false,
            isOwner: false,
            showModal: false,
            carouselIndex: 0,
            activeSession: false,
            registeredUser: true
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        getVideogame(id)
            .then(response=>{
                this.setState({videogame: response.data.videogame}, ()=>{
                    let {videogame} = this.state;
                    let editImage = [];
                    for(let i = 0; i < videogame.images.length; i++){
                        editImage.push(false);
                    }
                    this.setState({editImage});
                    if(videogame.username === this.context.user.username){
                        this.setState({isOwner: true}, ()=>{
                            let {isOwner} = this.state;
                            if(isOwner){
                                verifyToken()
                                    .catch(e=>{
                                        catchError(e, this.context.logout);
                                    });
                            }
                        });
                    }
                });
            }).catch(e=>{
                console.log("Hubo un error ", e);
            });
    }

    setEdit = (field, bSet)=>{
        if(field.includes("image")){
            let {editImage} = this.state;
            editImage[Number(field.slice(-1))] = bSet;
            this.setState({editImage});
        }else{
            const stateObj = {};
            stateObj["edit" + field[0].toUpperCase() + field.slice(1)] = bSet;
            this.setState(stateObj);
        }
    }

    updateVideogame = (field)=>{
        verifyToken()
            .catch(e=>{
                catchError(e, this.context.logout);
            });
        const {videogame, data, carouselIndex} = this.state;
        const bd = {};
        if(field.includes("image")){
            videogame.images[carouselIndex] = data[field];
            bd["images"] = videogame.images;
        }else{
            bd[field] = data[field];
        }
        updateVideogame(videogame._id, bd)
            .then(response=>{
                this.setState({videogame: response.data.videogame});
                this.setEdit(field, false);
                let {data} = this.state;
                data[field] = null;
                this.setState({data});
            }).catch(e=>{
                console.log(e.response);
            });
    }

    handleChange = (event)=>{
        const { value, name} = event.target;
        let { data } = this.state;

        data[name] = value;

        this.setState({ data });
    }

    handleSelect = (selectedIndex, e) =>{
        this.setState({carouselIndex:selectedIndex});
    }

    closeModal= () =>{
        this.setState({showModal: false});
    }

    buyVideogame = () =>{

    }

    showBuyModal = () => {
        verifyToken()
            .then(response=>{
                if(response.data.msg === "La sesion esta activa"){
                    this.setState({activeSession: true}, ()=>{
                        this.setShow();
                    });
                }
            })
            .catch(e=>{
                catchError(e, this.context.logout);
                
            });
    }

    setShow = () =>{
        this.setState({showModal: true});
    }

    render() {
        const {handleChange, updateVideogame, setEdit, handleSelect, closeModal, buyVideogame, showBuyModal} = this;
        const {videogame, editPrice, editName, editDescription, editStock, editImage, data, isOwner, showModal, carouselIndex, activeSession, registeredUser} = this.state;
        return (
            <div>
                <div className="product-top">
                    <div className="d-inline-block">
                        <Carousel className="d-inline-block v-carousel" interval={null} activeIndex={carouselIndex} onSelect={handleSelect}>
                            {videogame.images?videogame.images.map(img=>(
                                <Carousel.Item className="v-carousel-item">
                                    <img
                                    className="carousel-img"
                                    src={img}
                                    alt="Imagen de videojuego"
                                    />
                                </Carousel.Item>
                            )):""}
                        </Carousel>
                        <br/>
                        {isOwner?<input name={"image" + carouselIndex} value={data["image" + carouselIndex]?data["image" + carouselIndex]:""} onChange={handleChange} placeholder={videogame.images?videogame.images[carouselIndex]:""} style={{width:videogame.images?videogame.images[carouselIndex].length + "ch":"auto", maxWidth: "640px"}}></input>:""}{editImage[carouselIndex]?<Button onClick={()=>{updateVideogame("image" + carouselIndex)}}>&#128504;</Button>:""}{isOwner && !editImage[carouselIndex]?<a href="#" onClick={()=>{setEdit("image" + carouselIndex, true)}}><img src={editButton} alt="Boton para editar" className="edit-button"/></a>:""}
                    </div>
                    <div className="product-section2">
                        <span className="product-name">{editName?<span><input type="text" placeholder={videogame.name} onChange={handleChange} name="name" value={data["name"]?data["name"]:""}></input><Button onClick={()=>{updateVideogame("name")}}>&#128504;</Button></span>:videogame.name}{isOwner && !editName?<a href="#" onClick={()=>{setEdit("name", true)}}><img src={editButton} alt="Boton para editar" className="edit-button"/></a>:""}</span>
                        <span className="mb-3">Cantidad: {editStock?<span><input type="number" placeholder={videogame.stock} onChange={handleChange} name="stock" value={data["stock"]?data["stock"]:""}></input><Button onClick={()=>{updateVideogame("stock")}}>&#128504;</Button></span>:videogame.stock}{isOwner && !editStock?<a href="#" onClick={()=>{setEdit("stock", true)}}><img src={editButton} alt="Boton para editar" className="edit-button"/></a>:""}</span>
                        <span><span className="product-price">${editPrice?<span><input type="number" placeholder={videogame.price} onChange={handleChange} name="price" value={data["price"]?data["price"]:""}></input><Button onClick={()=>{updateVideogame("price")}}>&#128504;</Button></span>:videogame.price}{isOwner && !editPrice?<a href="#" onClick={()=>{setEdit("price", true)}}><img src={editButton} alt="Boton para editar" className="edit-button"/></a>:""}</span>
                        <Button variant="primary" disabled={isOwner} onClick={showBuyModal}>Comprar</Button></span>
                    </div>
                </div>
                <div className="text-center">
                    <h2>Descripción</h2>
                    {editDescription?<span><textarea placeholder={videogame.description} onChange={handleChange} name="description" value={data["description"]?data["description"]:""} style={{width:videogame.description?videogame.description.length + "ch":"auto", maxWidth: "640px"}}></textarea><Button onClick={()=>{updateVideogame("description")}}>&#128504;</Button></span>:videogame.description}{isOwner && !editDescription?<a href="#" onClick={()=>{setEdit("description", true)}}><img src={editButton} alt="Boton para editar" className="edit-button"/></a>:""}
                </div>
                <Modal show={showModal} onHide={closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{activeSession?`Comprar ${videogame.name}`:`Inicia sesion o Registrate`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {activeSession?<input type="password" placeholder="Password" name="password" onChange={handleChange} value={data["password"]?data["password"]:""}></input>
                        :
                        registeredUser?
                        <span>

                        </span>
                        :
                        <span>

                        </span>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        {activeSession?
                            <Button variant="primary" onClick={buyVideogame}>
                            Comprar
                            </Button>
                        :
                            null
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ProductContainer;