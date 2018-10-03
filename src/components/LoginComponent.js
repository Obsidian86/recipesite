import React, { Component } from 'react';

class LoginComponent extends Component{ 
    render(){
        return(
            <div className="mainContent">
              <h3>Log in to continue</h3>
              <form action='#'>
                <label htmlFor='username'>Username</label>
                <input type='text' className='textBlock' />
                <label htmlFor='password'>Password</label>
                <input type='password' className='textBlock' />
                <input type='submit' className='btn' onClick={()=>{this.props.logToggle(true)}} />
              </form>
            </div> 
        )
    }
}

export default LoginComponent;