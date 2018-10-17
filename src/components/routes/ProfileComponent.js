import React, {Component} from 'react';

class ProfileComponent extends Component{ 
    render(){  
        let {email} = this.props.profile;
        return(
            <div className='profile'>
                <h3>Your profile</h3>
                <p><strong>The email address used for emailing lists: </strong></p>
                <p><strong>{email}</strong> </p>
            </div>
        )
    }
}

export default ProfileComponent;