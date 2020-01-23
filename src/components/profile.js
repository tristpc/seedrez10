import React from "react"
import { getUser } from "../services/auth"

const Profile = () => (
  <section className="section">
    <div className="container">
        <h1>Your profile</h1>
        <ul>
        <li>Name: {getUser().name}</li>
        <li>E-mail: {getUser().email}</li>
        </ul>
    </div>
  </section>
)
export default Profile