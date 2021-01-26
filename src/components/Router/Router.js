import React from 'react'
import Posts from '../Posts'
import Post from '../Post'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';


const Router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={() => ([])}/>    
        <Route exact path='/posts' component={Posts} />
        <Route path='/posts/:post' component={Post} />
        <Redirect to='/'/>
        </Switch>
    </BrowserRouter>
  )
}

export default Router;