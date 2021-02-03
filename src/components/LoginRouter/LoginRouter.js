import React from 'react'
import Login from '../Login'
import Signup from '../Signup'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


const LoginRouter = () => {
  return (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/signup" component={Signup}/>    
        <Redirect to='/'/>
        </Switch>
    </BrowserRouter>
  )
}

export default LoginRouter;