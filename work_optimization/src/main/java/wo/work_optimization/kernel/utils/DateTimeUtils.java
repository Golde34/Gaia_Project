package wo.work_optimization.kernel.utils;

import lombok.experimental.UtilityClass;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import io.micrometer.common.util.StringUtils;

@UtilityClass
public class DateTimeUtils {
    private static final String DEFAULT_DATETIME_PATTERN = "dd/MM/yyyy HH:mm:ss";
    public static final String YY_MM_DD = "yyMMdd";
    private static final String DEFAUL_DASH_DATETIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

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

    public static String currentDateTimeYYMMDD() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(YY_MM_DD));
    }

    public static long convertStringDateTime(String dateTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(DEFAUL_DASH_DATETIME_PATTERN); // Define the format
        Date date = sdf.parse(dateTime);
        return date.getTime();
    }
}

