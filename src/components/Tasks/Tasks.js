import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Tasks extends React.Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/tasks', {headers: { "Authorization" : localStorage.getItem('authToken') } })
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
  }

  render() {
    return (
      <div className="content">
      <table className="table">
            <thead>
                <tr>
                <th scope="col">Название</th>
                <th scope="col">Сложность</th>
                </tr>
            </thead>
            <tbody>
             { this.state.tasks.map(task => 
                <tr>
                <td>
                  <Link to={'/tasks/'+task.id}>{task.title}</Link>
                  </td>
                <td>{task.complexity}%</td>
                </tr>
              )}
            </tbody>
        </table>
      </div>
    )
  }
}