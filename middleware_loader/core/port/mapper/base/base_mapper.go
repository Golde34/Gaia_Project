package base

func ConvertStringToStringArray(aInterface []interface{}) []string {
	aString := []string{}
	for _, v := range aInterface {
		aString = append(aString, v.(string))
	}
	return aString
}