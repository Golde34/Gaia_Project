import { MICROSERVICE_LIST_FAIL, MICROSERVICE_LIST_REQUEST, MICROSERVICE_LIST_SUCCESS } 
from "../../constants/middleware_loader/microservices.constants";

export const microserviceListReducer = (
    state = { loading: true, microservices: [] },
    action) => {
    switch (action.type) {
        case MICROSERVICE_LIST_REQUEST:
            return { loading: true };
        case MICROSERVICE_LIST_SUCCESS:
            return { loading: false, microservices: action.payload };
        case MICROSERVICE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}