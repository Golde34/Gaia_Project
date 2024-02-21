package base

func ConvertStringToStringArray(aInterface []interface{}) []string {
	aString := []string{}
	for _, v := range aInterface {
		aString = append(aString, v.(string))
	}
	return aString
}

func GetStringValue(bodyMap map[string]interface{}, key string, defaultValue string) string {
    if value, ok := bodyMap[key].(string); ok {
        return value
    }
    return defaultValue
}