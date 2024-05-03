package utils

import "strings"

func ConvertStringToStringArrayPointer(aInterface []interface{}) *[]string {
	aString := []string{}
	for _, v := range aInterface {
		aString = append(aString, v.(string))
	}
	return &aString
}

func ConvertStringToArray(input []string) []string {
	if len(input) == 0 {
		return nil
	}
	stringComponent := input[0]
	stringComponent = strings.Trim(stringComponent, "[]")
	listComponent := strings.Fields(stringComponent)
	return listComponent
}

func ConvertStringToStringArray(aInterface []interface{}) []string {
	aString := []string{}
	for _, v := range aInterface {
		aString = append(aString, v.(string))
	}
	return aString
}
