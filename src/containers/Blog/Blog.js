import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';

import Posts from './Posts/Posts';

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts/" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true',
                                exact: true
                            }}>Create Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Ayylmao</h1>}/> */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost}/> : null }
                    <Route path="/posts" component={Posts}/>
                    {/* <Redirect from="/" to="/posts" /> */}

                    {/* catch all 404 error route */}
                    <Route component={() => <h1>Page not found. :(</h1>}/>
                </Switch> 
            </div>
        );
    }
}

export default Blog;