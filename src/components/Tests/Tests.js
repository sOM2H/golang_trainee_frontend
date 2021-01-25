import React from 'react'
import axios from 'axios';

export default class Tests extends React.Component {
  state = {
    tests: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/tests')
      .then(res => {
        const tests = res.data;
        this.setState({ tests });
      })
  }

  render() {
    return (
      <ul className="list-group">
        { this.state.tests.map(test => 
        <li className="list-group-item">{test.task_id}</li>
        )}
      </ul>
    )
  }
}