// This is used to boot up the server - its the return message that tells you if the server is up and where or if it couldn't start when you run npm start in the terminal

// App Imports
import { PORT, NODE_ENV } from '../config/env'

// Start server
export default function (server) {
  console.info('SETUP - Starting server..')

  server.listen(PORT, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on http://localhost:${ PORT } [${ NODE_ENV }]`)
    }
  })
}
