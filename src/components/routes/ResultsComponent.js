import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';


class ResultsComponent extends Component{

    constructor(){
        super();
        this.state = ({
            viewList: "saved"
        });
    }

    handleClick(thisRec){
        this.props.setViewRec(thisRec, this.state.viewList); 
    }
    componentWillMount(){
        if( this.props.title === "Recipes" ){ 
            this.setState({ viewList: "recipes"})
        }else{
            this.setState({viewList: "saved"})
        }
    }
    checkExists(thisRec){ 
        let cl = "recipeCard"; 
        for(let i=0; i< this.props.savedRecipes.hits.length; i++){ 
            if(this.props.savedRecipes.hits[i].recipe.uri === thisRec){
                cl += " isSaved";
            }
        }
        return(cl);
    }
    render(props){   
           //If list is search check if search btn was pressed 

           if( this.state.viewList === "recipes"){
                if( !this.props.searchDone){
                    return(<Redirect to="/" />); 
                }
           }
            if( this.props.results.length < 1 && this.state.viewList === "saved"){
                return(<Redirect to="/" />);
            }else{
                let results = this.props.results.map((recipe, index) => { 
                    return(
                        <li className={ this.checkExists(recipe["recipe"].uri) } key={ index }>
                            <div className="imgCont"><img src={recipe["recipe"].image} alt='food' /></div>
                            <p className="title">{recipe["recipe"].label}</p> 
                            <Link to ={`view`}>
                                <button className="btn" onClick={ ()=>{ this.handleClick(recipe["recipe"].uri); } }>view recipe</button>
                            </Link>
                        </li>
                    ); 
                });
                return(
                    <div> 
                        <h3>{ this.props.title }</h3>
                        <ul className="recResults">{ results }</ul>
                    </div>
                );
            } //End IF
    }
}

export default ResultsComponent;