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
      <section className="section">
        <div className="container narrow">
            <h1>Log in</h1>
            <form
            method="post"
            onSubmit={event => {
                this.handleSubmit(event)
                navigate(`/app/profile`)
            }}
            >
            <label className="label">
                Username
                <input type="text" name="username" onChange={this.handleUpdate} />
            </label>
            <label className="label">
                Password
                <input
                type="password"
                name="password"
                onChange={this.handleUpdate}
                />
            </label>
            <input type="submit" value="Log In" />
            </form>
        </div>
      </section>
    )
  }
}
export default Login