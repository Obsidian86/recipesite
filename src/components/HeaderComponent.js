import React, {Component} from 'react';
import '../styles/HeaderComponent.css';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component{
    toggleMobNav = () =>{
        document.getElementsByClassName("mobNav")[0].classList.toggle("mobNav_active");
        document.getElementById("ddNav").classList.toggle("slideIn");
    }
    render(){ 
        let nav =<nav>
                    <Link to="/">Search</Link>
                    { this.props.hasSearched ? <Link to="/results">Results</Link> : null }
                    <Link to="/saved">Saved recipes</Link>
                    <Link to="/list">Shopping list</Link>
                </nav>
       return(     
        <header>
            <Link to="/"><h3>RecipeSite</h3></Link>
            { nav }
            <div className="mobNav" onClick={()=> this.toggleMobNav() }>
                <p id="toggleMobNav">Menu</p>
                <div id="ddNav">
                    { nav }
                </div>
            </div>
        </header>
        );
    }
}

export default HeaderComponent;