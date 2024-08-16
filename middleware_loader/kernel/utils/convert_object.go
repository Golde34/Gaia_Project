package utils

import (
	"strconv"
	"strings"
)

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
    var result []string
    for _, stringComponent := range input {
        stringComponent = strings.Trim(stringComponent, "[]")
        listComponent := strings.Fields(stringComponent)
        result = append(result, listComponent...)
    }
    return result
}

func ConvertStringToStringArray(aInterface []interface{}) []string {
	aString := []string{}
	for _, v := range aInterface {
		aString = append(aString, v.(string))
	}
	return aString
}

func ConvertStringWithPunctuation(input string) string {
	return strings.Trim(strconv.Quote(input), "\"")
}