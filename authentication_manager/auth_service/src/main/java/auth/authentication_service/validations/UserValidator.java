package auth.authentication_service.validations;

import auth.authentication_service.modules.dto.RegisterDto;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class UserValidator implements Validator {
    
    @Override
    public boolean supports(Class<?> clazz) {
        return RegisterDto.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(final Object obj, final Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "message.name", "Name is required.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "message.username", "Username is required.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "message.password", "Password is required.");
    }
}