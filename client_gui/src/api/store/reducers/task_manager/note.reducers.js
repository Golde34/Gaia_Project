import {
    NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS,
    NOTE_DETAIL_FAIL, NOTE_DETAIL_REQUEST, NOTE_DETAIL_SUCCESS,
    NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS,
    NOTE_LOCK_FAIL,
    NOTE_LOCK_REQUEST,
    NOTE_LOCK_SUCCESS,
    NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS
} from '../../constants/task_manager/note.constants';

export const noteListReducer = (
    state = { loading: true, notes: [] },
    action
) => {
    switch (action.type) {
        case NOTE_LIST_REQUEST:
            return { loading: true };
        case NOTE_LIST_SUCCESS:
            return { loading: false, notes: action.payload.getAllNotes };
        case NOTE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteCreateReducer = (
    state = { loading: true},
    action
) => {
    switch (action.type) {
        case NOTE_CREATE_REQUEST:
            return { loading: true };
        case NOTE_CREATE_SUCCESS:
            return { loading: false, note: action.payload.note };
        case NOTE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteUpdateReducer = (
    state = { loading: true},
    action
) => {
    switch (action.type) {
        case NOTE_UPDATE_REQUEST:
            return { loading: true };
        case NOTE_UPDATE_SUCCESS:
            return { loading: false, note: action.payload.note };
        case NOTE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteDetailReducer = (
    state = { loading: true},
    action
) => {
    switch (action.type) {
        case NOTE_DETAIL_REQUEST:
            return { loading: true };
        case NOTE_DETAIL_SUCCESS:
            return { loading: false, note: action.payload.note };
        case NOTE_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const noteLockReducer = (
    state = { loading: true},
    action
) => {
    switch (action.type) {
        case NOTE_LOCK_REQUEST:
            return { loading: true };
        case NOTE_LOCK_SUCCESS:
            return { loading: false, note: action.payload.note };
        case NOTE_LOCK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
