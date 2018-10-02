import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SearchComponent from './routes/SearchComponent';
import ResultsComponent from './routes/ResultsComponent';
import ViewCompnonent from './routes/ViewComponent'; 
import ViewSaved from './routes/ViewSaved'; 

class MainBodyComponent extends Component{

    constructor(){
        super();
        this.state = ({
            recipes: [],
            savedRecipes: "",
            viewRec: "",
            viewList: "",
            searchDone: false
        });
    }
 
    onClick = (event, foodsez)=>{  
        this.setState({ searchDone: true });
        fetch('/search', {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                "searchFor": foodsez
            })
        }) 
        .then( resp => resp.json() )
        .then( resp => { 
            this.setState({ recipes: resp.hits });
            this.props.updateSearch();
        }); 
    }

    updateSaved=()=>{
        fetch("/gr")
        .then((response) => {  
            return response.json(); 
        }) 
        .then((data) => { 
            this.setState({ savedRecipes: data });
        })
    }

    componentWillMount(){ this.updateSaved(); }

    setViewRec=(thisRec, viewList)=>{
        this.setState({ 
            viewRec: thisRec,
            viewList: viewList
        });
    }

    render(){ 
            return(
                <div className="mainContent">
                    <Route exact path="/" render={(props) => <SearchComponent onClick={this.onClick} /> }/>
                    <Route exact path="/results" render={ (props) => <ResultsComponent results={this.state.recipes} title={"Recipes"} setViewRec={this.setViewRec} savedRecipes={ this.state.savedRecipes } searchDone={ this.state.searchDone } /> } />
                    <Route exact path="/view" render={ (props) => <ViewCompnonent results={this.state.recipes} viewRec={ this.state.viewRec } viewList={this.state.viewList} savedRecipes={ this.state.savedRecipes } updateSaved={this.updateSaved} /> } />
                    <Route exact path="/saved" render={ (props) => <ViewSaved savedRecipes={ this.state.savedRecipes } setViewRec={this.setViewRec} updateSaved={this.updateSaved} /> } />
                </div>
            ); 
    }
}

export default MainBodyComponent; 