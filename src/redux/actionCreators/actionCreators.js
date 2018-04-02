import types from './types';

export const setDocuments = (documents) => {
    return {
        type: types.SET_DOCUMENTS,
        documents
    }
}

export const setActiveUser = (email) => {
    return {
        type: types.SET_ACTIVE_USER,
        email
    }
}

export const setActiveDocument = (document) => {
    return {
        type: types.SET_ACTIVE_DOCUMENT,
        document
    }
}

export const updateDocumentsList = (document) => {
    return {
        type: types.UPDATE_DOCUMENTS_LIST,
        document
    }
}