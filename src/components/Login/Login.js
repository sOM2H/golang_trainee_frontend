import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
const qs = require('qs');
import { Button, Input} from 'antd';
import { Link } from "react-router-dom";
import Logo from '../../img/logo.png'

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      token: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  responseGoogle = async(response) => {
    console.log(response);
    await axios.post('http://localhost:8585/api/users/oauth_google', qs.stringify({token: response['tokenId']}))
      .then(res => {
        const token = res.data['user']['token'];
        this.setState({ token });
      })
    localStorage.setItem('authToken', this.state.token);
    location.reload();
  }

  onSubmit = async() => {
     await axios.post('http://localhost:8585/api/users/login', qs.stringify({email: this.state.login, password: this.state.password}))
      .then(res => {
        const token = res.data['user']['token'];
        this.setState({ token });
      })
    localStorage.setItem('authToken', this.state.token);
    location.reload();
  }
  
  render() {
    return (
      <div className="form-signin text-center">
        <img className="mb-4 " src={ Logo } alt=""/>
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
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
            Login
        </Button>
        <GoogleLogin
          clientId="1028306666002-i7m38n0j1u5lukp2o63avotnvqiaujnt.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          className="btn btn-lg btn-primary btn-block actions"
        />
        <p className="mt-5 mb-3 text-muted">Еще не зарегистированы?</p>
        <Link to="/signup" className="nav-link">Регистрация</Link>
        <p className="mt-5 mb-3 text-muted">Nix | Mikhail Melnyk © 2021</p>
      </div>
    )
  }
}