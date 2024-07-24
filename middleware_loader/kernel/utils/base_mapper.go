package utils 

func GetStringValue(bodyMap map[string]interface{}, key string, defaultValue string) string {
    if value, ok := bodyMap[key].(string); ok {
        return value
    }
    return defaultValue
}

func GetArrayStringValue(bodyMap map[string]interface{}, key string, defaultValue []string) []string {
	if values, ok := bodyMap[key].([]interface{}); ok {
		stringValues := make([]string, len(values))
		for i, val := range values {
			if strVal, ok := val.(string); ok {
				stringValues[i] = strVal
			}
		}
		return stringValues
	}
	return defaultValue
}

func GetFloatValue(bodyMap map[string]interface{}, key string, defaultValue float64) float64 {
	if value, ok := bodyMap[key].(float64); ok {
		return value
	}
	return defaultValue
}

// func GetIntegerValue(bodyMap map[string]interface{}, key string, defaultValue int64) int64 {
// 	if value, ok := bodyMap[key].(int64); ok {
// 		return value
// 	}
// 	return defaultValue
// }