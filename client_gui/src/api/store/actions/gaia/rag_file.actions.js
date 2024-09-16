import { HttpMethods, serverRequest } from "../../../baseAPI";
import { UPLOAD_RAG_FILE_FAIL, UPLOAD_RAG_FILE_REQUEST, UPLOAD_RAG_FILE_SUCCESS } from "../../constants/gaia/rag_file.constants";

const portName = {
    gaiaPort: 'gaiaConnectorPort',
}

export const uploadRagFile = () => async (dispatch) => {
    dispatch({ type: UPLOAD_RAG_FILE_REQUEST });
    try {
        const { data } = await serverRequest('/rag-file/upload', HttpMethods.POST, portName.gaiaPort, null);
        dispatch({ type: UPLOAD_RAG_FILE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: UPLOAD_RAG_FILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}