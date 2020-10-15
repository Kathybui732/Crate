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
import { grey, grey2, black } from '../../ui/common/colors'

// App Imports
import userRoutes from '../../setup/routes/user'
import { logout } from './api/actions'
import OrderHistory from './OrderHistory'
import Menu from '../common/header/Menu'
import MenuItem from '../common/header/MenuItem'

// Component
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

        <p style={{ color: grey2, marginBottom: '2em' }}>{props.user.details.email}</p>

        <Link to={userRoutes.subscriptions.path}>
          <Button theme="primary">Subscriptions</Button>
        </Link>

        <Button theme="secondary" onClick={props.logout} style={{ marginLeft: '1em' }}>Logout</Button>
      </GridCell>
    </Grid>

    <Grid style={{ backgroundColor: grey }}>
      <GridCell style={{ padding: '2em', textAlign: 'center' }}>
        <H3 style={{ paddingBottom: '1em'}} font="secondary">Order History</H3>
        <Menu>
          <MenuItem to={userRoutes.profile.path} type="primary" style={{ color: black, marginRight: '1em' }}>All Items</MenuItem>

          <MenuItem to={userRoutes.profile.path + '/kept'} type="primary" style={{ color: black, marginLeft: '1em' }}>Kept Items</MenuItem>
        </Menu>
        <OrderHistory products={props.products} />
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
    user: state.user,
    products: [{
      id: 8,
      name: 'T-Shirt for Men - Grey',
      slug: 't-shirt-for-men-grey',
      description: 'A very nice grey t-shirt for men.',
      image: '/images/stock/t-shirt-male-2.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 7,
      name: 'T-Shirt for Men - White',
      slug: 't-shirt-for-men-white',
      description: 'A very nice white t-shirt for men.',
      image: '/images/stock/t-shirt-male-1.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 6,
      name: 'T-Shirt for Women - Grey',
      slug: 't-shirt-for-women-grey',
      description: 'A very nice grey t-shirt for women.',
      image: '/images/stock/t-shirt-female-2.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 5,
      name: 'T-Shirt for Women - Black',
      slug: 't-shirt-for-women-black',
      description: 'A very nice black t-shirt for women.',
      image: '/images/stock/t-shirt-female-1.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 4,
      name: 'Watch for Men',
      slug: 'watch-for-men',
      description: 'A very nice watch for men.',
      image: '/images/stock/watch-male.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 3,
      name: 'Watch for Women',
      slug: 'watch-for-women',
      description: 'A very nice watch for women.',
      image: '/images/stock/watch-female.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 2,
      name: 'Belt for Men',
      slug: 'belt-for-men',
      description: 'A very nice belt for men.',
      image: '/images/stock/belt-male.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    },
    {
      id: 1,
      name: 'Belt for Women',
      slug: 'belt-for-women',
      description: 'A very nice belt for women.',
      image: '/images/stock/belt-female.jpg',
      createdAt: '1601948797452',
      updatedAt: '1601948797452'
    }
    ]
  }
}

export default connect(profileState, { logout })(Profile)
