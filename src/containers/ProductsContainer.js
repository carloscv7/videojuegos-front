import React, { Component } from 'react';
import {getUserVideoGameList, deleteVideogame} from "../services/videogameWs";
import { compareObjects } from '../utils/object';
import ProductCard from "../components/ProductCard";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AppContext from "../AppContext";
import {catchError} from "../utils/error";

class ProductsContainer extends Component {
    static contextType = AppContext;

    constructor(props){
        super(props);
        this.state = {
            videogames: [],
            showModal: false,
            showBadge: false
        }
        this.modalName = this.modalId = "";
    }
    

    componentDidUpdate(prevProps){
        if(!compareObjects(prevProps.match.params, this.props.match.params)){
            let {name, pagenumber} = this.props.match.params;
            if(name === undefined){
                name = "";
            }
            getUserVideoGameList(name, pagenumber).then((response)=>{
                console.log(response);
                this.setState({videogames: response.data.videogames});
            }).catch(e=>{
                catchError(e, this.context.logout);
            })
        }
    }

    componentDidMount(){
        let {name, pagenumber} = this.props.match.params;
        if(name === undefined){
            name = "";
        }
        getUserVideoGameList(name, pagenumber).then((response)=>{
            console.log(response);
            this.setState({videogames: response.data.videogames});
        }).catch(e=>{
            catchError(e, this.context.logout);
        })
    }

    handleClick = (id, name) =>{
        this.modalName = name;
        this.modalId = id;
        this.setState({showModal: true});
    }

    closeModal = () =>{
        this.setState({showModal:false});
    }

    deleteVideogame = (id)=>{
        deleteVideogame(id)
            .then(()=>{
                this.setState({showModal: false});
                getUserVideoGameList("", 1).then((response)=>{
                    console.log(response);
                    this.setState({videogames: response.data.videogames});
                }).catch(e=>{
                    console.log("Hubo un error ", e)
                })
                this.setState({showBadge: true});
                setTimeout(()=>{
                    this.setState({showBadge: false});
                }, 5000);
                
            })
            .catch(e=>{
                console.log("Hubo un error ", e)
            })
    }

    render() {
        const {handleClick, closeModal} = this;
        const {showModal, showBadge}= this.state;
        return (
        <>
            {showBadge?<h2><Badge variant="primary" className="badge-1">Se borro el videojuego</Badge></h2>:""}
            <div className="search-results">
                {this.state.videogames.map(videogame=>{
                    return <ProductCard id={videogame._id} img={videogame.images[0]} name={videogame.name} price={videogame.price} deleteButton={true} handleImgClick={handleClick}></ProductCard>
                })}
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar {this.modalName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Estas seguro que quieres borrar {this.modalName}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        No borrar
                    </Button>
                    <Button variant="primary" onClick={()=>{this.deleteVideogame(this.modalId)}}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        );
    }
}

export default ProductsContainer;