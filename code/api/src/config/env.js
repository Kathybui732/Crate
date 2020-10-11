// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT || 8000

// this is like the .env file where we put all of our environment keys so that they're not all out for anyone to take
