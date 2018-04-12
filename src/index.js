import React from 'react'
import { render } from 'react-dom'
import './index.css'
import 'tachyons'
import registerServiceWorker from './registerServiceWorker'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants'

import Home from './components/Home'
import CreatePage from './components/CreatePage'
import Login from './components/Login'

window.onbeforeunload = function() {
  localStorage.removeItem(GC_USER_ID)
  localStorage.removeItem(GC_AUTH_TOKEN)
}

render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/create' component={CreatePage} />
      <Route exact path='/login' component={Login} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
