package wo.work_optimization.core.service.rest;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import wo.work_optimization.infrastructure.store.repository.WOServiceRepository;
import wo.work_optimization.kernel.utils.StringUtils;
import wo.work_optimization.core.domain.constant.Constants;
import wo.work_optimization.core.domain.entity.WOServiceConfiguration;
import wo.work_optimization.core.exception.BusinessException;

@Service
@Slf4j
public class GlobalConfigService {

    @Autowired
    WOServiceRepository globalConfigRepository;

    private LoadingCache<String, String> globalConfigCache;
    @Autowired
    private WOServiceRepository woServiceRepository;

    @PostConstruct
    public void init() {
        long reloadMin = Long.parseLong(findParam(Constants.AuthConfiguration.SYSTEM_CACHE_RELOAD_MINUTE));
        globalConfigCache =
                CacheBuilder.newBuilder()
                        .maximumSize(100000)
                        .refreshAfterWrite(reloadMin, TimeUnit.MINUTES)
                        .build(
                                new CacheLoader<String, String>() {
                                    public String load(String key) { // no checked exception
                                        return findParam(key);
                                    }
                                });
    }

    private String getGlobalParamCache(String paramName) {
        String res;
        try {
            res = globalConfigCache.get(paramName);

        } catch (Exception e) {
            log.error("Exception getting global cache: ", e);
            res = findParam(paramName);
        }
        if (StringUtils.isBlank(res)) {
            return StringUtils.EMPTY;
        }
        return res;
    }

    private String findParam(String paramName) {
        WOServiceConfiguration globalConfig =
                globalConfigRepository
                        .findParam(paramName)
                        .orElseGet(
                                () -> {
                                    log.warn("Cannot find param name {}", paramName);
                                    return null;
                                });
        return globalConfig == null ? StringUtils.EMPTY : globalConfig.getParamValue();
    }

    public String getGlobalParamAsString(String paramName) {
        return getGlobalParamCache(paramName);
    }

    public Integer getGlobalParamAsInteger(String paramName) {
        try {
            return Integer.parseInt(getGlobalParamCache(paramName));
        } catch (Exception e) {
            return 0;
        }
    }

    public Long getGlobalParamAsLong(String paramName) {
        return Long.parseLong(getGlobalParamCache(paramName));
    }

    public Long getGlobalParamAsLong(String paramName, Long defaultValue) {
        String value = getGlobalParamCache(paramName);
        if (StringUtils.EMPTY.equals(value)) {
            return defaultValue;
        }
        return Long.parseLong(value);
    }

    public Boolean getGlobalParamAsBoolean(String paramName) {
        return Objects.equals(getGlobalParamCache(paramName), "1");
    }

    public Double getGlobalParamAsDouble(String paramName) {
        return Double.parseDouble(getGlobalParamCache(paramName));
    }

    public List<String> getGlobalParamAsListString(String paramName) {
        return Arrays.asList(StringUtils.split(getGlobalParamCache(paramName), ";"));
    }

    public List<Integer> getGlobalParamAsListInteger(String paramName) {
        return Arrays.stream(StringUtils.split(getGlobalParamCache(paramName), ";"))
                .map(Integer::valueOf)
                .collect(Collectors.toList());
    }

    public void setParamConfig(String paramName, String paramValue) {
        try {
            Optional<WOServiceConfiguration> woServiceConfig = globalConfigRepository.findParam(paramName);
            if (woServiceConfig.isPresent()) {
                woServiceConfig.get().setParamValue(paramValue);
                globalConfigRepository.save(woServiceConfig.get());
            }
        } catch (BusinessException e) {
            log.error(String.format("Cannot set wo service config: %s", paramName), e);
        }
    }
}


