import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Register from './components/pages/Register'
import Me from './components/pages/Me'

export default function App() {
  return (
    <>
      <h1>Hello world</h1>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/me">
        <Me />
      </Route>

      <Route exact path="/">
        <Redirect to="/me" />
      </Route>
    </>
  )
}
