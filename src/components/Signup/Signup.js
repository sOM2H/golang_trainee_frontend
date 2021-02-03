import React from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
const qs = require('qs');
import { Button, Input} from 'antd';
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      token: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  onSubmit = async() => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
     await axios.post('http://localhost:8585/api/users', qs.stringify({email: this.state.login, password: this.state.password}))
      .then(res => {
        const token = res.data['user']['token'];
        this.setState({ token });
      })
    console.log({email: this.state.login, password: this.state.password});
    localStorage.setItem('authToken', this.state.token);
    location.reload();
  }
  
  render() {
    return (
      <div className="form-signin text-center">
        <img className="mb-4 " src={ Logo } alt=""/>
        <h1 className="h3 mb-3 font-weight-normal">Регистрация</h1>
        <Input
          className="form-control filed"
          name='login'
          placeholder='Login'
          required='True'
          onChange={e => this.onChange(e)}
          value={this.state.login} />
        <Input
          className="form-control field"
          name='password'
          placeholder='Password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password} />
        <Button onClick={() => this.onSubmit()}
          type="primary"
          className="btn btn-lg btn-primary btn-block actions">
            Зарегистироваться
        </Button>
         <GoogleLogin
          clientId="1028306666002-i7m38n0j1u5lukp2o63avotnvqiaujnt.apps.googleusercontent.com"
          buttonText="Sign up"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <FacebookLogin
          appId="2621273511455529"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} 
        />
        <p className="mt-5 mb-3 text-muted">Уже есть аккаунт?</p>
        <Link to="/" className="nav-link">Вход</Link>
        <p className="mt-5 mb-3 text-muted">Nix | Mikhail Melnyk © 2021</p>
      </div>
    )
  }
}