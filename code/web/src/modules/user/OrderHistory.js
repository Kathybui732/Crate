// Imports
import React from 'react'
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
const OrderHistory = (props) => (
    <div>
        {/* SEO */}
        <Helmet>
            <title>My Profile - Order History - Crate</title>
        </Helmet>

        {/* Grid of products */}
        <Grid style={{ marginLeft: '10%', marginRight: '10%' }}>
            {props.products.map(product => (
                <GridCell key={product.id} style={{ textAlign: 'center' }}>
                    <Card style={{ width: '15em', margin: '2.5em auto', backgroundColor: white, paddingBottom: '1em' }}>
                        <img src={routeImage + product.image} alt={product.name} style={{ width: '100%' }} />

                        <div style={{ padding: '1em 1.2em' }}>
                            <H4 font="secondary" style={{ color: black }}>{product.name}</H4>

                            <p style={{ color: grey2, marginTop: '1em' }}>{product.description}</p>
                        </div>
                        <Button theme='primary' onClick={() => {console.log(`Keep item ${product.id}`)} }>Keep Item</Button>
                    </Card>
                </GridCell>
            ))}
        </Grid>
    </div>
)

OrderHistory.propTypes = {
    products: PropTypes.array
}

export default OrderHistory