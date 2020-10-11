
// Imports
import axios from 'axios'
// promise-based http client for browser and node.js
import { query, mutation } from 'gql-query-builder'
// A simple helper function to generate GraphQL queries using plain JavaScript Objects (JSON).
import cookie from 'js-cookie'
// handles cookies (user info)

// App Imports
import { routeApi } from '../../../setup/routes'
// get routeAPI from routes, config, env.js 

// Actions Types
// action
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'
// export const UPDATEPROFILE = 'AUTH/UPDATE_PROFILE'
// we should add action to update profile (save updated profile datapoint)
// if user does not update certain thing, use initial state


// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
  // returns type and payload for action object to tell global store
}

// Login a user using credentials
// send login request to store
// if any login input fields are incorrect, send error
// otherwise, set token and user vars to the responses from server, and pass that into setUser to
//  get type and payload for dispatch to store
// then set the user to local storage and set cookie based on user
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user

          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }

        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
// this method is called in the parent login function above.

export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
// post new user info to server, return response and set user info to store
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email', 'shippingAddress', 'description', 'productsDeliv', 'productsKept', 'image' ]
    }))
  }
}

// Log out user and remove token from localStorage, 
// tell store to logout user
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
// upon logout, clear the cookies and local storage
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// will need to action to submit user info form

// Get user gender
// post the user's name and id to location user's gender in server, return gender and set in store
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}


// export function saveUpdatedProfInfo(datapoint) {
      // if 
// }
