package wo.work_optimization.kernel.utils;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class DataUtils {
    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static boolean isNullOrEmpty(Object obj) {
        return Objects.isNull(obj);
    }

    public static boolean isMatchingObject(Object obj1, Object obj2) {
        return Objects.equals(obj1, obj2);
    }

    public static boolean isMatchingString(String str1, String str2) {
        return str1.equals(str2);
    }
}
