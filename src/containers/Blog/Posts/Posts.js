import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);

    axios.get('/posts')
        .then(response => {
            const shortenedPosts = response.data.slice(0,4);
            const updatedPosts = shortenedPosts.map(post => {
                return {
                    ...post,
                    author: 'Mckenzie'
                }
            });
            console.log(response)
            this.setState({posts: updatedPosts});
        })
        .catch(err => {
            this.setState({error: true});
        });
  }

  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/posts/' + id});
    // this.props.history.push('/' + id);
  }
  
  render() {

    let posts = <p style={{textAlign: 'center'}}>Something went wrong... :(</p>
    
    if(!this.state.error) {
      posts = this.state.posts.map(post => {
          return( 
            // <Link to={'/' + post.id} key={post.id}>
              <Post 
                key={post.id}
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}/>
            // </Link>
          );
      });
    }

    return(
      <div>
        <section className="Posts">
          { posts }
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
      </div>
    );
  };
}

export default Posts;