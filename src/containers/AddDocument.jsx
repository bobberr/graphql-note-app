import React from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { setDocuments } from '../redux/actionCreators/actionCreators'; 



const addDocumentMutation = gql`
    mutation addDocument($title: String, $user: String) {
        addDocument(title: $title, user: $user) {
            title
        }
    }
`;


const AddDocument = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
        props.addDocument({variables: {
            title: this.title.value,
            user: props.email
        }}).then((returnedData) => {
           props.setDocuments(returnedData.data.addDocument)
        });
        this.title.value = "";
        
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" ref={(ref) => {this.title = ref}}/>
                <button type="submit">+</button>
            </form>
            <ul>

            </ul>
        </div>
    )
}

const graphqBoards = graphql(addDocumentMutation, {name: 'addDocument'})(AddDocument);

const mapStateToProps = (state) => {
    return {
        email: state.email
    }
} 

export default connect(mapStateToProps, {setDocuments})(graphqBoards);