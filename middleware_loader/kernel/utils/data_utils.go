package utils

func CheckNull(value interface{}) string {
	if value == nil {
		return ""
	}
	return value.(string)
}

func CheckNullPointer(value interface{}) *string {
	if value == nil {
		return nil
	}
	return value.(*string)
}

func CheckBool(value interface{}) bool {
	if value == nil {
		return false
	}
	return value.(bool)
}
