package auth.authentication_service.utils;

import auth.authentication_service.enums.ResponseMessage;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Component
public class GenericResponse<T> {
    private T message;
    private ResponseMessage responseMessage;

    public GenericResponse(T message, ResponseMessage responseMessage) {
        this.message = message;
        this.responseMessage = responseMessage;
    }

    public GenericResponse() {
    }

    public ResponseEntity<?> matchingResponseMessage(GenericResponse<T> genericResponse) {
        switch (genericResponse.getResponseMessage()) {
            case msg200 -> {
                return ResponseEntity.ok(genericResponse.message);
            }
            case msg400 -> {
                return ResponseEntity.badRequest().body(genericResponse.message);
            }
            case msg401 -> {
                return ResponseEntity.status(401).body(genericResponse.message);
            }
            case msg403 -> {
                return ResponseEntity.status(403).body(genericResponse.message);
            }
            case msg404 -> {
                return ResponseEntity.status(404).body(genericResponse.message);
            }
            case msg500 -> {
                return ResponseEntity.status(500).body(this.message);
            }
            default -> {
                return ResponseEntity.badRequest().body(this.message);
            }
        }
    }
}