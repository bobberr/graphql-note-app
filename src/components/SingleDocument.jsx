import React from 'react';

const SingleDocument = (props) => {
    if(props.content) {
        var arrayOfContent = props.content.split(' ', 3);
        var contentToDisplay = arrayOfContent.join(" ");
    }
    
    return (
        <li onClick={props.clickHandler} className={props.activeDocumentId === props.documentId ? "document-list__item active" : "document-list__item"}>
            <span className="document-list__item-title">{props.title}</span>
            { contentToDisplay ? `${contentToDisplay}...` : null}
        </li>
    )
}

export default SingleDocument;