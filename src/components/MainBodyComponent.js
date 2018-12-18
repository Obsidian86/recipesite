import React, { Component } from 'react'; 
import { Route, Switch, Redirect } from 'react-router-dom';
import SearchComponent from './routes/SearchComponent';
import ResultsComponent from './routes/ResultsComponent';
import ViewCompnonent from './routes/ViewComponent'; 
import ViewSaved from './routes/ViewSaved'; 
import ShoppingList from './routes/ShoppingList'; 
import ProfileComponent from './routes/ProfileComponent'; 
import ErrorComponent from './ErrorComponent';
import { apiCall } from '../services/api';

class MainBodyComponent extends Component{

    constructor(){
        super();
        this.state = ({
            recipes: [],
            savedRecipes: "",
            viewRec: "",
            viewList: "",
            searchDone: false,
            shoppingList: []
        });
    }
    //Initial Search
    onClick = async (event, foodsez)=>{ 
        this.setState({searchDone: true}); 
        let searchRecipes = await apiCall("POST", `gr/${this.props.profile.id}/search`,  {"Authorization": `Bearer: ${sessionStorage.getItem('ax')}`}, {"searchFor": foodsez });
        this.setState({ recipes: searchRecipes.hits });
        this.props.updateSearch(); 
    }
    updateSaved = async () =>{ 
        let url = `gr/${this.props.profile.id}/getrecipes`;
        let getSaved = await apiCall("GET", url, {"Authorization": `Bearer: ${sessionStorage.getItem('ax')}`}, false); 
        let parseRecs = getSaved.hits.map(rec => {return {recipe: rec};}); 
        this.setState({ savedRecipes: parseRecs }); 
        this.props.setLoaded( getSaved.hits.length > 0 ); 
    } 
    serverList = async (command) =>{   
        let url = `sl/${this.props.profile.id}/${command}`;
        let body = { "list": this.state.shoppingList };
        if( command === "sendlist"){
            body.sendTo = this.props.profile.email;
        }
        let listAction = await apiCall("POST", url, {"Authorization": `Bearer: ${sessionStorage.getItem('ax') }`}, body);
        return(listAction);
    }
    snycList = async() =>{
       if( this.state.shoppingList.length < 1){
            let getList = await apiCall("GET", `sl/${this.props.profile.id}/getlist`, {"Authorization": `Bearer: ${sessionStorage.getItem('ax') }`}, null);
            getList.length > 0 && this.setState({ shoppingList: getList });
       }       
    }
    addShoppingList = (newItem)=>{
        let tList = this.state.shoppingList;
        tList.push({item: newItem, status: "need"});
        this.setState({ shoppingList: tList });
    }
    deleteListItem = (thisItem)=>{
        if( thisItem === "all"){
            if(window.confirm("Are you sure you want to clear this list?")){
                this.setState({
                    shoppingList: []
                })
            }
        }else{
            this.setState({
                shoppingList: this.state.shoppingList.filter((item, index)=> index !== thisItem )
            });
        }
        
    }
    componentWillMount(){ 
        this.updateSaved(); 
        this.snycList();
    }
    setViewRec=(thisRec, viewList)=>{
        this.setState({ 
            viewRec: thisRec,
            viewList: viewList
        });
    }
    setGot = (thisItem) =>{ 
        let tList = this.state.shoppingList;
        if(tList[thisItem].status === "need"){
            tList[thisItem].status = "got";
        }else{
            tList[thisItem].status = "need";
        }
        this.setState({ shoppingList: tList });
    }   
    render(){  
            return( 
                <div className="mainContent">
                    {this.props.message.text !== '' && <ErrorComponent message={this.props.message} updateMessage={this.props.updateMessage} /> }
                   
                   <Switch>
                    <Route exact path="/" render={() => 
                            <SearchComponent 
                                onClick={this.onClick} 
                            /> 
                        }
                    />
                    <Route exact path="/results" render={ () => 
                            <ResultsComponent 
                                results={this.state.recipes} 
                                title={"Recipes"} 
                                setViewRec={this.setViewRec} 
                                savedRecipes={ this.state.savedRecipes } 
                                searchDone={ this.state.searchDone } 
                            /> 
                        } 
                    />
                    <Route exact path="/view" render={ () => 
                            <ViewCompnonent 
                                results={this.state.recipes} 
                                viewRec={ this.state.viewRec } 
                                viewList={this.state.viewList} 
                                savedRecipes={ this.state.savedRecipes } 
                                updateSaved={this.updateSaved} 
                                addShoppingList={this.addShoppingList}
                                profile={this.props.profile}
                                serverList={this.serverList}
                                updateMessage={this.props.updateMessage}
                                message={this.props.message}
                            /> 
                        } 
                    />
                    <Route exact path="/saved" render={ () => 
                            <ViewSaved 
                                savedRecipes={ this.state.savedRecipes } 
                                setViewRec={this.setViewRec} 
                                updateSaved={this.updateSaved} 
                            /> 
                        } 
                    />
                    <Route exact path="/list" render={ () => 
                            <ShoppingList 
                                shoppingList={ this.state.shoppingList }    
                                deleteListItem ={ this.deleteListItem } 
                                addShoppingList={this.addShoppingList} 
                                setGot={this.setGot}
                                updateMessage={this.props.updateMessage}
                                serverList={this.serverList}
                                message={this.props.message}
                                {...this.props}
                            />
                        }  
                    />
                    <Route exact path="/profile" render={() =>
                        <ProfileComponent {...this.props} />
                    } />

                    <Route render={() => <Redirect to="/" />} />
                    </Switch>
                </div> 
            ); 
    }
}

export default MainBodyComponent; 