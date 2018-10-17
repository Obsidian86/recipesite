import React, {Component} from 'react'; 
import { Link, Redirect } from 'react-router-dom';

class ViewCompnonent extends Component{
    constructor(props){
        super(props);  

        if(this.props.viewList === "recipes"){
            this.backButton = <Link to='results' className='btn btn_red'>Back to results </Link>
            this.filtList = this.props.results;
        }else{
            this.backButton = <Link to='saved' className='btn btn_red'>Back to results </Link>
            this.filtList = this.props.savedRecipes.hits;
        }

        if( this.props.viewRec !== ""){
            this.gRecipe = () => {
                for(let i=0; i< this.filtList.length; i++){
                    if(this.filtList[i].recipe.uri === this.props.viewRec){
                        return( this.filtList[i].recipe); 
                    }
            } }
            this.viewRecipe = this.gRecipe();
        }
        this.state = ({
            recipeId: this.props.viewRec,
            recSaved: false
        }); 
    }  

    componentWillMount(){ 
        if( this.props.viewRec !== ""){
            for(let i=0; i<this.props.savedRecipes.hits.length; i++){
                if(this.props.viewRec === this.props.savedRecipes.hits[i].recipe.uri ){
                    this.setState({ recSaved: true })
                }
            } 
        }
    }
    componentWillUnmount(){
        if( this.props.message.text !==""){
            this.props.updateMessage("", "m_green");
        } 
    }
    addRecipe(recipeAdd){ 
        let toSend = {
            account: this.props.profile.email,
            uri: recipeAdd.uri,
            label: recipeAdd.label,
            image: recipeAdd.image,
            source: recipeAdd.source,
            url: recipeAdd.url,
            shareAs: recipeAdd.shareAs,
            yield: recipeAdd.yield,
            dietLabels: recipeAdd.dietLabels,
            ingredients: recipeAdd.ingredients
        }  
        fetch('/gr', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(toSend) 
            }).then(resp =>{
                return(resp.json())
            }).then(resp => {
                this.setState({recSaved: true})
                this.props.updateSaved();
            })
    }
    removeRecipe(recipeDelete){
        if(window.confirm("Do you want to remove this recipe?")){
            let toSend = {
                account: this.props.profile.email,
                deleteRecipe: recipeDelete
            }
            fetch('/gr', {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                      },
                    body: JSON.stringify(toSend) 
                }).then(resp =>{
                    return(resp.json())
                }).then(data =>{
                    this.setState({ recSaved: false})
                    this.props.updateSaved();
                })
        } 
    }
    addIngredients(){
        for(let i=0; i<this.viewRecipe['ingredients'].length; i++){
            this.props.addShoppingList( this.viewRecipe['ingredients'][i].text )
        }
        this.props.serverList("savelist"); 
        this.props.updateMessage("Items have been added", "m_green");
    }

    render(props){ 
        if(this.state.recipeId === ""){
            return(<Redirect to="/" />);
        } else{
            const ingredients = this.viewRecipe["ingredients"].map((ing, index) => <li key={index}> {ing.text} </li>); 
            let saveButton = this.state.recSaved ? <button className="btn btn_blue" onClick={ (event)=>{ event.preventDefault(); this.removeRecipe(this.state.recipeId)} } >Remove recipe</button>
                : <button className="btn btn_blue" onClick={ (event)=>{ event.preventDefault(); this.addRecipe(this.viewRecipe)} } >Save recipe</button>;
    
            return(
                <div className="viewRecipe" >
                    <h3>View recipe </h3>
                    <img src={this.viewRecipe.image} alt='food'/>
                    <h1>{ this.viewRecipe.label }</h1>
                    <ul>{ ingredients }</ul>
                    <div className='btnGroup'> 
                        { this.backButton }
                        <a href={ this.viewRecipe.url } className='btn' target="_blank">Go to recipe</a> 
                        <button className='btn' onClick={()=> this.addIngredients() }>Add to list</button>
                        { saveButton }
                    </div>
                </div>
            );
        }

    }
    
}

export default ViewCompnonent;

 