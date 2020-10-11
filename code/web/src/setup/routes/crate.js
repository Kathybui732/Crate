// App Imports
import List from '../../modules/crate/List'

// Crate routes
// routes to the page Crates on the nav bar
export default {
  list: {
    path: '/crates',
    component: List,
    auth: true
  }
}
