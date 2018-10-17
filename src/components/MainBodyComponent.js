import React, { Component } from 'react'; 
import { Route } from 'react-router-dom';
import SearchComponent from './routes/SearchComponent';
import ResultsComponent from './routes/ResultsComponent';
import ViewCompnonent from './routes/ViewComponent'; 
import ViewSaved from './routes/ViewSaved'; 
import ShoppingList from './routes/ShoppingList'; 
import ProfileComponent from './routes/ProfileComponent'; 
import ErrorComponent from './ErrorComponent';

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
    onClick = (event, foodsez)=>{  
        this.setState({ searchDone: true });
        fetch('gr/search', {
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
        fetch(`/gr/${this.props.profile.id}/getrecipes`, {
            method: "GET",
            headers: {'Content-Type':'application/json', 'Accept': 'application/json', "Authorization": `Bearer: ${this.props.profile.auth}`}
        })
        .then((response) => {  
            return response.json(); 
        }) 
        .then((data) => { 
            this.setState({ savedRecipes: data }); 
            console.log( data);
            if( data.hits.length > 0){
                this.props.setLoaded(true);
            }else{
                this.props.setLoaded(false);
            }
        })
    } 
    serverList = (command) =>{ 
        fetch(`/sl/${command}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                "list": this.state.shoppingList,
                "sendTo": this.props.profile.email
            })
        })
        .then(resp => resp.json())
        .then(resp =>{ 
            if( resp.sent !== "ok" ){
                this.props.updateMessage(resp.sent, "m_green");
            } 
        })
        .catch(err =>{
            this.props.updateMessage("There was a problem. Please try again.", "m_red");
        })  
    }
    snycList = () =>{
       /* if( this.state.shoppingList.length < 1){
            fetch(`sl/getlist/${this.props.profile.email}`) 
            .then( resp => resp.json() )
            .then( resp => {
                resp.list.length > 0 && this.setState({ shoppingList: resp.list });
            })
        } */
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
                </div> 
            ); 
    }
}

export default MainBodyComponent; 