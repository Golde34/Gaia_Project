package wo.work_optimization.kernel.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import io.micrometer.common.util.StringUtils;

@UtilityClass
public class DateTimeUtils {
    private static final String DEFAULT_DATETIME_PATTERN = "dd/MM/yyyy HH:mm:ss";
    private static final String VTB_DATETIME_PATTERN = "yyyyMMddHHmmss";
    public static final String YY_MM_DD = "yyMMdd";

    public static String currentDateTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(DEFAULT_DATETIME_PATTERN));
    }

    public static String currentDateTime(String pattern) {
        if (StringUtils.isBlank(pattern)) {
            return currentDateTime();
        }
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(pattern));
    }

    public static String currentDateTime(DateTimeFormatter dateTimeFormatter) {

        return LocalDateTime.now().format(dateTimeFormatter);
    }

    public static String getStringFormat(String pattern, LocalDateTime date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return formatter.format(date);
    }

    public static String currentDateTimeVTB() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(VTB_DATETIME_PATTERN));
    }
}

