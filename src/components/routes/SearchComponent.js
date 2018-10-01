import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchComponent extends Component{ 
    handleClick = (event) =>{ 
        //event.preventDefault();
        this.props.onClick(event, this.searchField); 
    }
    handleChange = (event) =>{
        this.searchField = event.target.value;
    }
    render(){
        return(
            <div>
                <h3>Find new recipes!</h3>
                <input type='text' onChange={ this.handleChange } placeholder='search recipe or ingredients' id="searchBox" />
                <Link to='results'><button onClick={ this.handleClick } className='btn'>Search</button></Link>
            </div>
        );
    }
}

export default SearchComponent;