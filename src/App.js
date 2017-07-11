import React, { Component } from 'react'
import createHistory from 'history/createBrowserHistory'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'

import logo from './logo.svg'
import './App.css'
import Counter from './components/counter/Counter'

const browserHistory = createHistory()
const middleware = [ routerMiddleware(browserHistory) ]

const store = createStore(
  combineReducers({ routing: routerReducer }),
  applyMiddleware(...middleware)
)
const history = syncHistoryWithStore(browserHistory, store, { adjustUrlOnReplay: true })

let Home = () => {
  return <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <button onClick={() => store.dispatch(push('/counter'))}>Go to "/counter"</button>
  </div>
}

const routes = [
  { path: '/', label: 'Home', component: Home, exact: true },
  { path: '/counter', label: 'Counter Example', component: Counter },
]

const Main = () => {
  return <Switch>
    {routes.map(({ path, label, component, exact = false }) => <Route
      key={`Main.${label}`}
      path={path}
      exact={true}
      component={component} />)}
  </Switch>
}

store.subscribe((...args) => console.log(34, 'SUBSCRIBE!', ...args))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>
    )
  }
}

export default App
