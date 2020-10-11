// Imports
import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// App Imports
import { store } from '../../setup/store'
import { setUser, loginSetUserLocalStorageAndCookie } from '../../modules/user/api/actions'
import ScrollToTop from '../../modules/common/ScrollToTop'
import App from './App'

// User Authentication
const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user))

    loginSetUserLocalStorageAndCookie(token, user)
  }
}

// Client App
const Client = () => (
  <Provider store={store} key="provider">
    <Router>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </Router>
  </Provider>
)

// Mount client app
// Hydrate has to do with the warning message in console:
// 'Expected server HTML to contain a matching <div> in <main>.'
// since it's pulling data server-side before sending to the client
// This line below fixes it:

// const renderMethod = module.hot ? ReactDOM.hydrate : ReactDOM.render

window.onload = () => {
  //change hydrate to renderMethod to fix warning 
  hydrate(
    <Client/>,
    document.getElementById('app')
  )
}

export default Client