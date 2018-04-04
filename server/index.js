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
        changeDocument(id: ID, content: String): Document
        deleteDocument(id: ID, user: String): [Document]
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
    addDocument: async ({title, user}) => {
        let newDocument = new documentModel();
        newDocument.title = title;
        newDocument.content = "";
        const savedNewDocument = await newDocument.save();
        let foundUser = await userModel.findOne({email: user});
        foundUser.documents.push(savedNewDocument._id);
        foundUser = await foundUser.save();
        const updatedUser = await userModel.populate(foundUser, 'documents');
        return updatedUser.documents;
    },
    getDocuments: ({user}) => {
        if(user) {
            return userModel.findOne({email: user}).populate('documents').exec().then((foundUser) => {
                return foundUser.documents;
            });
        } else {
            return []; 
        }
    },
    changeDocument: async ({id, content}) => {
        const foundDocument = await documentModel.findById(id);
        foundDocument.content = content;
        const savedDocument = await foundDocument.save();
        return savedDocument;
    },
    deleteDocument: async ({id, user}) => {
        const foundUser = await userModel.findOne({email: user});
        const indexOfDocument = foundUser.documents.indexOf(id);
        foundUser.documents.splice(indexOfDocument, 1);
        let updatedUser = await foundUser.save();
        const removed = await documentModel.remove({_id: id});
        updatedUser = await userModel.populate(foundUser, 'documents');
        return updatedUser.documents;
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