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
                     { this.props.hasSearched ? <Link to="/results">Results</Link> : null }
                    <Link to="/saved">Saved recipes</Link>
                </nav>
                <div className="mobNav">
                    <p>Menu</p>
                </div>
        </header>
        );
    }
}

export default HeaderComponent;