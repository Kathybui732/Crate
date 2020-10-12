// Imports
import { NODE_ENV, PORT } from '../config/env'

export default function (server) {
  console.info('SETUP - Start server..')

  server.listen(PORT, (error) => {
    if (error) {
      return console.error(error)
    } else {
      return console.info(`Server running on http://localhost:${ PORT } [${ NODE_ENV }]`)
    }
  })
}

// This file imports the port and node environment from the environment config file. It exports a function that console logs the process of the setup as each step is achieved. If there is an error, it displays the error, otherwise it displays a message that the console has started and the accessible URL.
