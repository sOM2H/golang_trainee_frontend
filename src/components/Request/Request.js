import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


export default class Request extends React.Component {
  state = {
    request: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/requests/'+this.props.match.params.request, {headers: { "Authorization" : localStorage.getItem('authToken') } })
      .then(res => {
        const request = res.data;
        this.setState({ request });
      })
  }

  render() {
    return (
      <div className="content">
      <p>{this.state.request.id}</p>
      <p>{this.state.request.user}</p>
      <p>Language: {this.state.request.language}</p>
       <p class={this.state.request.status === "Passed" ? "passed" : (this.state.request.status === "Queue" ? "queue" : "failed")}>
                    {this.state.request.status}
                  </p>
      <Link to={'/tasks/'+this.state.request.task_id}>{this.state.request.task}</Link>
      <textarea readOnly className="form-control" value={this.state.request.body} rows="5"/>
      <p>{this.state.request.created_at}</p>
      </div>
    )
  }
}