// Actions Types
import axios from 'axios/index'
import { routeApi } from '../../../setup/routes'

export const MESSAGE_SHOW = 'COMMON_MESSAGE_SHOW'
export const MESSAGE_HIDE = 'COMMON_MESSAGE_HIDE'

// Actions
// used for showing messages such as, "please try again" error or 'Logging in, please wait"
export function messageShow(message) {
  return { type: MESSAGE_SHOW, message }
}

export function messageHide() {
  return { type: MESSAGE_HIDE }
}

// multipart/form-data is used for posting binary data, uploading files to the server
// I think we would use this when we are uploading a profile photo
export function upload(data) {
  return dispatch => {
    return axios.post(routeApi + '/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
