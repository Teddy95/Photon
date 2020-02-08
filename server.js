// Register importer for .graphql files
require('graphql-import-node/register')

// Import required modules
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')
const schema = require('./schema.graphql')

// Get Node environment
const env = process.env.NODE_ENV
const isDev = env === 'development'

// Define port
const port = process.env.PORT || 8080

// Instantiate Express app
var app = express()

// Define standard route
app.get('/', (req, res, next) => {
	res.send('Hello World!')
})

// Configure Apollo GraphQL server
var graphQl = new ApolloServer({
	typeDefs: schema,
	resolvers: resolvers,
	introspection: true,
	playground: isDev,
	debug: isDev
})

// Apply middleware
graphQl.applyMiddleware({ app, path: '/api' })

// Start
app.listen(port, () => {
	console.log(`Photon is listening on http://localhost:${port}!`)
})
