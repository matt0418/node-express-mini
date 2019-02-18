import React from 'react'
import axios from 'axios'

class Users extends React.Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:4000/api/users`)
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return(
            <div>
                {this.state.users.map((user, index) => {
                    return(
                        <div key={index}>
                            <p>Name: {user.name}</p>
                            <p>Bio: {user.bio}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default Users