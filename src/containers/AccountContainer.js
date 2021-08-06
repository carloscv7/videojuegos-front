import React, { Component } from 'react';
import AppContext from "../AppContext";
import editButton from "../images/edit-icon.png"
import {verifyToken, deleteAccount, changeUser} from "../services/userWs"
import {catchError} from "../utils/error";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class AccountContainer extends Component {
    static contextType = AppContext;

    state = {
        showModal: false,
        showEmailModal: false,
        showUsernameModal: false,
        showPasswordModal: false,
        modalError: "",
        data: {}
    }

    componentDidMount(){
        verifyToken()
            .catch(e=>{
                catchError(e, this.context.logout);
            });
    }

    setModal = (modal, bSet) =>{
        switch(modal){
            case "delete":
                this.setState({showModal: bSet});
                break;
            case "email":
                this.setState({showEmailModal: bSet});
                break;
            case "username":
                this.setState({showUsernameModal: bSet});
                break;
            case "password": 
                this.setState({showPasswordModal: bSet});
                break;
            default:
                break;
        }

        if(!bSet){
            this.setState({data:{}});
        }

    }

    deleteAccount = () =>{
        deleteAccount(this.state.data)
            .then(response=>{
                if(response.status === 200){
                    this.setState({data:{}});
                    this.context.logout();
                }
            }).catch(e=>{
                this.setState({data:{}});
                console.log(e);
            });
    }

    handleChange=(e)=>{
        const {name, value} = e.target;
        const {data} = this.state;

        data[name] = value;

        this.setState({data});
    }

    changeUser = (field)=>{
        let permission = true;
        if(field === "password"){
            let {newPassword, confirmNewPassword, password} = this.state.data;
            if(newPassword !== confirmNewPassword){
                permission = false;
                this.setState({modalError: "Las contraseñas no coinciden."});
            }else if(password === undefined || password === ""){
                permission = false;
                this.setState({modalError: "Introduce tu contraseña"});
            }
        }
        if(permission){
            this.setState({modalError: ""});
            changeUser(this.state.data)
            .then(response=>{
                if(response.status === 200){
                    localStorage.setItem( "user",JSON.stringify( response.data.user ) );
                    this.context.setUser(response.data.user);
                    this.setModal(field, false);
                }
            }).catch(e=>{
                console.log(e);
                console.log(e.response);
            })
        }
    }

    render() {
        const {showModal, showEmailModal, showUsernameModal, showPasswordModal, modalError,data} = this.state;
        const {handleChange, setModal, deleteAccount, changeUser} = this;
        let [CNInput1, CNInput2, CNInput3] = [null, null, null];
        if(modalError === "Las contraseñas no coinciden."){
            CNInput2 = CNInput3 = "red-border";
        }else if(modalError === "Introduce tu contraseña"){
            CNInput1 = "red-border";
        }
        return (
            <div>
                <p>Email: {this.context.user.email} <a href="#" onClick={() =>{setModal("email", true)}}><img className="edit-button" src={editButton} alt="Boton para editar"/></a></p>
                <p>Usuario: {this.context.user.username} <a href="#" onClick={() =>{setModal("username", true)}}><img className="edit-button" src={editButton} alt="Boton para editar"/></a></p>
                <p>Contraseña: ********* <a href="#" onClick={() =>{setModal("password", true)}}><img className="edit-button" src={editButton} alt="Boton para editar"/></a></p>
                <p><Button variant="danger" onClick={() =>{setModal("delete", true)}}>Borrar cuenta</Button></p>
                <Modal show={showModal} onHide={() =>{setModal("delete", false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Borrar cuenta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Ingresa tu contraseña para borrar tu cuenta
                        <input type="password" name="password" value={data["password"]?data["password"]:""} onChange={handleChange}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() =>{setModal("delete", false)}}>
                            No borrar
                        </Button>
                        <Button variant="primary" onClick={deleteAccount}>
                            Borrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEmailModal} onHide={() => {setModal("email", false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Email nuevo: <input type="email" name="email" value={data["email"]?data["email"]:""} onChange={handleChange}></input><br/>
                        Contraseña: <input type="password" name="password" value={data["password"]?data["password"]:""} onChange={handleChange}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {setModal("email", false)}}>
                            No cambiar
                        </Button>
                        <Button variant="primary" onClick={()=>{changeUser("email")}}>
                            Cambiar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showUsernameModal} onHide={() => {setModal("username", false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Usuario nuevo: <input type="text" name="username" value={data["username"]?data["username"]:""} onChange={handleChange}></input><br/>
                        Contraseña: <input type="password" name="password" value={data["password"]?data["password"]:""} onChange={handleChange}></input>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {setModal("username", false)}}>
                            No cambiar
                        </Button>
                        <Button variant="primary" onClick={()=>{changeUser("username")}}>
                            Cambiar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showPasswordModal} onHide={() => {setModal("password", false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cambiar contraseña</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Contraseña actual: <input className={CNInput1} type="password" name="password" value={data["password"]?data["password"]:""} onChange={handleChange}></input><br/>
                        Nueva contraseña: <input className={CNInput2} type="password" name="newPassword" value={data["newPassword"]?data["newPassword"]:""} onChange={handleChange}></input><br/>
                        Confirmar nueva contraseña: <input className={CNInput3} type="password" name="confirmNewPassword" value={data["confirmNewPassword"]?data["confirmNewPassword"]:""} onChange={handleChange}></input>
                        {modalError?<div style={{color:"red", textAlign: "center"}}>{modalError}</div>:""}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {setModal("password", false)}}>
                            No cambiar
                        </Button>
                        <Button variant="primary" onClick={()=>{changeUser("password");}}>
                            Cambiar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default AccountContainer;