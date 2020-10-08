# High Level Notes

```
api
|> public
  |> images
    |> stock
    |> uploads        | the .keep file may be a clue
  |> src
    |> config         | db, env, params, server
    |> migrations     | 1-user, 2-product, 3-crate, 4-subscriptions
    |> modules        | each DB table has these 5 things
      |> model.js     | Sequelize ORM
      |> mutations.js | GraphQL "command" endpoints
      |> query.js     | GraphQL "query" endpoints
      |> resolvers.js | GraphQL "router"
      |> types.js     | GraphQL "data types"
    |> seeders        | 1-user 2-products 3-crates
    |> setup          | Exports for index.js "runner" file
      |> schema       | The GraphQL Schema
    index.js          | "Runner file"
.babelrc              
.env
.sequelizerc
package-lock.json
package.json

|> web
  |> public             
    |> css
    |> images
    |> js
      service-worker.js | An optimizer with a "cache falling back
                            to network" offline strategy
      manifest.json     | Meta data about the app
  |> src
    |> config
      database.json
      env.js
      params.json       | Example JSON request body
      server.json
    |> migrations       | WRITE NEW sequelize MIGRATIONS
    |> modules
      |> admin          | components and api for Admin
      |> auth           | Auth strategy to check user login
      |> common         
        |> api   
      |> extra          | DUMMY FILES FOR CODE REUSE      
        DummyComponent.js
        DummyComponentPure.js
        DummyComponentRedux.js
      |> crate, product, subscription, user
        |> api
          actions.js    | Interface to calling API
          state.js      | What to do after calling API
      |> pages          
    |> setup            
      |> client          
        App.js         
        index.js        | loads App.js, stores user token
      |> config
        env.js          
        params.json     | Example JSON body params
      |> routes         | DEFINES ALL ENDPOINTS, INCL. ADMIN
      |> server         
      helpers.js        | REUSE THESE LITTLE FUNCTIONS
      store.js          | The Reducer and Store
  |> storybook          | DUMMY UI COMPONENTS FOR REUSE
  .babelrc              
  .env
  .gitignore
  nodemon.json
  package-lock.json
  package.json
  webpack.config.babel.js

```
