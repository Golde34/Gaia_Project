package auth.authentication_service.infrastructure.client.adapter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import auth.authentication_service.core.domain.dto.GeneralResponse;
import auth.authentication_service.core.domain.dto.request.ServiceStatusRequest;
import auth.authentication_service.core.exceptions.BusinessException;
import auth.authentication_service.core.port.client.MiddlewareServiceClient;
import auth.authentication_service.infrastructure.client.ClientTemplate;
import auth.authentication_service.kernel.utils.ClientUtils;

@Service
@Slf4j
public class MiddlewareServiceAdapter implements MiddlewareServiceClient {

    @Value("${app.service.middleware-loader.api.status-register}")
    private String statusRegister;

    private final ClientTemplate clientTemplate;
    private final ClientUtils clientUtils;

    public MiddlewareServiceAdapter(ClientTemplate clientTemplate, ClientUtils clientUtils) {
        this.clientTemplate = clientTemplate;
        this.clientUtils = clientUtils;
    }

    @Override
    public String insertStatus(ServiceStatusRequest request) {
        try {
            HttpHeaders requestHeaders = clientUtils.buildDefaultHeaders();
            log.info("Calling API to middleware loader: {}", statusRegister);
            ResponseEntity<GeneralResponse<String>> response = clientTemplate.post(statusRegister, requestHeaders, request,
                    new ParameterizedTypeReference<GeneralResponse<String>>() {});
            log.info("Response from middleware loader: {}", response);
            return response.getBody().getErrorMessage();
        } catch (Exception e) {
            throw new BusinessException(String.format("Error when calling API to middleware loader: %s", e.getMessage()));
        }
    }
}
