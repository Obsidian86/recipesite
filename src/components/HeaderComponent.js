import React, {Component} from 'react';
import '../styles/HeaderComponent.css';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    render(){
        return(     
        <header>
                <Link to="/"><h3>RecipeSite</h3></Link>
                <nav>
                    <Link to="/">Search</Link>
                    <Link to="/saved">Saved recipes</Link>
                </nav>
        </header>
        );
    }
}

export default HeaderComponent;