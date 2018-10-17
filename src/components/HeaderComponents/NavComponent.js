import React from 'react';
import { Link } from 'react-router-dom';

const NavComponent = (props) => {
    let nav = props.loggedIn ? 
            <nav>
                <Link to="/">{ props.showMob && <i id='searchIcon'></i> }<span> Search</span></Link>
                { props.hasSearched && 
                    <Link to="/results">{ 
                         props.showMob && 
                            <i id='resultsIcon'></i>
                        }<span>Results</span></Link>
                    }
                { props.loadSaved && 
                    <Link to="/saved"> 
                        {  props.showMob && <i id='savedIcon'></i> } <span>Saved recipes</span>
                    </Link>
                }
                
                <Link to="/list">{  props.showMob && <i id='listIcon'></i> }<span>Shopping list</span></Link>
                <Link to="/profile">{  props.showMob && <i id='profileIcon'></i> }<span>Profile</span></Link>
                <Link to="/" onClick={()=>{  props.logToggle(false) }}>{  props.showMob && <i id='logIcon'></i> }<span>Log out</span></Link>
            </nav> : 
            <nav><Link to="/"><i id='logIcon'></i><span>Log in</span></Link></nav>; 

        return(nav);
 
}

export default NavComponent;