import React from 'react'
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import HeaderLogo from '../../img/header.png'


class Header extends React.Component {
  logout = () => {
    localStorage.removeItem('authToken');
    const { history } = this.props;
    console.log(history);
    location.reload();
  }

  render() {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div className="container">
        <Link to="/" className="nav-link">
          <img src={ HeaderLogo } alt=""/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">Главная</Link>
            </li>
            <li className="nav-item active">
              <Link to="/requests" className="nav-link">Отправки</Link>
            </li>
            <li className="nav_item active">
              <Link to="/tasks" className="nav-link">Задачи</Link>
            </li>
            <li className="nav_item active">
              <Link to="/" onClick={() => this.logout()} className="nav-link">Выход</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

export default withRouter(Header);