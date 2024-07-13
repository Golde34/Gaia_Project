package wo.work_optimization.kernel.utils;

import java.util.Objects;

import org.springframework.stereotype.Component;

@Component
public class DataUtils {
    public boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public boolean isNullOrEmpty(Object obj) {
        return Objects.isNull(obj);
    }

    public boolean isMatchingObject(Object obj1, Object obj2) {
        return Objects.equals(obj1, obj2);
    }

    public boolean isMatchingString(String str1, String str2) {
        return str1.equals(str2);
    }
}
