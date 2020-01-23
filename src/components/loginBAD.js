import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
import './login.css'

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }
  render() {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }
    return (
      <>
        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            this.handleSubmit(event)
            navigate(`/app/profile`)
          }}
        >

          <div className="container">
            <label for="uname"><b>Email address</b></label>
            <input type="text" placeholder="Enter Email" name="username" onChange={this.handleUpdate} required/>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange={this.handleUpdate} required />

            <button type="submit">Log In</button>
            <label>
              <input type="checkbox" checked="checked" name="remember"> Remember me </input>
            </label>
          </div>

        </form>
      </>
    )
  }
}
export default Login