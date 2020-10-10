// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT || 8000

// It looks like this file is similar to the Rails file config/application.yml. Though it is not .gitignored. This is the file where you would store environment variables to be called in other parts of the app.
