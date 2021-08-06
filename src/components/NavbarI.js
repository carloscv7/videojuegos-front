import React, { Component } from 'react';
import { Link , withRouter} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from "react-bootstrap/Button";
import AppContext from "../AppContext";

class NavbarI extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.input = React.createRef();
      }

    handleClick = () =>{
        this.props.history.push("/search/1/" + encodeURIComponent(this.input.current.value));
    }

    render() {
        const {user} = this.props;
        const {handleClick} = this;
        return (
            <Navbar id="top-section" expand="lg" bg="light">
                <h1 className="d-inline-block nv-title">WEGAMERS</h1>
                {user.username?<span><span className="welcome-text">Bienvenido {user.username}</span>
                                    <div className="d-inline-block">
                                    <DropdownButton id="dropdown-basic-button" title="Mi cuenta">
                                        <Dropdown.Item as={Link} to="/account">Cuenta</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/products/1">Publicaciones</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/sales">Ventas</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/orders">Compras</Dropdown.Item>
                                    </DropdownButton>
                                    </div>
                                </span>
                :
                    ""
                }
                <input type="text" ref={this.input}></input>
                <button type="button" onClick={handleClick}>Buscar</button>
                {user.username?(
                        <span>
                            <Button as={Link} to="/publish-product" variant="success">Vender</Button>
                            <Button variant="secondary" onClick={()=>{this.context.logout()}}>Logout</Button>
                        </span>
                    )
                    :
                    (
                        <span>
                            <Link to="/login">Ingresar</Link>
                            <Link to="/signup">Registrarse</Link>
                        </span>
                        
                    )
                }
            </Navbar>
        );
    }
}

export default withRouter(NavbarI);