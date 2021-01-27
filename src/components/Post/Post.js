import React from 'react'
import axios from 'axios';
import AceEditor from 'react-ace';
const qs = require('qs');
import { Link } from "react-router-dom";
import { Button, Input} from 'antd';

import 'brace/mode/javascript'
import 'brace/mode/ruby'
import 'brace/theme/monokai'

const config = {headers: { "Authorization" : localStorage.getItem('authToken') }};

export default class Post extends React.Component {
  state = {
    post: [],
    comments: [],
    commentsCount: 0,
    body: ""
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async() => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
     await axios.post('http://localhost:8585/api/comments', qs.stringify({body: this.state.body, post_id: this.props.match.params.post}), config)
        .then(res => {
      location.reload();
      })
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
        <h3>Add Comment</h3>
         <div className="form-group">
        <textarea
          name='body'
          placeholder='Body'
          className="form-control"
          id="exampleFormControlTextarea1"
          style={{marginBottom: 50}}
          onChange={e => this.onChange(e)}
          value={this.state.body} />
        <Button onClick={() => this.onSubmit()}
          type="primary"
          className="btn btn-lg btn-primary btn-block actions">
            Create Comment
        </Button>
        </div>
        { this.state.commentsCount !== 0 ? <h2>Comments</h2>  : null }
            { this.state.comments.map(comment =>
        <div className="card" style={{marginBottom: 20}}  key={comment.id}>
             <div className="card-body">
                <p>{comment.body}</p>
            </div>
        </div>
        )}
      </div>
    )
  }
}