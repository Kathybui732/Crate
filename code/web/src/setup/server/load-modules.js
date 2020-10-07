

// Imports
import path from 'path'
import Express from 'express'
import bodyParser from 'body-parser'
// ^^ allows form data to be available in requested.body param in Express
import cookieParser from 'cookie-parser'
// parses cookies sent w request in Express
import morgan from 'morgan'
// ^^ simplifies request logs made to server

// App Imports
import { NODE_ENV } from '../config/env'

export default function (app) {
  console.info('SETUP - Load modules..')

  // Request body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))

  // Request body cookie parser
  app.use(cookieParser())

  // Public (static) files folder
  app.use(Express.static(path.join(__dirname, '..', '..', '..', 'public')))

  // HTTP logger
  if(NODE_ENV === 'development') {
    app.use(morgan('tiny'))
  }
}
