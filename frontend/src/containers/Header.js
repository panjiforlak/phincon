import React from "react";
import { Link } from "react-router-dom";

const Header = () =>{
    return(
        <div className="container is-max-desktop">
         <nav className="navbar is-fixed-top " role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" width="90" height="28"/>
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                
                <div className="navbar-start mt-2">
                    <Link to={`/`}>
                        <div className="navbar-item label">
                            Home
                        </div>
                    </Link>
                    <Link to={`/mypokemon`}>
                        <div className="navbar-item label">
                            My Pokemon
                        </div>
                    </Link>
                </div>

                <div className="navbar-end">
                
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Header