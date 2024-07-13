package wo.work_optimization.infrastructure.client.adapter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import wo.work_optimization.core.domain.dto.AuthServiceResponse;
import wo.work_optimization.core.domain.dto.response.UserResponseDTO;
import wo.work_optimization.core.domain.dto.response.base.GeneralResponse;
import wo.work_optimization.core.exception.BusinessException;
import wo.work_optimization.core.port.client.AuthServiceClient;
import wo.work_optimization.infrastructure.client.ClientTemplate;

@Service
@Slf4j
public class AuthServiceAdapter implements AuthServiceClient {

    @Autowired
    public ClientTemplate clientTemplate;
    public ObjectMapper objectMapper = new ObjectMapper();

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
