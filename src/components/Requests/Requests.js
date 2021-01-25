import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


export default class Requests extends React.Component {
  state = {
    requests: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/requests', {headers: { "Authorization" : localStorage.getItem('authToken') } })
      .then(res => {
        const requests = res.data;
        this.setState({ requests });
      })
  }

  render() {
    return (
      <div className="content">
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th scope="col">№</th>
                <th scope="col">Дата</th>
                <th scope="col">Пользователь</th>
                <th scope="col">Задача</th>
                <th scope="col">Язык</th>
                <th scope="col">Результат</th>
                <th scope="col">Тест</th>
                </tr>
            </thead>
            <tbody>
             { this.state.requests.map(request => 
                <tr class={request.status === "Passed" ? "table-success" : (request.status === "Queue" ? "table-dark" : "table-danger")}>
                  <td scope="row">
                    <Link to={'/requests/'+request.id}>{request.id}</Link>
                  </td>
                  <td>
                    {request.created_at}
                  </td>
                  <td>
                    {request.user}
                  </td>
                  <td>
                     <Link to={'/tasks/'+request.task_id}>{request.task}</Link>
                  </td>
                  <td>
                    {request.language}
                  </td>
                  <td class={request.status === "Passed" ? "passed" : (request.status === "Queue" ? "queue" : "failed")}>
                    {request.status}
                  </td>
                  <td >
                    {request.logs}
                  </td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    )
  }
}