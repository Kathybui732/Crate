// Imports
import React from 'react'
import { hydrate } from 'react-dom'
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

// Client App: This allows our app component and its child components to have access to the store
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
window.onload = () => {
  hydrate(
    // hydrate is used here because of SSR - so that rather than rendering out test suite, we might be able to use this hydrate
    // hydrate has to do with the warning messages in the console
    // example: 'Expected server HTML to contain a matching <div> in <main>.'
    // It is pulling data server-side before senfing it to the client, we can fix the errors coming up here with this line:
    // const renderMethod = module.hot ? ReactDOM.hydrate : ReactDOM.render
    //change hydrate to renderMethod to fix warning 
    <Client/>,
    document.getElementById('app')
  )
}
