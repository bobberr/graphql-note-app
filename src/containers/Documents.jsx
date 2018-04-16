import React from 'react';
import { connect } from 'react-redux';
import { setActiveDocument } from '../redux/actionCreators/actionCreators';
import SingleDocument from '../components/SingleDocument';


const Documents = (props) => {
    const clickHandler = (document) => {
        props.setActiveDocument(document);
    }
    var documents = null;
    if(props.documents) {
        if(props.keyWord === "") {
            documents = props.documents;
        } else {
            documents = props.documents.filter((document) => {
                return document.title.includes(props.keyWord);
            });
        }
    } else {
        documents = [];
    }
    const documentsToRender = documents.map((document) => {
        return <SingleDocument activeDocumentId={props.documentId} documentId={document.id} key={document.id} clickHandler={clickHandler.bind(null, document)} title={document.title} content={document.content}/>
    });
    return(
        <ul className="document-list">
            {documentsToRender}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents,
        keyWord: state.keyWord,
        documentId: state.document.id
    }
}

export default connect(mapStateToProps, {setActiveDocument})(Documents);









