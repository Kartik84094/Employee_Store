const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./utils/auth');
const User = require('./models/User');
require('dotenv').config();

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => authMiddleware(req),
    });
    await server.start();
    server.applyMiddleware({ app });


    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(async () => {
            console.log('Connected to MongoDB');

            // Optional: check if data exists to avoid duplicates
            const isAdmin = await User.findOne({ role: 'admin' });

            if (!isAdmin) {
                const user = new User({
                    username: "john",
                    password: "admin@123",
                    role: "admin"
                });

                await user.save();
                console.log('admin added to DB');
            } else {
                console.log('admin already exists');
            }
        })
        .catch(err => console.error('MongoDB connection error:', err));

    app.listen({ port: process.env.PORT }, () =>
        console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`)
    );
}

startServer();
