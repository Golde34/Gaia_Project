package auth.authentication_service.utils;

import auth.authentication_service.enums.ResponseMessage;
import auth.authentication_service.modules.dto.BaseResponseDto;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

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

    public ResponseEntity<?> matchingResponseMessage(GenericResponse<?> validation) {
        switch (validation.getResponseMessage()) {
            case msg200 -> { 
                return ResponseEntity.ok().body(BaseResponseDto.builder()
                        .status("success")
                        .statusMessage("success")
                        .errorCode(200)
                        .errorMessage("OK")
                        .data(validation.message)
                        .build());
            }
            case msg400 -> {
                return ResponseEntity.badRequest().body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(400)
                        .errorMessage("Bad Request")
                        .data(validation.message)
                        .build());
            }
            case msg401 -> {
                return ResponseEntity.status(401).body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(401)
                        .errorMessage("Unauthorized")
                        .data(validation.message)
                        .build());
            }
            case msg403 -> {
                return ResponseEntity.status(403).body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(403)
                        .errorMessage("Forbidden")
                        .data(validation.message)
                        .build());
            }
            case msg404 -> {
                return ResponseEntity.status(404).body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(404)
                        .errorMessage("Not Found")
                        .data(validation.message)
                        .build());
            }
            case msg500 -> {
                return ResponseEntity.status(500).body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(500)
                        .errorMessage("Internal Server Error")
                        .data(validation.message)
                        .build());
            }
            default -> {
                return ResponseEntity.badRequest().body(BaseResponseDto.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(400)
                        .errorMessage("Bad Request")
                        .data(validation.message)
                        .build());
            }
        }
    }
}