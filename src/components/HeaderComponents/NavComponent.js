import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NavComponent extends Component{

    render(){
        let nav = this.props.loggedIn ? 
            <nav>
                <Link to="/">{ this.props.showMob ? <i id='searchIcon'></i> : null }<span> Search</span></Link>
                { this.props.hasSearched ? 
                    <Link to="/results">{ 
                        this.props.showMob ? 
                            <i id='resultsIcon'></i> 
                        : null }<span>Results</span></Link> 
                : null }
                <Link to="/saved">
                    { this.props.showMob ? <i id='savedIcon'></i> : null } <span>Saved recipes</span>
                </Link>
                <Link to="/list">{ this.props.showMob ? <i id='listIcon'></i> : null }<span>Shopping list</span></Link>
                <Link to="/profile">{ this.props.showMob ? <i id='profileIcon'></i> : null }<span>Profile</span></Link>
                <Link to="/" onClick={()=>{ this.props.logToggle(false) }}>{ this.props.showMob ? <i id='logIcon'></i> : null }<span>Log out</span></Link>
            </nav> : 
            <nav><Link to="/"><i id='logIcon'></i><span>Log in</span></Link></nav>; 

        return(nav);
    }
}

export default NavComponent;