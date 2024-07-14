package wo.work_optimization.kernel.utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import wo.work_optimization.core.domain.dto.AuthServiceResponse;
import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;

@Service
public class ClientUtils {

    private final ObjectMapper objectMapper;

    public ClientUtils(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public HttpHeaders buildDefaultHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Content-Type", "application/json");
        httpHeaders.add("Accept", "application/json");
        return httpHeaders;
    }

    public HttpHeaders buildAuthorizationHeader(String service, String token) {
        HttpHeaders httpHeaders = buildDefaultHeaders();
        httpHeaders.add("Authorization", "Bearer " + token);
        httpHeaders.add("Service", service);
        return httpHeaders;
    }

    public UserResponseDTO buildUserResponse(ResponseEntity<GeneralResponse<Object>> responseClient) {
        GeneralResponse<AuthServiceResponse<UserResponseDTO>> userResponse = objectMapper.convertValue(responseClient.getBody(),
                new TypeReference<GeneralResponse<AuthServiceResponse<UserResponseDTO>>>() {});
        return objectMapper.convertValue(userResponse.getData().getMessage(), UserResponseDTO.class);
    }


}
