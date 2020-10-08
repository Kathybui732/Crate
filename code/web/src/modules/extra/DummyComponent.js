// Imports
import React, { PureComponent } from 'react'

// This has an extra built-into-react import

// App Imports

// Component
class DummyComponent extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        <h1>Dummy Component</h1>
      </div>
    )
  }
}

export default DummyComponent

// This is basically anything that that is viewable
