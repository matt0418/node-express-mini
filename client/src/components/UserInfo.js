import React from 'react'
import axios from 'axios'

class UserInfo extends React.Component {
    constructor() {
        super();
    }


    render() {
        return(
            <div>
                <strong><p>{this.props.user.name}</p></strong>
                <p>{this.props.user.bio}</p>
            </div>
        )
    }
}

export default UserInfo