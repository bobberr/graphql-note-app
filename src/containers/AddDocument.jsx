import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { setDocuments, filterDocuments } from '../redux/actionCreators/actionCreators'; 
import debounce from 'lodash.debounce';


const addDocumentMutation = gql`
    mutation addDocument($title: String, $user: String) {
        addDocument(title: $title, user: $user) {
            title
            content
            id
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
    const changeHandler = () => {
        props.filterDocuments(this.title.value);
    }
    return (
        <div className="add-document">
            <form onSubmit={submitHandler} className="add-document__form">
                <input className="add-document__input" type="text" onChange={debounce(changeHandler, 1000)} ref={(ref) => {this.title = ref}}/>
                <button className="add-document__button" type="submit">+</button>
            </form>
        </div>
    )
}

const graphqBoards = graphql(addDocumentMutation, {name: 'addDocument'})(AddDocument);

const mapStateToProps = (state) => {
    return {
        email: state.email
    }
} 

export default connect(mapStateToProps, {setDocuments, filterDocuments})(graphqBoards);