package wo.work_optimization.kernel.utils;

import com.google.gson.Gson;

public class JsonUtils {

    public static Gson gson = new Gson();

    public static String toJson(Object object) {
        return gson.toJson(object);
    }
}
