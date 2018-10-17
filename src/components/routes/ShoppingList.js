import React, { Component } from 'react';
import '../../styles/ShoppingList.css';


class ShoppingList extends Component{ 
    handleAddNew = () =>{
        if( document.getElementById("listBox").value !== ""){
            this.props.addShoppingList( document.getElementById("listBox").value );
            document.getElementById("listBox").value = "";
        }
    }
    componentWillUnmount(){
        if( this.props.message.text !==""){
            this.props.updateMessage("", "m_green");
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
                    <button className={"btn"} onClick={ ()=> {this.props.setGot(index); this.props.serverList("savelist") }} >Got it!</button>
                    <button className={"btn btn_red"} onClick={ async () => { 
                        await this.props.deleteListItem(index); 
                        this.props.serverList("savelist") }}>Delete</button>
                </li>);
            });
        }
        return(
            <div id="shoppingList">
                <h3>Shopping list</h3> 
                <ol> { list } </ol>
                <input type='text' placeholder='Add item to shopping list' id='listBox' className='textBlock'></input>
                <div className='btnGroup'>  
                    <button className='btn' onClick={ ()=> {this.handleAddNew(); this.props.serverList("savelist") }}>Add item</button>
                    <button className='btn btn_blue' onClick={ ()=> this.props.serverList("sendlist") }>Send</button>
                    <button className='btn btn_red' onClick={ async ()=> { await this.props.deleteListItem("all"); this.props.serverList("savelist") } }>Clear List</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;