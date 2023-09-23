package auth.authentication_service.validations;

@SuppressWarnings("serial")
public class EmailExistsException extends Throwable {

    public EmailExistsException(final String message) {
        super(message);
    }

}