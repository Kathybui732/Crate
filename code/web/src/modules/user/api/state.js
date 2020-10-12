// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State: defines initial state for parts of store related to user. This is the info in store at @@Init in dev tools.

export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State: This is our user reducer- it takes in our action object & returns a specific piece of store depending on the action type. Every piece of store is governed by it's own reducer.

//For one of our features, we need to display all of the items a user has received and the ones they've kept. We could add a new property for history to the user.details object, which will have a value of an object that has product ids as keys & true/false as values for if the item was kept/returned.

/*
- Example object for history- all items listen (by id) keys & kept items can be determined by true/false values.
{
  email: test@test.com,
  history: {
    1: true,
    2: true,
    3: false,
    4: true,
  }
}
- We'll need an action that updates this history, as the user selects/unselects items they are keeping.
*/


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

    default:
      return state
  }
}
