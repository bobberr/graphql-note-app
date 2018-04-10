import types from '../actionCreators/types';
const initialState = {
    document: {content: ""},
    keyWord: ""
};

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_DOCUMENTS:
            return Object.assign({}, state, {documents: action.documents, keyWord: "", document: {content: ""}});
        case types.SET_ACTIVE_USER:
            return Object.assign({}, state, {email: action.email});
        case types.SET_ACTIVE_DOCUMENT:
            return Object.assign({}, state, {document: action.document});
        case types.UPDATE_DOCUMENTS_LIST:
            const documents = state.documents.map((document) => {
                if(document.id !== action.document.id) {
                    return document
                } else {
                    return {
                        ...document,
                        ...action.document
                    }
                }
            });
            const changedState = {...state, documents};
            return changedState;
        case types.FILTER_DOCUMENTS:
            return Object.assign({}, state, {keyWord: action.keyWord});
        default: 
            return state;
    }
}

export default dataReducer;