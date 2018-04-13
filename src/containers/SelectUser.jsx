import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { setDocuments, setActiveUser } from '../redux/actionCreators/actionCreators';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
    state = {
        selectedOption: ''
    };
    constructor() {
        super();
        this.deleteHandler = this.deleteHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
    }
    deleteHandler() {
        this.props.client.mutate({mutation: deleteDocument, variables: {id: this.props.document.id, user: this.props.user}}).then((returnedData) => {
            this.props.setDocuments(returnedData.data.deleteDocument);
        });
    }
    selectHandler(selected) {
        if(selected) {
            this.setState({selectedOption: selected})
            this.props.setActiveUser(selected.value);
            this.props.client.query({query: getDocuments, variables: {user: selected.value}, fetchPolicy: 'network-only'}).then((returnedData) => {
                this.props.setDocuments(returnedData.data.getDocuments);
            });
        } else {
            return;
        }
        
    }
    render() {
        const value = this.state.selectedOption && this.state.selectedOption.value;
        if(this.props.data.loading) return null;
        const forSelect = this.props.data.getUsers.map((user) => {
            return {
                value: user.email,
                label: user.email
            }
        });
        return (
            <div className="select-user">
                <button className="select-user__button" style={{visibility: this.props.document.id ? "visible" : "hidden"}} onClick={this.deleteHandler}>
                    <i className="select-user__bin"></i>
                </button>                          
                <Select
                    name="form-field"
                    onChange={this.selectHandler}
                    options={forSelect}
                    value={value}
                    clearable={false}
                />
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

export default connect(mapStateToProps, {setDocuments, setActiveUser})(graphqlSelectUser);