// Profile.js is the component rendered at rootPath/user/profile. Right now, this is where the user views their profile info (name/email), logs out, as well as sees their subscriptions. Because of the nature of our track, we'll be doing some updating to this component to display the users picture, profile info, and order history. 

// We'll need to add state to the Profile to allow some components to function as a controlled form. We'll import most of the input types from ui/inputs (File for image, text for email/name/address, input type="date" for days available). We'll need to create an onChange event & onSubmit event, which should update the user in both the database, set the new user & trigger a page re-render. OR we build a new component (ProfileForm) which has all of this functionality (I like this latter option- it feels more SRP)

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

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'

// Component: JSX for our Profile component- we'll need to build off of this to display user info.
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
        <H4 style={{ marginBottom: '0.5em' }}>{props.user.details.name}</H4>

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties: acts as a safeguard to make sure that the Profile component's props are data types we expect. If we add a updateProfile method, we'll need to add PropTypes.func.isRequired for it.
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State: this is acting as our mapStateToProps- it provides this component with the user object from store { error: '', isAuthenticated: false, isLoading: false, details: {} }. Assuming we add profile details (photo, name, email, shipping address, etc) to the user.details, this info will automatically be linked to our component and can be rendered.
function profileState(state) {
  return {
    user: state.user
  }
}

// This function connects our Profile component to props defined by profileState (user) & to the method `logout` from the user/api/actions. As we connect more functionality & have more methods called when the user updates their profile, we'll need to add them to this mapDispatch object.
export default connect(profileState, { logout })(Profile)
