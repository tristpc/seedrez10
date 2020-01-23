import React from "react"
import { getUser } from "../services/auth"

const Agency = () => (
  <section className="section">
    <div className="container">
        <h1>Agency contacts</h1>
        <ul>
        <li>Name: {getUser().name}</li>
        <li>E-mail: {getUser().email}</li>
        <li>Agency: {getUser().agency}</li>
        </ul>
    </div>
  </section>
)
export default Agency