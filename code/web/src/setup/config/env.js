// Imports
import dotenv from 'dotenv'

// Load .env
dotenv.config()

// URL
export const APP_URL = process.env.APP_URL
export const APP_URL_API = process.env.APP_URL_API

// Environment
export const NODE_ENV = process.env.NODE_ENV

// Port
export const PORT = process.env.PORT || 3000

// This file creates an environment with dontenv, assigns vars app url and app api url to the urls created in node JS, assigns var node environments to those that were rcreated in node JS, then assigns var port to port created in node JS.
