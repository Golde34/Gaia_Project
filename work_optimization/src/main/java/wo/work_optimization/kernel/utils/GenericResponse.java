package wo.work_optimization.kernel.utils;

import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import wo.work_optimization.core.domain.enums.ResponseMessage;
import wo.work_optimization.core.domain.response.base.GeneralResponse;

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

    public GeneralResponse matchingResponseMessage(GenericResponse<?> validation) {
        switch (validation.getResponseMessage()) {
            case msg200 -> { 
                return GeneralResponse.builder()
                        .status("success")
                        .statusMessage("success")
                        .errorCode(200)
                        .errorMessage("OK")
                        .data(validation.message)
                        .build();
            }
            case msg400 -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(400)
                        .errorMessage("Bad Request")
                        .data(validation.message)
                        .build();
            }
            case msg401 -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(401)
                        .errorMessage("Unauthorized")
                        .data(validation.message)
                        .build();
            }
            case msg403 -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(403)
                        .errorMessage("Forbidden")
                        .data(validation.message)
                        .build();
            }
            case msg404 -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(404)
                        .errorMessage("Not Found")
                        .data(validation.message)
                        .build();
            }
            case msg500 -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(500)
                        .errorMessage("Internal Server Error")
                        .data(validation.message)
                        .build();
            }
            default -> {
                return GeneralResponse.builder()
                        .status("error")
                        .statusMessage("error")
                        .errorCode(400)
                        .errorMessage("Bad Request")
                        .data(validation.message)
                        .build();
            }
        }
    }
}