import React, {Component} from 'react';
import '../../styles/HeaderComponent.css';
import { Link } from 'react-router-dom'; 
import NavComponent from './NavComponent';

class HeaderComponent extends Component{
    toggleMobNav = () =>{
        document.getElementsByClassName("mobNav")[0].classList.toggle("mobNav_active");
        document.getElementById("ddNav").classList.toggle("slideIn");
    }
    render(){ 
       return(     
        <header>
            <Link to="/" className="logo"> <h3>RecipeSite</h3> </Link>
            <NavComponent {...this.props} />
            <div className="mobNav" onClick={()=> this.toggleMobNav() }>
                <p id="toggleMobNav">Menu</p>
                <div id="ddNav">
                    <NavComponent {...this.props} showMob={true} />
                </div>
            </div>
        </header>
        );
    }
}

export default HeaderComponent;