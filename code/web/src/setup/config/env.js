// Imports
import dotenv from 'dotenv'

// create an enviro w dotenv 
// assign vars app url and app api url to the urls created in node js
// assign var node enviro to that created in node js
// assign var port to port created in node js

// Load .env
dotenv.config()

// URL
export const APP_URL = process.env.APP_URL
export const APP_URL_API = process.env.APP_URL_API

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT || 3000
