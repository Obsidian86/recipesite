import React, {Component} from 'react';

class ErrorComponent extends Component{  
    render(){ 
        return(
            <div id='message' className={this.props.message.cName}> <p>{this.props.message.text}</p> </div>
        )
    } 
}

export default ErrorComponent;