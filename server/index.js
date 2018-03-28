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
    
    // });
    // foundUser.documents.push(newDocument._id);        
    // foundUser.save((err) => {
    //     if(err) {
    //         console.log(err);
    //     }
    // });
    addDocument: ({title, user}) => {
        var newDocument = new documentModel();
        newDocument.title = title;
        
        return userModel.findOne({email: user}).exec().then((foundUser) => {
            newDocument.save((err, updated) => {
                if(err) {
                    console.log(err);
                }
            });
            return {foundUser, newDocument}
        }).then((userAndDocument) => {
            const {foundUser} = userAndDocument;
            const {newDocument} = userAndDocument;
            foundUser.documents.push(newDocument._id);
            console.log(newDocument._id)
            return foundUser.save((err) => {
                if(err) {
                    console.log(err);
                }
                return userModel.populate(foundUser, 'documents', (err, user) => {
                    return user;
                    console.log(user)
                }); 
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