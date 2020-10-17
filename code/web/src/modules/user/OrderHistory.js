// Imports
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H4 } from '../../ui/typography'
import { grey2, black, white } from '../../ui/common/colors'
import Card from '../../ui/card'
import Button from '../../ui/button'

// App imports
import { routeImage } from '../../setup/routes'

// Component
const OrderHistory = (props) => {
    return (
        <div>
            {/* SEO */}
            <Helmet>
                <title>My Profile - Order History - Crate</title>
            </Helmet>

            {/* Grid of products */}
            <Grid style={{ marginLeft: '10%', marginRight: '10%' }}>
                {props.products.map(product => (
                    <GridCell key={product.product.id} style={{ textAlign: 'center' }}>
                        <Card style={{ width: '15em', margin: '2.5em auto', backgroundColor: white, paddingBottom: '1em' }}>
                            <img src={routeImage + product.product.image} alt={product.product.name} style={{ width: '100%' }} />

                            <div style={{ padding: '1em 1.2em' }}>
                                <H4 font="secondary" style={{ color: black }}>{product.product.name}</H4>

                                <p style={{ color: grey2, marginTop: '1em' }}>{product.product.description}</p>
                            </div>
                            <Button theme='primary' onClick={() => {console.log(`Keep item ${product.product.id}`)} }>Keep Item</Button>
                        </Card>
                    </GridCell>
                ))}
            </Grid>
        </div>
    )
}

OrderHistory.propTypes = {
    products: PropTypes.array
}

function orderHistoryState(state) {
    return {
        products: state.user.userProducts,
    }
}

export default connect(orderHistoryState)(OrderHistory)