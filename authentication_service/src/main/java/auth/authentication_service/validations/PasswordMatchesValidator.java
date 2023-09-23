package auth.authentication_service.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import auth.authentication_service.modules.dtos.UserDto;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(final PasswordMatches constraintAnnotation) {
        // empty
    }

    @Override
    public boolean isValid(final Object obj, final ConstraintValidatorContext context) {
        final UserDto user = (UserDto) obj;
        return user.getPassword().equals(user.getMatchingPassword());
    }
}