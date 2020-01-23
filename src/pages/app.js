import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Agency from "../components/agency"
import Login from "../components/login"
const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/agency" component={Agency} />
      <Login path="/app/login" />
    </Router>
  </Layout>
)
export default App