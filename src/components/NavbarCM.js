//rfce
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './NavbarCM.css'
import { isAuthenticated, signout } from "../components/apiCore";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return {color: '#ff9900'}
    } else {
      return {color: '#ffffff'}
    }
  }

const NavbarCM = ({history}) => {

    const [click, setClick]= useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <=960) {
            setButton(false)
        }else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <div>
            
            <nav className="navbar">
                    {isAuthenticated() && (
                        <div className="navbar-container">
                            
                            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                            WeGamers  <i className="fab fa-typo3"/>
                            </Link>

                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                            </Link>
    
                            <Link to='/addvideogame' className='nav-links' onClick={closeMobileMenu}>
                            Create Tournament
                            </Link> 

                            <Link to='/tournaments' className='nav-links' onClick={closeMobileMenu}>
                            Available Tournaments
                            </Link> 
                                
                            <Link to='/deleteproducts' className='nav-links' onClick={closeMobileMenu}>
                            Delete Tournaments
                            </Link> 
                            <Link
                                    to="/"
                                    onClick={() =>
                                        signout(() => {
                                        history.push("/");
                                        })} className="nav-link">
                                    Logout
                            </Link>
                        </div>
                        )}


                        {!isAuthenticated() && (
                        <div className="navbar-container">
                            
                            <div>
                                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                                    WeGamers  <i className="fab fa-typo3"/>
                                    </Link>
                            </div>
                            <div>
                                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                                </Link>
                            </div>
                            <div>
                                {button && <Button buttonStyle='btn--outline'>LOGIN</Button>}
                            </div>  
                        </div>
                        )}      

                        <div className="menu-icon" onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>
                        
                        
                            
                        
                
                
            </nav>
        </div>
        
    )
}

export default NavbarCM
