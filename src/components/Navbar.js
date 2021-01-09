import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <div>
                <h1>WEGAMERS</h1>
                <input type="text"></input>
                <Link to="/login">Ingresar</Link>
                <Link to="/signup">Registrarse</Link>
            </div>
        );
    }
}

export default Navbar;