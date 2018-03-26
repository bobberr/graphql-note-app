import React from 'react';
import { connect } from 'react-redux';


const Documents = (props) => {
    if(props.documents) {
        const documents = props.documents.map((document) => {
            return <li>{document.title}</li>
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

export default connect(mapStateToProps)(Documents);









