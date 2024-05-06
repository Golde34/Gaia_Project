package auth.authentication_service.core.services;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.com.viettel.vds.constant.GlobalConfigConstants;
import vn.com.viettel.vds.entity.crosssale.GlobalConfig;
import vn.com.viettel.vds.repository.crosssale.GlobalConfigRepository;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@Slf4j
public class GlobalConfigService {

    @Autowired
    GlobalConfigRepository globalConfigRepository;

    private LoadingCache<String, String> globalConfigCache;

    @PostConstruct
    public void init() {
        Long reloadMin = Long.parseLong(findParam(GlobalConfigConstants.SYSTEM_CACHE_RELOAD_MINUTE));
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
        GlobalConfig globalConfig =
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
}

