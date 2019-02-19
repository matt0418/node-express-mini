import React from 'react'
import axios from 'axios'
import UserInfo from './UserInfo'
import { withRouter, Route } from 'react-router-dom'

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
                        <UserInfo user={user} key={index}/>
                    )
                })}
            </div>
        )
    }
}

const UsersWithRouter = withRouter(Users)
export default UsersWithRouter