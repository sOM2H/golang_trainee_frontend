import React from 'react'
import Task from '../Task';
import Tasks from '../Tasks';
import Request from '../Request';
import Requests from '../Requests';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';


const Router = () => {
  return (
    <BrowserRouter>
        <Header />
        <Switch>
        <Route exact path="/" component={() => ([])}/>    
        <Route exact path='/tasks' component={Tasks} />
        <Route path='/tasks/:task' component={Task} />
        <Route exact path='/requests' component={Requests} />
        <Route path='/requests/:request' component={Request} />
        <Redirect to='/'/>
        </Switch>
    </BrowserRouter>
  )
}

export default Router;