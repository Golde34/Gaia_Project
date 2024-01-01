package utils

import (
	"encoding/json"
	"fmt"
	"middleware_loader/infrastructure/graph/model"
	"reflect"
	"strings"
)

func GenerateGraphQLQuery(action string, function string, input interface{}, output interface{}) (string) {
	// Convert input
	inputMap := make(map[string]interface{})
	inrec, _ := json.Marshal(input)
	json.Unmarshal(inrec, &inputMap)
	
	inputPairs := make([]string, 0, len(inputMap))
	for key, value := range inputMap {
		inputPairs = append(inputPairs, fmt.Sprintf("%s: \"%s\"", key, value))
	}

	//Convert output
	outputValue := reflect.ValueOf(output)
	outputKeys := make([]string, outputValue.NumField())
	for i:=0; i<outputValue.NumField(); i++ {
		outputKeys[i] = outputValue.Type().Field(i).Tag.Get("json")
	}
	outputStr := strings.Join(outputKeys, ", ")

	// Generate query
	query := fmt.Sprintf(`%s { 
		%s(input: { %s}) {
			%s
		}
	}`, action, function, strings.Join(inputPairs, ", "), outputStr)
	
	return query
}

func main() {
	action := "mutation"
	function := "signin"
	input := model.SigninInput{
		Username: "admin",
		Password: "admin",
	}
	output := model.AuthToken{}

	query := GenerateGraphQLQuery(action, function, input, output)
	fmt.Println(query)
}