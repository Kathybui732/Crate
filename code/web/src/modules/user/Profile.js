// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import ProfilePicture from './ProfilePicture'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { grey, grey2, black } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout, getUserProducts } from './api/actions'
import OrderHistory from './OrderHistory'
import Menu from '../common/header/Menu'
import MenuItem from '../common/header/MenuItem'

// Component
class Profile extends PureComponent {  
  componentDidMount() {
    this.props.getUserProducts(window.localStorage.getItem('token'))
  }
  
  render() {
    return (
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
            <H4 style={{ marginBottom: '0.5em' }}>{this.props.user.details.name}</H4>

            <p style={{ color: grey2, marginBottom: '2em' }}>{this.props.user.details.email}</p>

            <Link to={userRoutes.subscriptions.path}>
              <Button theme="primary">Subscriptions</Button>
            </Link>

            <Button theme="secondary" onClick={this.props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
          </GridCell>
        </Grid>

        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 style={{ paddingBottom: '1em'}} font="secondary">Order History</H3>
            <Menu>
              <MenuItem to={userRoutes.profile.path} type="primary" style={{ color: black, marginRight: '1em' }}>All Items</MenuItem>

              <MenuItem to={userRoutes.profile.path + '/kept'} type="primary" style={{ color: black, marginLeft: '1em' }}>Kept Items</MenuItem>
            </Menu>
            <OrderHistory />
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

// Component State
function profileState(state) {
  return {
    user: state.user,
  }
}

export default connect(profileState, { logout, getUserProducts })(Profile)
