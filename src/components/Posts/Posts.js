import React from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';


export default class Posts extends React.Component {
  state = {
    postsCount: 0,
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:8585/api/posts', {headers: { "Authorization" : localStorage.getItem('authToken') } })
      .then(res => {
        console.log(res.data)
        const posts = res.data['posts'];
        const postsCount = res.data['postsCount'];
        this.setState({ posts });
        this.setState({ postsCount });
      })
  }

  render() {
    return (
      <div className="content">
      { this.state.posts.map(post =>
        <div className="card" style={{marginBottom: 20}}>
            <div className="card-header">
                <h3>{post.title}</h3>
            </div>
             <div className="card-body">
                <p>{post.body}</p>
            </div>
        </div>
        )}
      </div>
    )
  }
}