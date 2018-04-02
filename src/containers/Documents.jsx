import React from 'react';
import { connect } from 'react-redux';
import { setActiveDocument } from '../redux/actionCreators/actionCreators';


const Documents = (props) => {
    const clickHandler = (document) => {
        props.setActiveDocument(document);
    }
    if(props.documents) {
        const documents = props.documents.map((document) => {
            return <li key={document._id} onClick={clickHandler.bind(null, document)}>{document.title} content:{document.content}</li>
        });
        return(
            <ul>
                {documents}
            </ul>
        )
    } else {
        return null
    }
    
}

const mapStateToProps = (state) => {
    return {
        documents: state.documents
    }
}

export default connect(mapStateToProps, {setActiveDocument})(Documents);









