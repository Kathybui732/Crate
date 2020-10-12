// App Imports
import { MESSAGE_SHOW, MESSAGE_HIDE } from './actions'
// This will hold the state of the messages being
// determines if it is displayed or not

// Initial State - the default state
export const commonInitialState = {
  message: {
    text: null,
    open: false
  }
}

// State - There is a timeout for the messages
export default (state = commonInitialState, action) => {
  switch (action.type) {
    case MESSAGE_SHOW:
      return {
        ...state,
        message: {
          text: action.message,
          open: true
        }
      }

    case MESSAGE_HIDE:
      return {
        ...state,
        message: {
          text: null,
          open: false
        }
      }

    default:
      return state
  }
}
