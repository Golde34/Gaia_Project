package auth.authentication_service.core.domain.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class Constants {

    @UtilityClass
    public static class HttpStatus {
        public static final String ERROR = "error";
        public static final String SUCCESS = "success";
    }

    @UtilityClass
    public static class ErrorMessage {
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
    public static class Role {
        public static final String BOSS = "ROLE_BOSS";
        public static final String USER = "ROLE_USER";
        public static final String ADMIN = "ROLE_ADMIN";
    }

    @UtilityClass
    public static class ResponseMessage {
        public static final String VALIDATE_SUCCESS = "validate success";
        public static final String VALIDATE_FAILED = "validate failed";
        public static final String OBJECT_NULL = "%s is null";


        public static final String USER_NOT_FOUND = "user not found";
        public static final String INCORRECT_USERNAME_PASSWORD = "incorrect username or password";
        public static final String USER_ALREADY_EXISTS = "user already exists ";
        public static final String USER_SIGNUP = "user need to sign-up";
        public static final String INACTIVE_USER = "user is inactive";
        public static final String REGISTERED_ACCOUNT = "registered account";
        public static final String EMAIL_EXISTS = "email exists ";
        public static final String MATCHING_PASSWORD = "passwords are not matching";
        public static final String UPDATE_USER = "update user failed";
        public static final String DELETE_USER = "delete user failed";
        public static final String GET_ALL_USERS = "get all users failed";
    
        public static final String ROLE_EXISTED = "role existed";
        public static final String ROLE_NOT_FOUND = "role not found";
        public static final String CREATE_ROLE = "create role failed";
        public static final String UPDATE_ROLE = "update role failed";
        public static final String DELETE_ROLE = "delete role failed";
        public static final String ADD_PRIVILEGE_TO_ROLE = "add privilege to role failed";

        public static final String PRIVILEGE_EXISTED = "privilege existed";
        public static final String UPDATE_PRIVILEGE = "update privilege failed";
        public static final String DELETE_PRIVILEGE = "delete privilege failed";
    }
}
