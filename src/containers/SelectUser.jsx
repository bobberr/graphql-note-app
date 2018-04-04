import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { setDocuments, setActiveUser, resetActiveDocument } from '../redux/actionCreators/actionCreators';

const query = gql`
    query GetUsers {
        getUsers {
            email
            id
        }
    }
`;
const getDocuments = gql`
    query getDocuments($user: String) {
        getDocuments(user: $user) {
                id
                title
                content
            }
        }
    `
;

const deleteDocument = gql`
    mutation deleteDocument($id: ID, $user: String) {
        deleteDocument(id: $id, user: $user) {
            id
            title
            content
        }
    }
`;

class SelectUser extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
    }
    clickHandler(e) {
        this.props.setActiveUser(e.target.value);
        this.props.client.query({query: getDocuments, variables: {user: e.target.value}, fetchPolicy: 'network-only'}).then((returnedData) => {
            this.props.setDocuments(returnedData.data.getDocuments);
            this.props.resetActiveDocument();
        });
    }
    deleteHandler() {
        this.props.client.mutate({mutation: deleteDocument, variables: {id: this.props.document.id, user: this.props.user}}).then((returnedData) => {
            this.props.setDocuments(returnedData.data.deleteDocument);
            this.props.resetActiveDocument();
        });
    }
    render() {
        if(this.props.data.loading) return null;
        const options = this.props.data.getUsers.map((user) => {
            return <option key={user.id} value={user.email}>{user.email}</option>
        }); 
        return (
            <div>
                <button onClick={this.deleteHandler}>Delete</button>
                <select name="users" defaultValue={null} onChange={this.clickHandler}>
                    <option value={null}></option>
                    {options}
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        document: state.document,
        user: state.email
    }
}

const graphqlSelectUser = graphql(query)(withApollo(SelectUser));

export default connect(mapStateToProps, {setDocuments, setActiveUser, resetActiveDocument})(graphqlSelectUser);