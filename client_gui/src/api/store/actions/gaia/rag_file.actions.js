import { UPLOAD_RAG_FILE_FAIL, UPLOAD_RAG_FILE_REQUEST, UPLOAD_RAG_FILE_SUCCESS } from "../../constants/gaia/rag_file.constants";
import { config } from '../../../../kernels/configs/configuration';

const portName = {
    gaiaPort: 'gaiaConnectorPort',
}

export const uploadRagFile = (formData) => async (dispatch) => {
    dispatch({ type: UPLOAD_RAG_FILE_REQUEST });
    try {
        const api = '/rag-file/upload';
        const url = `http://${config.serverHost}:${config[portName['gaiaPort']]}${api}`;
        console.log(url);
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        dispatch({ type: UPLOAD_RAG_FILE_SUCCESS, payload: data });
        if (response.ok) {
            console.log('File uploaded successfully:', data);
        } else {
            console.error('Error uploading file:', data);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        dispatch({
            type: UPLOAD_RAG_FILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }87
}