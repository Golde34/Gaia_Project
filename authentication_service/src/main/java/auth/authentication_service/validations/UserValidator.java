package auth.authentication_service.validations;

public class UserValidator implements Validator {
    
    @Override
    public boolean supports(Class<?> clazz) {
        return UserDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(final Object obj, final Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "message.name", "Name is required.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "message.username", "Username is required.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "message.password", "Password is required.");
    }
}