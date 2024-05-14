package wo.work_optimization.infrastructure.config;

import org.apache.http.HttpHost;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.SSLContexts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import wo.work_optimization.infrastructure.client.feign.RestExceptionHandler;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

@Configuration
public class RestConfig {
    @Value("${rest.default.connection.connect-timeout}")
    private int connectionTimeout;

    private static final boolean IS_HOST_NAME_VERIFIER = true;

    @Bean(name = "woRestTemplate")
    public RestTemplate createDefaultRestTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
        restTemplate.getMessageConverters().add(1, new FormHttpMessageConverter());
        restTemplate.setErrorHandler(new RestExceptionHandler());
        return restTemplate;
    }

    private HttpClientBuilder poolingHttpClientConfigBuilder() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        PoolingHttpClientConnectionManager connectionManager = new PoolingHttpClientConnectionManager(getSocketFactoryRegistry());
        connectionManager.setMaxTotal(2048);
        connectionManager.setDefaultMaxPerRoute(1024);

        RequestConfig config = RequestConfig.custom().setConnectTimeout(connectionTimeout).setConnectionRequestTimeout(connectionTimeout).setSocketTimeout(connectionTimeout).build();

        return HttpClients.custom().setConnectionManager(connectionManager).evictExpiredConnections().evictIdleConnections(30L, TimeUnit.SECONDS).setDefaultRequestConfig(config).setRetryHandler(new DefaultHttpRequestRetryHandler(0, false)).disableRedirectHandling();
    }

    private static Registry<ConnectionSocketFactory> getSocketFactoryRegistry() throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        SSLContextBuilder builder = SSLContexts.custom();
        builder.loadTrustMaterial(null, (chain, authType) -> true);
        SSLContext sslContext = builder.build();
        SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslContext, getHostnameVerifier());
        return RegistryBuilder.<ConnectionSocketFactory>create().register("https", sslSocketFactory).register("http", new PlainConnectionSocketFactory()).build();
    }

    private static HostnameVerifier getHostnameVerifier() {
        return (s, sslSession) -> IS_HOST_NAME_VERIFIER;
    }
}
