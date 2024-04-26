package wo.work_optimization.kernel.utils; 

import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.core.port.client.ClientTemplate;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class ClientRestTemplateAdapter implements ClientTemplate {
    private static final String REQUEST = "REST REQUEST: URL[{}], HTTP-METHOD[{}], HTTP-ENTITY[{}]";
    private static final String RESPONSE = "REST RESPONSE: STATUS[{}], MESSAGE[{}], BODY[{}]";

    private final RestTemplate restTemplate;
    private final RestTemplate restTemplateProxy;

    public ClientRestTemplateAdapter(@Qualifier("spiRestTemplate") RestTemplate restTemplate,
                                     @Qualifier("spiRestTemplateProxy") RestTemplate restTemplateProxy) {
        this.restTemplate = restTemplate;
        this.restTemplateProxy = restTemplateProxy;
    }

    @Override
    public <R> ResponseEntity<R> get(String uri, HttpHeaders headers, Class<R> responseClass, Object... uriVariables) {
        return exchange(uri, HttpMethod.GET, new HttpEntity<>(headers), responseClass, uriVariables);
    }

    @Override
    public <R> ResponseEntity<R> get(String uri, HttpHeaders headers, ParameterizedTypeReference<R> responseClass, Object... uriVariables) {
        return exchangeParameterized(uri, HttpMethod.GET, new HttpEntity<>(headers), responseClass, uriVariables);
    }

    @Override
    public <R> ResponseEntity<R> post(String uri, HttpHeaders headers, Object body, Class<R> responseClass) {
        return exchange(uri, HttpMethod.POST, new HttpEntity<>(body, headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> post(String uri, HttpHeaders headers, Object body, ParameterizedTypeReference<R> responseClass) {
        return exchangeParameterized(uri, HttpMethod.POST, new HttpEntity<>(body, headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> put(String uri, HttpHeaders headers, Object body, Class<R> responseClass) {
        return exchange(uri, HttpMethod.PUT, new HttpEntity<>(body, headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> put(String uri, HttpHeaders headers, Object body, ParameterizedTypeReference<R> responseClass) {
        return exchangeParameterized(uri, HttpMethod.PUT, new HttpEntity<>(body, headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> putByProxy(String uri, HttpHeaders headers, Object body, Class<R> responseClass) {
        return exchangeWithProxy(uri, HttpMethod.PUT, new HttpEntity<>(headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> putByProxy(String uri, HttpHeaders headers, Object body, ParameterizedTypeReference<R> responseClass) {
        return exchangeParameterizedByProxy(uri, HttpMethod.PUT, new HttpEntity<>(headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> getByProxy(String uri, HttpHeaders headers, Class<R> responseClass, Object... uriVariables) {
        return exchangeWithProxy(uri, HttpMethod.GET, new HttpEntity<>(headers), responseClass, uriVariables);
    }

    @Override
    public <R> ResponseEntity<R> getByProxy(String uri, HttpHeaders headers, ParameterizedTypeReference<R> responseClass, Object... uriVariables) {
        return exchangeParameterizedByProxy(uri, HttpMethod.GET, new HttpEntity<>(headers), responseClass, uriVariables);
    }

    @Override
    public <R> ResponseEntity<R> postByProxy(String uri, HttpHeaders headers, Object body, Class<R> responseClass) {
        return exchangeWithProxy(uri, HttpMethod.POST, new HttpEntity<>(body, headers), responseClass);
    }

    @Override
    public <R> ResponseEntity<R> postByProxy(String uri, HttpHeaders headers, Object body, ParameterizedTypeReference<R> responseClass) {
        return exchangeParameterizedByProxy(uri, HttpMethod.POST, new HttpEntity<>(body, headers), responseClass);
    }

    private <R> ResponseEntity<R> exchange(String url, HttpMethod httpMethod, HttpEntity<Object> entity, Class<R> responseClass, Object... uriVariables) {
        log.info(REQUEST, url, httpMethod, entity);
        ResponseEntity<R> responseEntity = restTemplate.exchange(url, httpMethod, entity, responseClass, uriVariables);
        HttpStatus httpStatus = HttpStatus.valueOf(responseEntity.getStatusCode().value());

        log.info(RESPONSE, httpStatus.value(), httpStatus.getReasonPhrase(), responseEntity.getBody());
        return responseEntity;
    }

    private <R> ResponseEntity<R> exchangeWithProxy(String url, HttpMethod httpMethod, HttpEntity<Object> entity, Class<R> responseClass, Object... uriVariables) {
        log.info(REQUEST, url, httpMethod, entity);
        ResponseEntity<R> responseEntity = restTemplateProxy.exchange(url, httpMethod, entity, responseClass, uriVariables);
        HttpStatus httpStatus = HttpStatus.valueOf(responseEntity.getStatusCode().value());
        log.info(RESPONSE, httpStatus.value(), httpStatus.getReasonPhrase(), responseEntity.getBody());
        return responseEntity;
    }

    private <R> ResponseEntity<R> exchangeParameterized(String url, HttpMethod httpMethod, HttpEntity<Object> entity, ParameterizedTypeReference<R> responseClass, Object... uriVariables) {
        log.info(REQUEST, url, httpMethod, entity);
        ResponseEntity<R> responseEntityParameterized = restTemplate.exchange(url, httpMethod, entity, responseClass, uriVariables);
        HttpStatus httpStatus = HttpStatus.valueOf(responseEntityParameterized.getStatusCode().value());
        log.info(RESPONSE, httpStatus.value(), httpStatus.getReasonPhrase(), responseEntityParameterized.getBody());
        return responseEntityParameterized;
    }

    private <R> ResponseEntity<R> exchangeParameterizedByProxy(String url, HttpMethod httpMethod, HttpEntity<Object> entity, ParameterizedTypeReference<R> responseClass, Object... uriVariables) {
        log.info(REQUEST, url, httpMethod, entity);
        ResponseEntity<R> responseEntityParameterized = restTemplate.exchange(url, httpMethod, entity, responseClass, uriVariables);
        HttpStatus httpStatus = HttpStatus.valueOf(responseEntityParameterized.getStatusCode().value()); 
        log.info(RESPONSE, httpStatus.getReasonPhrase(), responseEntityParameterized.getBody());
        return responseEntityParameterized;
    }
}
