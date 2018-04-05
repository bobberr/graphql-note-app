import React from 'react';
import { connect } from 'react-redux';
import { setActiveDocument } from '../redux/actionCreators/actionCreators';


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
        return <li key={document.id} onClick={clickHandler.bind(null, document)}>{document.title} content:{document.content}</li>
    });
    return(
        <ul>
            {documentsToRender}
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents,
        keyWord: state.keyWord
    }
}

export default connect(mapStateToProps, {setActiveDocument})(Documents);









