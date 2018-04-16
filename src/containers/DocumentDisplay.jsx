import React from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { updateDocumentsList } from '../redux/actionCreators/actionCreators';

const changeDocument = gql`
    mutation changeDocument($id: ID, $content: String) {
        changeDocument(id: $id, content: $content) {
            content
            id
        }
    }
`;

class DocumentDisplay extends React.Component {
    state = {
        saving: false
    };
    constructor() {
        super();
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidUpdate() {
        this.area.value = this.props.document.content;
    }
    changeHandler = () => {
        this.props.client.mutate({mutation: changeDocument, variables: {
            id: this.props.document.id,
            content: this.area.value
        }}).then((returnedDocument) => {
            this.props.updateDocumentsList(returnedDocument.data.changeDocument);
        });
    }
    render() {
        return (
            <div className="document-display">
                <textarea className="document-display__textarea" name="content area" cols="30" rows="10" ref={(ref) => {this.area = ref}} onChange={debounce(this.changeHandler, 2000)}></textarea>
            </div>
        )    
    }
}

const mapStateToProps = (state) => {
    return {
        document: state.document
    }
}

export default connect(mapStateToProps, {updateDocumentsList})(withApollo(DocumentDisplay));