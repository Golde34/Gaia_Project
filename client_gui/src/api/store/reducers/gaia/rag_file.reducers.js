import { UPLOAD_RAG_FILE_FAIL, UPLOAD_RAG_FILE_REQUEST, UPLOAD_RAG_FILE_SUCCESS } 
from "../../constants/gaia/rag_file.constants";

export const ragFileUploadReducer = (
    state = {}, action) => {
    switch (action.type) {
        case UPLOAD_RAG_FILE_REQUEST:
            return { loading: true };
        case UPLOAD_RAG_FILE_SUCCESS:
            return { loading: false, rag_file: action.payload.rag_file };
        case UPLOAD_RAG_FILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}