import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { setDocuments, setActiveUser } from '../redux/actionCreators/actionCreators';

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

class SelectUser extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e) {
        this.props.setActiveUser(e.target.value);
        this.props.client.query({query: getDocuments, variables: {user: e.target.value}}).then((returnedData) => {
            this.props.setDocuments(returnedData.data.getDocuments);
        });
    }
    render() {
        if(this.props.data.loading) return null;
        const options = this.props.data.getUsers.map((user) => {
            return <option key={user.id} value={user.email}>{user.email}</option>
        }); 
        return (
            <select name="users" defaultValue={null} onChange={this.clickHandler}>
                <option value={null}></option>
                {options}
            </select>
        )
    }
}

const graphqlSelectUser = graphql(query)(withApollo(SelectUser));

export default connect(null, {setDocuments, setActiveUser})(graphqlSelectUser);