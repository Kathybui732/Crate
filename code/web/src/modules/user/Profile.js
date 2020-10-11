// track features
// form to upload photo and set to state + send to server
// input field for personal description
// edit email address 
// add shipping address 
// ^^ could all be done on 'Edit Profile' page with 'save' button
// see history of delivered items + history of items kept (buttons, leads to new pages?)


// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'
import File from '../../ui/input/File'
import Input from '../../ui/input/Input'
import Textarea from '../../ui/input/Textarea'
// will need to style

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'


// display profile page
// 'My profile' heading (should cap 2nd word)
// name + email
// Subscriptions btn
// Logout btn
// Component
const Profile = (props) => (
  // controlled form 
  // this.state = {email: '', description: '', image: '', shippingAddress: ''}


  <div>
    {/* SEO */}
    <Helmet>
      <title>My Profile - Crate</title>
    </Helmet>

    {/* Top title bar */}
    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 font="secondary">My profile</H3>
      </GridCell>
    </Grid>

    <Grid>
        {/* <File /> */}
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        {/* <Tile/> */}
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>
        {/* <Input 
          type="text"   
          name='shippingAddress' 
          placeholder='1234 Cherry Ln, Denver, CO 80209' 
          value={this.state.shippingAddress} onChange={this.handleChange}/>
        <Textarea type="textarea" name='description' fullWidth='100' onChange={this.handleChange} value={this.state.description} placeholder='Personal Description' max='100' />
        <Input type="date" /> */}

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user
  }
}

export default connect(profileState, { logout })(Profile)
