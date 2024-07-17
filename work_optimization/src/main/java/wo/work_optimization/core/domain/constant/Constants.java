package wo.work_optimization.core.domain.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Constants {
    @UtilityClass
    public static class HttpStatus {
        public static final String ERROR = "error";
        public static final String SUCCESS = "success";
    }

    @UtilityClass
    public static class HttpCodeMessage {
        public static final String OK = "OK";
        public static final String INVALID = "Invalid";
        public static final String NOT_FOUND = "Not Found";
        public static final String ALREADY_EXISTS = "Already Exists";
        public static final String UNAUTHORIZED = "Unauthorized";
        public static final String FORBIDDEN = "Forbidden";
        public static final String BAD_REQUEST = "Bad Request";
        public static final String INTERNAL_SERVER_ERROR = "Internal Server Error";
    }

    @UtilityClass
    public static class WOConfiguration {
        public static String SYSTEM_CACHE_RELOAD_MINUTE = "global.config.minute";
        public static String CUSTOM_SCHEDULE_FLOW_STATE_CONSTANTS = "schedule.custom-algorithm.constant";
        public static String DEEP_WORK_TIME = "schedule.custom-algorithm.deep-work-time.%s";
    }

    @UtilityClass
    public static class CustomHeader {
        public static String SERVICE_HEADER = "Service";
        public static String SERVICE_TOKEN_HEADER = "Service-Token";
        public static String AUTHORIZATION_HEADER = "Authorization";
    }

    @UtilityClass
    public static class ErrorMessage {
        public static String SUCCESS = "Success";

        public static String INVALID_REQUEST = "Invalid Request";
        public static String INTERNAL_SERVER_ERROR = "There's something wrong with the server";
        public static String NOT_FOUND = "Transaction Not Found";
        public static String USER_NOT_FOUND = "User Not Found";
        public static String TOTAL_TIME_IN_DAY_ERROR = "The total time in day must be 24 hours";
    }
}
