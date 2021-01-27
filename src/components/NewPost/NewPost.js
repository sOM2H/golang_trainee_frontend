import React from 'react'
import axios from 'axios';
const qs = require('qs');
import { Button, Input} from 'antd';

const config = {headers: { "Authorization" : localStorage.getItem('authToken') }};

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: ""
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = async() => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
     await axios.post('http://localhost:8585/api/posts', qs.stringify({title: this.state.title, body: this.state.body}), config)
      .then(res => {
        const id = res.data['post']['id'];
        location.replace('/posts/' + id);
      })
  }
  
  render() {
    return (
       <div className="content">
        <div className="form-group">
        <Input
          name='title'
          placeholder='Title'
          required='True'
          style={{marginBottom: 50}}
          onChange={e => this.onChange(e)}
          value={this.state.title} />
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
            Create Post
        </Button>
        </div>
        </div>
    )
  }
}