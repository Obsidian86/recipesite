    import React, { Component } from 'react';

class LoginComponent extends Component{
    constructor(){
        super();
        this.state =({
            logForm: true
        })
    } 
    toggleForm = () =>{
        this.setState({ logForm: !this.state.logForm });
    }
    componentWillUnmount(){
        if( this.props.message.text !==""){
            this.props.updateMessage("", "m_green");
        } 
    }
    render(){
        let {logForm} = this.state; 
        return(
            <div className="mainContent">
                {this.props.message.text !== '' && <div id='message' className={this.props.message.cName}> <p>{ this.props.message.text}</p> </div> }
              <h3>{ logForm ? "Log in to continue" : "Register new account" } </h3>
              <form action='#'>
                <label htmlFor='usernameField'>Email address</label>
                <input type='email' className='textBlock' id="usernameField" required="required" autoComplete="on" placeholder="email@email.com" />
                <label htmlFor='passwordField'>Password</label>
                <input type='password' className='textBlock' id="passwordField" required="required" autoComplete="on" placeholder="*****" />
                { !logForm && 
                    <span>
                        <label htmlFor='passwordField'>Re-Type password</label>
                        <input type='password' className='textBlock' id="rePasswordField" required="required" autoComplete="new-password" placeholder="*****" /> 
                    </span>}
                <br /> 
                <div className='btnGroup'> 
                    <input type='submit' className='btn' onClick={(event)=>{
                        event.preventDefault();
                        if(logForm){
                            this.props.logToggle(true, document.getElementById("usernameField").value, document.getElementById("passwordField").value)
                        }else{
                            this.props.logToggle(true, document.getElementById("usernameField").value, document.getElementById("passwordField").value, document.getElementById("rePasswordField").value)
                        }
                        
                        }} value="Submit" />
                    { logForm ? 
                        <button className="btn" onClick={(event)=>{ event.preventDefault(); this.toggleForm(); }}>Sign up</button> : 
                        <button className="btn btn_red" onClick={(event)=>{ event.preventDefault(); this.toggleForm(); }}>Back</button>
                        }
                    
                </div>
                <br />
              </form>
            </div> 
        )
    }
}

export default LoginComponent;