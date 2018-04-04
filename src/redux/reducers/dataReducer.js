import types from '../actionCreators/types';
const initialState = {
    document: {}
};

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_DOCUMENTS:
            return Object.assign({}, state, {documents: action.documents});
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
            })
            const changedState = {...state, documents}
            return changedState;
        case types.RESET_ACTIVE_DOCUMENT: 
            return Object.assign({}, state, {document: {content: ""}});
        default: 
            return state;
    }
}

export default dataReducer;