package wo.work_optimization.infrastructure.client.adapter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.dto.AuthServiceResponse;
import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.domain.enums.ServiceEnum;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.port.client.AuthServiceClient;
import wo.work_optimization.infrastructure.client.ClientTemplate;
import wo.work_optimization.kernel.utils.ClientUtils;

@Service
@Slf4j
public class AuthServiceAdapter implements AuthServiceClient {

    @Value("${app.service.auth-service.api.get-user}")
    private String authServiceApiGetUser;

    private final ClientTemplate clientTemplate;
    private final ObjectMapper objectMapper;
    private final ClientUtils clientUtils;

    public AuthServiceAdapter(ClientTemplate clientTemplate, ObjectMapper objectMapper, ClientUtils clientUtils) {
        this.clientTemplate = clientTemplate;
        this.objectMapper = objectMapper;
        this.clientUtils = clientUtils;
    }

    public UserResponseDTO checkExistedUser(Long userId) {
        try {
            HttpHeaders requestHeader = new HttpHeaders();
            requestHeader.add("Authorization", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb2xkZSIsImV4cCI6MTcyMDg2Mjg3NiwiaWF0IjoxNzIwODU1Njc2fQ.L1eCnVwp23T1oXtl6F8DU0Fu81_T7OpKh72xu4AowGE");
            String uri = "http://localhost:4001/user/get-user";
            GetUserRequestDTO body = GetUserRequestDTO.builder()
                    .userId(userId)
                    .name("Nguyen Dong Duc Viet")
                    .username("golde")
                    .email("nguyendongducviet2001@gmail.com")
                    .build();
            ResponseEntity<GeneralResponse<Object>> response = clientTemplate.post(uri, requestHeader, body, new ParameterizedTypeReference<GeneralResponse<Object>>() {});
            GeneralResponse<AuthServiceResponse<UserResponseDTO>> userResponse = objectMapper.convertValue(response.getBody(), new TypeReference<GeneralResponse<AuthServiceResponse<UserResponseDTO>>>() {});
            log.info("Neu em con: {}", userResponse.getData().getMessage());
            return objectMapper.convertValue(userResponse.getData().getMessage(), UserResponseDTO.class);
        } catch (Exception e) {
            throw new BusinessException(String.format("Error when checking existed user: %s", e.getMessage()));
        }
    }

    public UserResponseDTO getExistedUser(Long userId) {
        try {
            HttpHeaders requestHeaders = clientUtils.buildAuthorizationHeader(ServiceEnum.AS.getServiceName(), "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb2xkZSIsImV4cCI6MTcyMDkzOTYzNywiaWF0IjoxNzIwOTMyNDM3fQ.coh5CSd23z5x4cnyPrlDX6Wd_tNBeZW75LizDtiDzLI");
            String uri = String.format(authServiceApiGetUser, userId);
            ResponseEntity<GeneralResponse<Object>> response = clientTemplate.get(uri, requestHeaders, new ParameterizedTypeReference<GeneralResponse<Object>>() {});
            return clientUtils.buildUserResponse(response);
        } catch (Exception e) {
            throw new BusinessException(String.format("Error when call api to auth service: %s", e.getMessage()));
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    public static class GetUserRequestDTO {
        private Long userId;
        private String username;
        private String name;
        private String email;
    }
}
