package auth.authentication_service.infrastructure.client.adapter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import auth.authentication_service.core.exceptions.BusinessException;
import auth.authentication_service.core.port.client.MiddlewareServiceClient;
import auth.authentication_service.infrastructure.client.ClientTemplate;
import auth.authentication_service.kernel.utils.ClientUtils;

@Service
@Slf4j
public class MiddlewareServiceAdapter implements MiddlewareServiceClient {

    @Value("${app.service.auth-service.api.get-user}")
    private String authServiceApiGetUser;

    private final ClientTemplate clientTemplate;
    private final ClientUtils clientUtils;

    public MiddlewareServiceAdapter(ClientTemplate clientTemplate, ClientUtils clientUtils) {
        this.clientTemplate = clientTemplate;
        this.clientUtils = clientUtils;
    }

    public String healthCheck() {
        try {
            log.info("Calling api to middleware loader: {}", authServiceApiGetUser);
            return "OK";
        } catch (Exception e) {
            throw new BusinessException(String.format("Error when call api to middleware loader: %s", e.getMessage()));
        }
    }
}
