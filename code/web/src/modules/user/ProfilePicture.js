import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { File } from '../../ui/input'
import { upload, messageShow, messageHide } from '../common/api/actions'
import { renderIf } from '../../setup/helpers'
import { routeImage } from '../../setup/routes'
import { APP_URL, APP_URL_API } from '../../setup/config/env'
import { updateUser, getUser } from './api/actions'

class ProfilePicture extends Component {
  constructor() {
    super() 
    this.state = {
      imgURL: '',
      name: '',
      email: '',
    }
  }

  componentDidMount() {
    this.setState({
      imgURL: this.props.user.details.imgURL || '',
      name: this.props.user.details.name,
      email: this.props.user.details.email,
    })
  }
  
  onUpload = (e) => {
    this.props.messageShow('Uploading file, please wait...')

    let data = new FormData()
    data.append('file', e.target.files[0])

    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          this.props.messageShow('File uploaded successfully.')
          
          this.setState({
            imgURL: `/images/uploads/${response.data.file}`
          })
          console.log(this.state)
          this.saveChanges()
        } else {
          this.props.messageShow('Please try again.')
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error. Please try again.')
      })
      .then(() => {
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
    }

    saveChanges = () => {
      this.props.updateUser(this.state, this.props.user.details.id)
      this.props.getUser(this.props.user.details.id)
    }

  render() {
    console.log(`${routeImage}${this.state.imgURL}`)
    return (
      <div>
        <div style={{ padding: '1em' }}>
          {renderIf(!this.props.user.details.image, () => (
            <>
              <img src={ `${ APP_URL }/images/profile.png` } alt="Profile placeholder" style={{ width: 100 }}/>
            </>
          ))}
          {renderIf(this.props.user.details.image, () => (
            <img src={ `${routeImage}${this.props.user.details.image}` } alt="Profile upload" style={{ width: 100 }}/>
          ))}
          <File text="Add Profile Picture" onChange={(e) => this.onUpload(e)}/>
        </div>
      </div>
    )
  }
}

function profileState(state) {
  return {
    user: state.user,
  }
}
export default connect(profileState, { upload, messageShow, messageHide, updateUser, getUser })(ProfilePicture)