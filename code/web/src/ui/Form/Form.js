import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {updateProfileData} from '../../modules/user/api/actions'

import Input from '../input/Input'
import Textarea from '../input/Textarea'
import Select from '../input/Select'
import Button from '../button/Button'
import Grid from '../grid/Grid'
import GridCell from '../grid/GridCell'
import { grey, grey2 } from '../../ui/common/colors'


class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editEmail: false,
      editDescription: false,
      editDeliveryDate: false,
      editShippingAddress: false,
      email: props.user.details.email || '',
      description: this.description === '' ? props.user.details.description : 'Tell us about yourself!',
      deliveryDate: props.user.details.deliveryDate || '1st',
      streetAddress1: this.streetAddress1 === "" ? props.user.details.streetAddress1 : null,
      streetAddress2: this.streetAddress2 === "" ? props.user.details.streetAddress2 : '',
      city: this.city === "" ? props.user.details.city : null,
      state: this.state === ""  ?props.user.details.state : null,
      zip: this.zip === "" ? props.user.details.zip : null
    }
  }

  handleChange = (e) => {
      this.setState({[e.target.name] : e.target.value})
  }

  updateUserData = (key) => {
      const updatedDataKey = key.charAt(0).toLowerCase() + key.slice(1)
      if (updatedDataKey === 'shippingAddress') {
          const shippingInfo = [
            {stateKey: 'streetAddress1', value: this.state.streetAddress1},
            {stateKey: 'streetAddress2', value: this.state.streetAddress2},
            {stateKey: 'city', value: this.state.city},
            {stateKey: 'state', value: this.state.state},
            {stateKey: 'zip', value: this.state.zip}
          ]
          shippingInfo.forEach((element) => {
            this.props.updateProfileData( { [element.stateKey]: element.value, id: this.props.user.details.id } )
          })
      }
      this.props.updateProfileData({[updatedDataKey]: this.state[updatedDataKey], id: this.props.user.details.id})
  }

  toggleFormInputs = (event, key) => {
    event.preventDefault()
    const editingKey = `edit${key}`
    this.setState({[editingKey] : !this.state[editingKey]})
      if (this.state[editingKey] === true) {
        this.updateUserData(key)
      }
  }

  clearInput = (e) => {
    [e.target.value] = " "
  }

  render() {
    return (
      <form style={{marginBottom: '1em'}}>

        <Grid>
            <GridCell style={{ textAlign: 'center', marginBottom: '.5em'}}>
            {this.state.editEmail === true ? (
              <Input
                type='text'
                placeholder='Edit email address'
                name='email' onChange={this.handleChange}
                style={{marginRight: '.5em', width: '12em', marginBottom: '.5em'}}/>
              ) : (
                <p style={{ color: grey2, marginBottom: '0em', display: 'inline', marginRight: '.5em' }}>{this.state.email}</p>
                )
              }
              <Button
                theme={this.state.editEmail === true ? 'secondary' : 'primary'}
                style={{fontSize: '.5em'}}
                onClick={(event) => this.toggleFormInputs(event, "Email")}>
                  {this.state.editEmail === true ? 'Save' : 'Edit'}
                </Button>
            </GridCell>
          </Grid>

          <Grid style={{marginBottom: '.5em'}}>
            <GridCell style={{ textAlign: 'center'}} >
              {this.state.editDeliveryDate === true ? (
                  <Select type='text'
                    placeholder='1st'
                    name='deliveryDate'
                    onChange={this.handleChange}
                    style={{ marginBottom: '.5em'}}>
                    <option>1st</option>
                    <option>15th</option>
                  </Select>
              ) : (
                <p style={{ color: grey2, marginBottom: '0', marginRight: '.5em', display: 'inline' }}>Delivery Date: {this.state.deliveryDate} of the month</p>
              )
              }
              <Button
                theme={this.state.editDeliveryDate === true ? 'secondary' : 'primary'}
                style={{fontSize: '.5em', display: 'inline'}}
                onClick={(event) => this.toggleFormInputs(event, "DeliveryDate")}>
                {this.state.editDeliveryDate ? 'Save' : 'Edit'}
              </Button>
            </GridCell>
          </Grid>

          <Grid style={{marginBottom: '.5em'}}>
            <GridCell style={{textAlign: 'center'}}>
            {this.state.editShippingAddress === true ? (
              <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'center', marginBottom: '.5em'}}>
                <Input type='text' name='streetAddress1'  max='30' onClick={this.clearInput} placeholder='Address 1' onChange={this.handleChange} required/>
                <Input type='text' name='streetAddress2' max='30'  onClick={this.clearInput} placeholder='Address 2' onChange={this.handleChange}/>
                <Input type='text' name='city' max='30'  onClick={this.clearInput}  placeholder='City' onChange={this.handleChange} required/>
                <Input type='text' style={{width: '2em'}} name='state' max='2' onClick={this.clearInput}  placeholder='ST' onChange={this.handleChange} required/>
                <Input type='text' style={{width: '3em' }} name='zip' max='15' onClick={this.clearInput} placeholder='Zip' onChange={this.handleChange} required/>
              </div>
            ) : (
              <p style={{ color: grey2, marginBottom: '0', marginRight: '.5em', display: 'inline' }}>
                {this.state.streetAddress1 === null ? 'Please add ' : this.state.streetAddress1 + " "}
                {this.state.streetAddress2 === null ? 'enter ' : this.state.streetAddress2 + " "}
                {this.state.city === null ? 'your ' : this.state.city + " "}
                {this.state.state ===  null ? 'shipping ' : this.state.state + " "}
                {this.state.zip === null ? 'address' : this.state.zip + " "}
              </p>
              )
            }
            <Button
              theme={this.state.editShippingAddress ? 'secondary' : 'primary'}
              style={{fontSize: '.5em', display: 'inline'}}
              onClick={(event) => this.toggleFormInputs(event, "ShippingAddress")}>
                {this.state.editShippingAddress === true ? 'Save' : 'Edit'}
              </Button>
            </GridCell>
          </Grid>

         <Grid style={{marginBottom: '.5em'}}>
          <GridCell>
            {this.state.editDescription ? (
              <Textarea
                type='text'
                placeholder='Edit description'
                max='100' name='description'
                onChange={this.handleChange}
                style={{marginRight: '.5em'}}/>
            ) : (
              <p style={{ color: grey2, marginBottom: '0', display: 'inline', marginRight: '.5em' }}>{this.state.description}</p>
            )
          }
              <Button
                theme={this.state.editDescription ? 'secondary' : 'primary'}
                style={{fontSize: '.5em'}}
                onClick={(event) => this.toggleFormInputs(event, "Description")}>
                  {this.state.editDescription ? 'Save' : 'Edit'}
                </Button>
          </GridCell>
        </Grid>
     </form>
    )
  }
}

Form.propTypes = {
  user: PropTypes.object.isRequired,
}


function formState(state) {
  // state.user
  return {
    user: state.user
  }
}

export default connect(formState, {updateProfileData})(Form)
