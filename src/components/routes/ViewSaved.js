import React, { Component } from 'react'; 
import ResultsComponent from './ResultsComponent';
import {Redirect} from 'react-router-dom';

class ViewSaved extends Component{

    constructor(props){
        super(props);
        this.state = ({
            savedRecipes: this.props.savedRecipes
        });
    }

    render(){ 
        if( this.state.savedRecipes.length < 1 ){
            return(<Redirect to="/" />);
        }else{

        }
    let recipeView = this.state.savedRecipes.length < 1 ? <h3> {"Loading..."} </h3> : 
        <ResultsComponent results={this.state.savedRecipes.hits} title={ "Your saved recipes" } {...this.props} />
    return( <div> { recipeView } </div>  );
        
    };
}

export default ViewSaved;  