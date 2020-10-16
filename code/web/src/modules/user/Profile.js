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
import ProfilePicture from './ProfilePicture'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2 } from '../../ui/common/colors'
import File from '../../ui/input/File'
import Form from '../../ui/Form/Form'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

const Profile = (props) => (

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
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <ProfilePicture />
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>
        
        <Form />

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
