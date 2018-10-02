import React, { Component } from 'react';
import '../../styles/ShoppingList.css';


class ShoppingList extends Component{
    
    render(){
        let list;
        if( this.props.shoppingList.length < 1){
            list = <li><p>No items added yet!</p></li>;
        }else{
            list = this.props.shoppingList.map( (iNeed, index) =>{
                return (
                <li key={index}>
                    <p>{iNeed.item}</p>
                    <button className={"btn"}>Got it!</button>
                    <button className={"btn btn_red"} onClick={ ()=> this.props.deleteListItem(index) }>Delete</button>
                </li>);
            });
        }
        
        return(
            <div id={"shoppingList"}>
                <h3>Shopping list</h3> 
                <ol> { list } </ol>
                <div className='btnGroup'> 
                <button className='btn' onClick={ ()=> this.props.updateShoppingList() }>Add item</button>
                <button className='btn'>Send</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;