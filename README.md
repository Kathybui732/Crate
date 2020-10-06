[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


  <p align="center">

![Crate](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/hero-with-link.png)

# Crate 👕👖📦
  <br/>
  <!-- <a href="https://youtu.be/7aLGTn9YG6Q">Youtube Walk-through</a>
    <br /> -->
    <a href="https://github.com/Kathybui732/Crate"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Kathybui732/Crate">View Demo</a>
    ·
    <a href="https://github.com/Kathybui732/Crate/issues">Report Bug</a>
    ·
    <a href="https://github.com/Kathybui732/Crate/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Usage](#usage)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)


## About The Project

This project explores an existing brownfield codebase. We will be using the open source crate project. Crate is a platform, similar to Stitch Fix, that allows users to setup monthly subscriptions to receive trendy clothes and accessories. We will be exploring the codebase in order to add test coverage, fix bugs, and extend the current functionality. We will not focus on mobile development. 

Our learning goals were to: 

- Learn and apply strategies for understanding how to analyze a larger, existing code base
- Apply strategies for reading and evaluating documentation
- Explore and implement new concepts, patterns, or libraries that have not been explicitly taught while at Turing
- Practice an advanced, professional git workflow

### Built With

- **API** built with Node, GraphQL, Express, Sequelize (MySQL) and JWT Auth
- **WebApp** built with React and Redux along with Server Side Rendering (SSR) / SEO friendly. 
- Written in ES6+ using Babel + Webpack

## Developers

- [Leigh Larson](https://github.com/leighlars)
- [Kathy Bui](https://github.com/Kathybui732)
- [Jake West](https://github.com/jkwest-93)
- [AJ Tran](https://github.com/ajtran303)
- [Carly Clift](https://github.com/carlymclift)
- [Dan Sehl](https://github.com/dtsehl)

- [Project Link](https://github.com/Kathybui732/Crate)
 
- [Project Spec](https://mod4.turing.io/projects/crate/crate.html)


## Features
- Modular and easily scalable code structure
- Emphasis on developer experience
- UI components in separate folder which can be swapped for your favorite UI framework easily
- Responsive UI for React Native to support Mobile and Tablet
- GraphQL schema with associations
- Database migration and data seeding
- User authentication using JSON Web Tokens with GraphQL API
- File upload feature with GraphQL
- React storybook demonstrating UI components for web
- Server side rendering
- Multi-package setup and dev scripts for an automated dev experiance


## Useful for
- Developers with basic knowledge on React exploring advance React projects
- Developers learning React Native
- Exploring GraphQL
- Scalable project structure and code
- Starter application for Mobile and Web along with SSR
- Multi-package scripts
- Sample project with combination of all above


## Usage
Click on image to view fullscreen and zoom

### Desktop
[IMAGE](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/desktop-all-with-link.png)

![Crate Desktop](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/desktop-all-with-link.png)

### Mobile
[IMAGE](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/mobile-all-with-link.png) · [GIF](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/mobile.gif)

![Crate Mobile](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/mobile-all-with-link.png)

### Tablet
[IMAGE](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/tablet-all-with-link.png) · [GIF](https://github.com/atulmy/atulmy.github.io/blob/master/images/crate/tablet.gif)

![Crate Tablet](https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/crate/tablet-all-with-link.png)


## Core Structure
    code
      ├── package.json
      │
      ├── api (api.example.com)
      │   ├── public
      │   ├── src
      │   │   ├── config
      │   │   ├── migrations
      │   │   ├── modules
      │   │   ├── seeders
      │   │   ├── setup
      │   │   └── index.js
      │   │
      │   └── package.json
      ├── web (example.com)
      │   ├── public
      │   ├── src
      │   │   ├── modules
      │   │   ├── setup
      │   │   ├── ui
      │   │   └── index.js
      │   ├── storybook
      │   │
      │   └── package.json
      │
      ├── .gitignore
      └── README.md


## Setup and Running
- Prerequisites
  - Node -- information can be found [here](https://treehouse.github.io/installation-guides/mac/node-mac.html)
  - MySQL (or Postgres / Sqlite / MSSQL) -- information can be found [here](https://postgresapp.com/) (Note: user may need to force quit and restart terminal and/or computer for success)
  - Once you have postgreSQL installed, complete the following:
  - Run `psql` in your terminal to access the postrgres command line interface (CLI)
  - Check your available postgres users by running `\du` in the postgres CLI. Your available users are listed under “Role name.” Use this user as your username in the `database.json file`
  - In `psql`, create your database with the command `CREATE DATABASE crate;` 


- Clone repo `git clone git@github.com:KathyBui732/crate.git crate`
- Switch to `code` directory `cd code`
- Configurations
  - Modify `/api/src/config/database.json` for database credentials. [Possible error?](https://github.com/Kathybui732/Crate/issues/3)
  - Modify `/api/.env` for PORT (optional)
  - Modify `/web/.env` for PORT / API URL (optional)

- Setup
  - API: Install packages and database setup (migrations and seed) `cd api``npm run setup`. [Possible error?](https://github.com/Kathybui732/Crate/issues/4)
  - Webapp: Install packages `cd web` and `npm install`. [Possible error?](https://github.com/Kathybui732/Crate/issues/5) 
- Development
  - Run API `cd api` and `npm start`, browse GraphiQL at http://localhost:8000/
  - Run Webapp `cd web` and `npm start`, browse webapp at http://localhost:3000/
- Production
  - Run API `cd api` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server
  - Run Webapp `cd web` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server

## Repo Origin Author Information 
- Atul Yadav - [GitHub](https://github.com/atulmy) · [Twitter](https://twitter.com/atulmy)

## Acknowledgements
* [FlatIcon](https://www.flaticon.com/home)
* [Giphy](https://giphy.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/KathyBui/crate.svg?style=flat-square
[contributors-url]: https://github.com/Kathybui732/crate/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/KathyBui732/crate.svg?style=flat-square
[forks-url]: https://github.com/Kathybui732/crate/network/members
[stars-shield]: https://img.shields.io/github/stars/KathyBui732/crate.svg?style=flat-square
[stars-url]: https://github.com/Kathybui732/crate/stargazers
[issues-shield]: https://github.com/Kathybui732/crate.svg?style=flat-square
[issues-url]: https://github.com/Kathybui732/crate/issues
