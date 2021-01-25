import React from 'react'
import axios from 'axios';
import AceEditor from 'react-ace';
import { Link } from "react-router-dom";
import './Task.css';

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/monokai'

const config = {headers: { "Authorization" : localStorage.getItem('authToken') }};

export default class Task extends React.Component {
  state = {
    task: [],
    tests: [],
    requests: [],
    languages: [],
    language: 1,
    body: ""
  }

  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {   
    axios.get('http://localhost:3001/api/v1/tasks/'+this.props.match.params.task, config)
      .then(res => {
        console.log(res.data)

        const task = res.data["task"];
        this.setState({ task });

        const requests = res.data["requests"];
        this.setState({ requests });

        const tests = res.data["tests"];
        this.setState({ tests });
      })

    axios.get('http://localhost:3001/api/v1/languages', config)
      .then(res => {
        const languages = res.data;
        this.setState({ languages });
      })
  }

  onChange(newValue) {
    this.state.body = newValue
  }

  handleChange(event) {
    const language = event.target.value;
    this.setState({ language });
  }

  send = async() => {
     await axios.post('http://localhost:3001/api/v1/requests',{
                        body: this.state.body,
                        language_id: this.state.language,
                        task_id: this.state.task.id },
                        config)
      .then(res => {
        location.replace('/requests')
      }).catch(err => {
        console.log(err.response.data)
      })
  }

  render() {
    return (
      <div className="content">
        <div className="card">
          <div className="card-header">
            <h3>{ this.state.task.title }</h3>
          </div>
          <div className="card-body">
            <h5 className="card-title">Условие:</h5>
            <p className="card-text">
              { this.state.task.body }
            </p>
            <h5 className="card-title">Входные данные:</h5>
              <p className="card-text">
                { this.state.task.input }
              </p>
            <h5 className="card-title">Выходные данные:</h5>
              <p className="card-text">
                { this.state.task.output }
              </p>
          </div>
        </div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">input.txt</th>
                <th scope="col">output.txt</th>
                </tr>
            </thead>
            <tbody>
             { this.state.tests.map(test => 
                <tr>
                <td><textarea readOnly className="form-control" value={test.body} rows="5"/></td>
                <td><textarea readOnly className="form-control" value={test.answer} rows="5"/></td>
                </tr>
              )}
            </tbody>
        </table>
        <h3>Отправить Решение:</h3>
        <div className="form-group">
          <label>Выберете язык:</label>
          <select className="form-control" id="exampleFormControlSelect1" defaultValue={this.state.language} onChange={this.handleChange}>
            { this.state.languages.map(language => 
                <option value={language.id}>{language.name}</option>
              )}
            </select>
          </div>
        <br/>
        <AceEditor
          placeholder=""
          mode="ruby"
          theme="monokai"
          name="blah2"
          width="100%"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={``}
          setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          }}/>
          <br/>
          <Link to="#" onClick={() => this.send()} className="btn btn-outline-success">Отправить</Link>
          <br/>
          <h3>Решения:</h3>
          <br/>
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