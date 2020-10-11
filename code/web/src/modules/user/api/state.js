// App Imports
// creates everything for the store for this user module 

// isEmpty checks to see if an object/hash is empty 
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State - default state
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State - holds state of the user, and updates based on case
export default (state = userInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      }

    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }

    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      }

      // add cases for adding profile information SET_ADDRESS SET_PROFILE_PICTURE etc

    default:
      return state
  }
}