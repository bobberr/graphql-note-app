import React from 'react';

const SingleDocument = (props) => {
    if(props.content) {
        console.log(props.content)
        const contentToDisplay = props.content.split(' ', 3);
        console.log(contentToDisplay);
    }
    
    return (
        <li onClick={props.clickHandler} className="document-list__item">
            <span>{props.title}</span>
            {props.content}
        </li>
    )
}

export default SingleDocument;