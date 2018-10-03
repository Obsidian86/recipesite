import React, { Component } from 'react';
import '../../styles/ShoppingList.css';


class ShoppingList extends Component{
    handleAddNew = () =>{
        if( document.getElementById("listBox").value !== ""){
            this.props.addShoppingList( document.getElementById("listBox").value );
            document.getElementById("listBox").value = "";
        }
    }
    render(){
        let list;
        if( this.props.shoppingList.length < 1){
            list = <li><p>No items added yet!</p></li>;
        }else{
            list = this.props.shoppingList.map( (iNeed, index) =>{
                return (
                <li key={index}>
                    <p className={ iNeed.status }>{iNeed.item}</p>
                    <button className={"btn"} onClick={ ()=> this.props.setGot(index) } >Got it!</button>
                    <button className={"btn btn_red"} onClick={ ()=> this.props.deleteListItem(index) }>Delete</button>
                </li>);
            });
        }
        return(
            <div id={"shoppingList"}>
                <h3>Shopping list</h3> 
                <ol> { list } </ol>
                <input type='text' placeholder='Add item to shopping list' id='listBox' className='textBlock'></input>
                <div className='btnGroup'>  
                <button className='btn' onClick={ () => this.handleAddNew() }>Add item</button>
                <button className='btn' onClick={ ()=> this.props.updateShoppingList() }>temp update</button>
                <button className='btn'>Send</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;