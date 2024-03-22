package wo.work_optimization.core.domain.response.base;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ResponseFactory {
    public <T> ResponseEntity<T> generateResponse(T data, HttpStatus status) {
        return new ResponseEntity<>(data, status);
    }

    public <T> ResponseEntity<T> success(T data) {
        return generateResponse(data, HttpStatus.OK);
    }

    public <T> ResponseEntity<T> badRequest(T data) {
        return generateResponse(data, HttpStatus.BAD_REQUEST);
    }

    public <T> ResponseEntity<T> notFound(T data) {
        return generateResponse(data, HttpStatus.NOT_FOUND);
    }

    public <T> ResponseEntity<T> internalServerError(T data) {
        return generateResponse(data, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public <T> ResponseEntity<T> unauthorized(T data) {
        return generateResponse(data, HttpStatus.UNAUTHORIZED);
    }

    public <T> ResponseEntity<T> forbidden(T data) {
        return generateResponse(data, HttpStatus.FORBIDDEN);
    }

    public <T> ResponseEntity<T> conflict(T data) {
        return generateResponse(data, HttpStatus.CONFLICT);
    }
}
