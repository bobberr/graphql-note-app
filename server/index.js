var express = require("express");
var { buildSchema } = require("graphql");
var graphqlHTTP = require("express-graphql");
var cors = require("cors");
var port = process.env.port || 3000;
var mongoose = require('mongoose');
var dbConfig = require('./database');
var userModel = require('./models/UserModel');
var documentModel = require('./models/DocumentModel');

mongoose.connect(dbConfig);

var schema = buildSchema(`
    type Query {
        getUsers: [User]
        getDocuments(user: String): [Document]
    }
    type User {
        id: ID
        email: String
        error: String
        documents: [Document]
    }
    type Document {
        title: String
        content: String
        id: ID
    }
    type Mutation {
        addUser(email: String): User
        addDocument(title: String, user: String): [Document]
    }
`);

var root = {
    getUsers: () => {
        return userModel.find({}).exec();
    },
    addUser: ({email}) => {
        var newUser = new userModel();
        return userModel.findOne({email}).exec().then((user) => {
            if(!user) {
                newUser.email = email;
                newUser.save((err) => {
                    if(err) {
                        console.log(err);
                    }
                });
                return newUser;             
            } else {
                return {
                    error: 'userExists'
                }
            }
        });
    },
    addDocument: ({title, user}) => {
        var newDocument = new documentModel();
        return userModel.findOne({email: user}).exec().then((foundUser) => {
            foundUser.documents.push(newDocument._id)
            foundUser.save((err) => {
                if(err) {
                    console.log(err);
                }
            });
            newDocument.title = title;
            newDocument.save((err) => {
                if(err) {
                    console.log(err);
                }
            });
        }).then(() => {
            return userModel.findOne({email: user}).populate('documents').exec().then((foundUser) => {
                return foundUser.documents;
            });
        });
        
    },
    getDocuments: ({user}) => {
        if(user) {
            return userModel.findOne({email: user}).populate('documents').exec().then((foundUser) => {
                return foundUser.documents;
            });
        } else {
            return []; 
        }
    }
}

var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});