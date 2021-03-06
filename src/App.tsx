import React, { PureComponent } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import { createGlobalStyle } from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV, faPencilAlt, faCaretUp, faCaretDown, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

import history from './utils/history'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import Login from './components/Login'

library.add(faEllipsisV, faPencilAlt, faCaretUp, faCaretDown, faHeart, faHeartBroken)

const GlobalStyle = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
`

const ForkRibbon = () => (
  <GitHubForkRibbon
    position="right-bottom"
    color="black"
    href="//github.com/marsinearth/useful-bookmarks"
    target="_blank"
    rel="noopener noreferrer"
  >
    <b>Go To Source Code</b>
  </GitHubForkRibbon>
)

export default class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/create' component={CreatePost} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
        <ForkRibbon />
      </>
    )
  }
}
