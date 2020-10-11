// App Imports
import { MESSAGE_SHOW, MESSAGE_HIDE } from './actions'
//holds state of messages being displayed or not

// Initial State - default state
export const commonInitialState = {
  message: {
    text: null,
    open: false
  }
}

// State- most messages are set on a timeout
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
