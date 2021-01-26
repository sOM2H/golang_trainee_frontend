import React from 'react'
import axios from 'axios';
import AceEditor from 'react-ace';
import { Link } from "react-router-dom";

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/monokai'

const config = {headers: { "Authorization" : localStorage.getItem('authToken') }};

export default class Post extends React.Component {
  state = {
    post: [],
    comments: [],
    commentsCount: 0
  }

  constructor(props, context) {
    super(props, context);

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {   
    axios.get('http://localhost:8585/api/posts/'+this.props.match.params.post, config)
      .then(res => {

        const post = res.data["post"];
        this.setState({ post });
      })

    axios.get('http://localhost:8585/api/comments/'+this.props.match.params.post, config)
      .then(res => {
        const comments = res.data["comments"];
        const commentsCount = res.data["commentsCount"];

        this.setState({ comments });
        this.setState({ commentsCount });
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
       <div className="card" style={{marginBottom: 20}}>
            <div className="card-header">
                <h3>{this.state.post.title}</h3>
            </div>
             <div className="card-body">
                <p>{this.state.post.body}</p>
            </div>
        </div>
        { this.state.commentsCount !== 0 ? <h2>Comments</h2>  : "" }
            { this.state.comments.map(comment =>
        <div className="card" style={{marginBottom: 20}}>
             <div className="card-body">
                <p>{comment.body}</p>
            </div>
        </div>
        )}
      </div>
    )
  }
}